'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchChatHistory, submitChatQuery } from '@/lib/api/ai-chat-service';
import { applyChatQueryResponseState } from '@/lib/ai-chat/apply-chat-query-response';
import { buildFieldCaptureFromHistory } from '@/lib/ai-chat/build-field-capture-from-history';
import { resolveChatUserId, getEffectiveChatUserId } from '@/lib/ai-chat/chat-identity';
import { getChatQueryAssistantMessages } from '@/lib/ai-chat/get-chat-query-assistant-messages';
import { mapHistoryTurnsToMessages } from '@/lib/ai-chat/map-history-turns-to-messages';
import { promoteChatAuthFromResponse } from '@/lib/ai-chat/promote-chat-auth-from-response';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat-copy';
import { useAuthStore } from '@/stores/auth-store';
import { useAiChatStore } from '@/stores/ai-chat-store';
import { getErrorMessage, isAbortError } from '@/lib/utils/error-helpers';
import type {
  AiChatFieldCaptureStatus,
  AiChatNextFieldConfig,
  AiChatSession,
  ChatHistoryParams,
} from '@/types/ai-chat';

export interface AiChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
}

interface UseAiChatResult {
  messages: AiChatMessage[];
  session: AiChatSession | null;
  isLoadingHistory: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  inputValue: string;
  inputError: string | null;
  nextFieldConfig: AiChatNextFieldConfig | null;
  showSelectChips: boolean;
  fieldCaptureStatus: AiChatFieldCaptureStatus | null;
  phaseLabel: string;
  progressCurrent: number;
  progressTotal: number;
  isCompleted: boolean;
  isEscalated: boolean;
  showGuestWelcome: boolean;
  setInputValue: (value: string) => void;
  submitInput: () => Promise<void>;
  submitChip: (value: string) => Promise<void>;
  resetInputError: () => void;
}

const ORG_CODE = 'wecredit';
const CHANNEL = 'wecredit_bot';

export function useAiChat(isOpen: boolean): UseAiChatResult {
  const historyAbortRef = useRef<AbortController | null>(null);
  const submitAbortRef = useRef<AbortController | null>(null);
  const hasInitialHistoryLoadedRef = useRef<boolean>(false);
  const hasGuestStartedChatRef = useRef<boolean>(false);
  const prefillQuestionRef = useRef<string | null>(null);
  const submitValueRef = useRef<(value: string) => Promise<void>>(async () => Promise.resolve());
  const optimisticMessageRef = useRef<AiChatMessage | null>(null);
  const { user, isAuthenticated } = useAuthStore();
  const { prefillQuestion, sessionId } = useAiChatStore();

  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [session, setSession] = useState<AiChatSession | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [nextFieldConfig, setNextFieldConfig] = useState<AiChatNextFieldConfig | null>(null);
  const [dismissedSelectField, setDismissedSelectField] = useState<string | null>(null);
  const [fieldCaptureStatus, setFieldCaptureStatus] = useState<AiChatFieldCaptureStatus | null>(null);
  const [isEscalated, setIsEscalated] = useState<boolean>(false);

  const clearHistoryRequest = useCallback((): void => {
    if (!historyAbortRef.current) return;
    historyAbortRef.current.abort();
    historyAbortRef.current = null;
  }, []);

  const clearSubmitRequest = useCallback((): void => {
    if (!submitAbortRef.current) return;
    submitAbortRef.current.abort();
    submitAbortRef.current = null;
  }, []);

  const buildRequestContext = useCallback((): ChatHistoryParams => {
    const userId = resolveChatUserId({
      isAuthenticated,
      phoneNumber: user?.phoneNumber,
    });

    return {
      userId,
      organizationCode: ORG_CODE,
      channel: CHANNEL,
      sessionId: sessionId ?? undefined,
      mobile: user?.phoneNumber,
    };
  }, [isAuthenticated, sessionId, user?.phoneNumber]);

  const applyHistoryResponse = useCallback(
    (
      history: Awaited<ReturnType<typeof fetchChatHistory>>['data'],
      options?: { suppressMessages?: boolean },
    ): void => {
      if (!history) return;

      const turns = history.turns ?? [];
      const suppressMessages = Boolean(options?.suppressMessages);
      const mappedMessages = suppressMessages ? [] : mapHistoryTurnsToMessages(turns);

      const shouldAppendPendingQuestion =
        !suppressMessages &&
        history.session.shouldAskNextQuestion &&
        !history.session.isCompleted &&
        Boolean(history.session.pendingQuestion) &&
        !mappedMessages.some((message) => message.text === history.session.pendingQuestion);

      if (shouldAppendPendingQuestion && history.session.pendingQuestion) {
        mappedMessages.push({
          id: `pending_${history.session.updatedAt}`,
          role: 'assistant',
          text: history.session.pendingQuestion,
        });
      }

      setMessages(mappedMessages);
      setSession(history.session);

      const { fieldCaptureStatus, nextFieldConfig } = buildFieldCaptureFromHistory(
        history.session,
        turns,
      );
      setFieldCaptureStatus(fieldCaptureStatus);
      setNextFieldConfig(nextFieldConfig);
      setIsEscalated(false);
    },
    [],
  );

  const refreshChatHistory = useCallback(
    async (
      signal: AbortSignal,
      fallbackMessage: string = AI_CHAT_COPY.genericError,
      options?: { suppressMessages?: boolean },
    ): Promise<boolean> => {
      const context = buildRequestContext();
      const response = await fetchChatHistory(context, signal);
      if (!response.success || !response.data) {
        if (response.error !== 'aborted') {
          setErrorMessage(response.error ?? fallbackMessage);
        }
        return false;
      }

      applyHistoryResponse(response.data, options);
      return true;
    },
    [applyHistoryResponse, buildRequestContext],
  );

  const refreshChatHistoryAfterPromotion = useCallback(
    async (signal?: AbortSignal): Promise<boolean> => {
      setIsLoadingHistory(true);
      setErrorMessage(null);
      setInputError(null);

      const didRefresh = await refreshChatHistory(
        signal ?? new AbortController().signal,
        AI_CHAT_COPY.historyRefreshErrorMessage,
        { suppressMessages: false },
      );
      setIsLoadingHistory(false);
      return didRefresh;
    },
    [refreshChatHistory],
  );

  useEffect(() => {
    prefillQuestionRef.current = prefillQuestion;
  }, [prefillQuestion]);

  const handleChatQuerySuccess = useCallback(
    async (data: Awaited<ReturnType<typeof submitChatQuery>>['data'], userId: string): Promise<void> => {
      if (!data) return;

      const { didPromote } = promoteChatAuthFromResponse(data);
      const sessionUserId = getEffectiveChatUserId() ?? userId;

      if (data.validation && !data.validation.isValid) {
        if (data.answer) {
          setMessages((prev) => [
            ...prev,
            {
              id: `server_validation_${Date.now()}`,
              role: 'assistant',
              text: data.answer,
            },
          ]);
        }

        applyChatQueryResponseState({
          data,
          currentSession: session,
          userId: sessionUserId,
          setSession,
          setFieldCaptureStatus,
          setNextFieldConfig,
          setIsEscalated,
        });

        if (didPromote) {
          await refreshChatHistoryAfterPromotion();
        }
        return;
      }

      applyChatQueryResponseState({
        data,
        currentSession: session,
        userId: sessionUserId,
        setSession,
        setFieldCaptureStatus,
        setNextFieldConfig,
        setIsEscalated,
      });

      const assistantMessages = getChatQueryAssistantMessages(data);
      if (assistantMessages.length > 0) {
        setMessages((prev) => [...prev, ...assistantMessages]);
      }

      if (didPromote) {
        await refreshChatHistoryAfterPromotion();
      }
    },
    [refreshChatHistoryAfterPromotion, session],
  );

  const submitValue = useCallback(
    async (value: string, displayValue?: string): Promise<void> => {
      const trimmedValue = value.trim();
      if (!trimmedValue || isSubmitting) return;

      // Guest welcome should remain until the guest sends their first message.
      if (!isAuthenticated && !hasGuestStartedChatRef.current) {
        hasGuestStartedChatRef.current = true;
      }

      setInputError(null);

      const optimisticMessage: AiChatMessage = {
        id: `local_user_${Date.now()}`,
        role: 'user',
        text: displayValue ?? trimmedValue,
      };
      optimisticMessageRef.current = optimisticMessage;
      setMessages((prev) => [...prev, optimisticMessage]);
      setInputValue('');
      setIsSubmitting(true);
      setErrorMessage(null);

      clearSubmitRequest();
      const controller = new AbortController();
      submitAbortRef.current = controller;

      try {
        const context = buildRequestContext();
        const response = await submitChatQuery(
          {
            ...context,
            query: trimmedValue,
            field: nextFieldConfig?.field,
          },
          controller.signal,
        );

        if (!response.success || !response.data) {
          setMessages((prev) =>
            prev.filter((message) => message.id !== optimisticMessageRef.current?.id),
          );
          if (response.error !== 'aborted') {
            setErrorMessage(response.error ?? AI_CHAT_COPY.genericError);
          }
          return;
        }

        await handleChatQuerySuccess(response.data, context.userId);
      } catch (error) {
        setMessages((prev) =>
          prev.filter((message) => message.id !== optimisticMessageRef.current?.id),
        );
        if (!isAbortError(error)) {
          setErrorMessage(getErrorMessage(error, AI_CHAT_COPY.genericError));
        }
      } finally {
        if (submitAbortRef.current === controller) {
          submitAbortRef.current = null;
        }
        optimisticMessageRef.current = null;
        setIsSubmitting(false);
      }
    },
    [buildRequestContext, clearSubmitRequest, handleChatQuerySuccess, isSubmitting, nextFieldConfig],
  );

  useEffect(() => {
    submitValueRef.current = submitValue;
  }, [submitValue]);

  useEffect(() => {
    if (!isOpen) {
      clearHistoryRequest();
      clearSubmitRequest();
      hasInitialHistoryLoadedRef.current = false;
      hasGuestStartedChatRef.current = false;
      setMessages([]);
      setSession(null);
      setErrorMessage(null);
      setInputValue('');
      setInputError(null);
      setNextFieldConfig(null);
      setDismissedSelectField(null);
      setFieldCaptureStatus(null);
      setIsEscalated(false);
      return;
    }

    if (hasInitialHistoryLoadedRef.current) {
      return;
    }

    hasInitialHistoryLoadedRef.current = true;
    clearHistoryRequest();
    const controller = new AbortController();
    historyAbortRef.current = controller;
    setIsLoadingHistory(true);
    setErrorMessage(null);
    setInputError(null);

    const loadHistory = async (): Promise<void> => {
      const shouldSuppressGuestMessages =
        !isAuthenticated && !hasGuestStartedChatRef.current;

      const didRefresh = await refreshChatHistory(
        controller.signal,
        AI_CHAT_COPY.historyRefreshErrorMessage,
        { suppressMessages: shouldSuppressGuestMessages },
      );
      setIsLoadingHistory(false);

      if (!didRefresh) {
        return;
      }

      if (prefillQuestionRef.current?.trim()) {
        // Prefill counts as the first guest message, so hide the guest welcome.
        hasGuestStartedChatRef.current = true;
        void submitValueRef.current(prefillQuestionRef.current.trim());
      }
    };

    void loadHistory();
    return () => {
      if (historyAbortRef.current === controller) {
        controller.abort();
        historyAbortRef.current = null;
      }
    };
  }, [clearHistoryRequest, clearSubmitRequest, isOpen, refreshChatHistory]);

  const progressCurrent = fieldCaptureStatus?.capturedFields?.length ?? 0;
  const progressTotal = fieldCaptureStatus?.requiredFields?.length ?? 0;
  const phaseLabel = useMemo(() => {
    if (fieldCaptureStatus?.nextField || session?.isFieldCaptureActive) return 'LOAN MATCHING';
    return 'CHAT';
  }, [fieldCaptureStatus?.nextField, session?.isFieldCaptureActive]);

  const isCompleted = Boolean(session?.isCompleted) || Boolean(fieldCaptureStatus && !fieldCaptureStatus.nextField);

  const showSelectChips = useMemo(() => {
    if (isCompleted || nextFieldConfig?.inputType !== 'select') {
      return false;
    }

    const activeField = nextFieldConfig.field;
    return dismissedSelectField !== activeField;
  }, [dismissedSelectField, isCompleted, nextFieldConfig]);

  const showGuestWelcome = !isAuthenticated && !hasGuestStartedChatRef.current && !isLoadingHistory;

  return {
    messages,
    session,
    isLoadingHistory,
    isSubmitting,
    errorMessage,
    inputValue,
    inputError,
    nextFieldConfig,
    showSelectChips,
    fieldCaptureStatus,
    phaseLabel,
    progressCurrent,
    progressTotal,
    isCompleted,
    isEscalated,
    showGuestWelcome,
    setInputValue,
    submitInput: async () => submitValue(inputValue),
    submitChip: async (value: string) => {
      if (nextFieldConfig?.field) {
        setDismissedSelectField(nextFieldConfig.field);
      }

      await submitValue(
        value,
        nextFieldConfig?.options.find((option) => option.value === value)?.label ?? value,
      );
    },
    resetInputError: () => setInputError(null),
  };
}
