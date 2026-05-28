'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchChatHistory, submitChatQuery } from '@/lib/api/ai-chat-service';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat-copy';
import { useAuthStore } from '@/stores/auth-store';
import { useAiChatStore } from '@/stores/ai-chat-store';
import { getErrorMessage, isAbortError } from '@/lib/utils/error-helpers';
import type {
  AiChatFieldCaptureStatus,
  AiChatNextFieldConfig,
  AiChatSession,
  AiChatTurn,
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
  fieldCaptureStatus: AiChatFieldCaptureStatus | null;
  phaseLabel: string;
  progressCurrent: number;
  progressTotal: number;
  isCompleted: boolean;
  isEscalated: boolean;
  requiresLogin: boolean;
  pendingFirstMessage: string | null;
  setInputValue: (value: string) => void;
  submitInput: () => Promise<void>;
  submitChip: (value: string) => Promise<void>;
  resetInputError: () => void;
  clearRequiresLogin: () => void;
}

const ORG_CODE = 'wecredit';
const CHANNEL = 'wecredit_bot';
const PENDING_FIELD_FALLBACKS: Record<string, AiChatNextFieldConfig> = {
  requiredLoanAmount: {
    field: 'requiredLoanAmount',
    label: 'Required loan amount',
    inputType: 'select',
    uiType: 'chips',
    required: true,
    placeholder: 'Select loan amount',
    options: [
      { label: '₹1L—₹2L', value: '100000-200000' },
      { label: '₹2L—₹5L', value: '200000-500000' },
      { label: '₹5L—₹10L', value: '500000-1000000' },
      { label: 'Above ₹10L', value: '1000000+' },
    ],
  },
};

function mapTurnsToMessages(turns: AiChatTurn[]): AiChatMessage[] {
  const mapped: AiChatMessage[] = [];

  turns.forEach((turn) => {
    if (turn.turnType === 'chat') {
      if (turn.userQuery) {
        mapped.push({ id: `${turn.turnId}_user`, role: 'user', text: turn.userQuery });
      }
      if (turn.assistantResponse) {
        mapped.push({
          id: `${turn.turnId}_assistant`,
          role: 'assistant',
          text: turn.assistantResponse,
        });
      }
      return;
    }

    if (turn.askedQuestion) {
      mapped.push({
        id: `${turn.turnId}_asked`,
        role: 'assistant',
        text: turn.askedQuestion,
      });
    }
    if (turn.userAnswer) {
      mapped.push({ id: `${turn.turnId}_user`, role: 'user', text: turn.userAnswer });
    }
    if (turn.assistantResponse) {
      mapped.push({
        id: `${turn.turnId}_assistant`,
        role: 'assistant',
        text: turn.assistantResponse,
      });
    }
  });

  return mapped;
}

function getValidationRegex(nextFieldConfig: AiChatNextFieldConfig | null): RegExp | null {
  const regex = nextFieldConfig?.validation?.regex;
  if (!regex) return null;

  try {
    return new RegExp(regex);
  } catch {
    return null;
  }
}

export function useAiChat(isOpen: boolean): UseAiChatResult {
  const historyAbortRef = useRef<AbortController | null>(null);
  const submitAbortRef = useRef<AbortController | null>(null);
  const hasInitialHistoryLoadedRef = useRef<boolean>(false);
  const pendingFirstMessageRef = useRef<string | null>(null);
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
  const [fieldCaptureStatus, setFieldCaptureStatus] = useState<AiChatFieldCaptureStatus | null>(null);
  const [isEscalated, setIsEscalated] = useState<boolean>(false);
  const [requiresLogin, setRequiresLogin] = useState<boolean>(false);
  const [pendingFirstMessage, setPendingFirstMessage] = useState<string | null>(null);

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
    const userId = user?.phoneNumber || '';
    return {
      userId,
      organizationCode: ORG_CODE,
      channel: CHANNEL,
      sessionId: sessionId ?? undefined,
      mobile: user?.phoneNumber,
    };
  }, [sessionId, user?.id, user?.phoneNumber]);

  const applyHistoryResponse = useCallback(
    (history: Awaited<ReturnType<typeof fetchChatHistory>>['data']): void => {
      if (!history) return;

      const mappedMessages = mapTurnsToMessages(history.turns ?? []);
      const hasPendingQuestion =
        Boolean(history.session?.pendingQuestion) &&
        !mappedMessages.some((message) => message.text === history.session.pendingQuestion);

      if (hasPendingQuestion && history.session.pendingQuestion) {
        mappedMessages.push({
          id: `pending_${history.session.updatedAt}`,
          role: 'assistant',
          text: history.session.pendingQuestion,
        });
      }

      setMessages(mappedMessages);
      setSession(history.session);
      setFieldCaptureStatus(null);
      setNextFieldConfig(
        history.session.pendingField
          ? PENDING_FIELD_FALLBACKS[history.session.pendingField] ?? null
          : null,
      );
      setIsEscalated(false);
    },
    [],
  );

  const seedGuestWelcomeMessage = useCallback((): void => {
    setMessages([
      {
        id: 'guest_welcome',
        role: 'assistant',
        text: AI_CHAT_COPY.guestWelcomeMessage,
      },
    ]);
    setSession(null);
    setFieldCaptureStatus(null);
    setNextFieldConfig(null);
    setIsEscalated(false);
  }, []);

  const refreshChatHistory = useCallback(
    async (
      signal: AbortSignal,
      fallbackMessage: string = AI_CHAT_COPY.genericError,
    ): Promise<boolean> => {
      const context = buildRequestContext();
      const response = await fetchChatHistory(context, signal);
      if (!response.success || !response.data) {
        if (response.error !== 'aborted') {
          setErrorMessage(response.error ?? fallbackMessage);
        }
        return false;
      }

      applyHistoryResponse(response.data);
      return true;
    },
    [applyHistoryResponse, buildRequestContext],
  );

  useEffect(() => {
    pendingFirstMessageRef.current = pendingFirstMessage;
  }, [pendingFirstMessage]);

  useEffect(() => {
    prefillQuestionRef.current = prefillQuestion;
  }, [prefillQuestion]);

  const submitValue = useCallback(
    async (value: string): Promise<void> => {
      const trimmedValue = value.trim();
      if (!trimmedValue || isSubmitting) return;

      if (!isAuthenticated) {
        setPendingFirstMessage(trimmedValue);
        setRequiresLogin(true);
        return;
      }

      setInputError(null);

      const clientValidationRegex = getValidationRegex(nextFieldConfig);
      if (clientValidationRegex && !clientValidationRegex.test(trimmedValue)) {
        setInputError(nextFieldConfig?.validation?.errorMessage ?? 'Please enter a valid value.');
        return;
      }

      const optimisticMessage: AiChatMessage = {
        id: `local_user_${Date.now()}`,
        role: 'user',
        text: trimmedValue,
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

        const data = response.data;

        if (data.validation && !data.validation.isValid) {
          setMessages((prev) =>
            prev.filter((message) => message.id !== optimisticMessageRef.current?.id),
          );
          setInputValue(trimmedValue);
          setInputError(data.validation.errorMessage ?? 'Please enter a valid value.');
          return;
        }

        if (data.answer) {
          setMessages((prev) => [
            ...prev,
            {
              id: `server_assistant_${Date.now()}`,
              role: 'assistant',
              text: data.answer,
            },
          ]);
        }

        await refreshChatHistory(controller.signal, AI_CHAT_COPY.historyRefreshErrorMessage);
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
    [
      buildRequestContext,
      clearSubmitRequest,
      isAuthenticated,
      isSubmitting,
      nextFieldConfig,
      refreshChatHistory,
    ],
  );

  useEffect(() => {
    submitValueRef.current = submitValue;
  }, [submitValue]);

  useEffect(() => {
    if (!isOpen) {
      clearHistoryRequest();
      clearSubmitRequest();
      hasInitialHistoryLoadedRef.current = false;
      setMessages([]);
      setSession(null);
      setErrorMessage(null);
      setInputValue('');
      setInputError(null);
      setNextFieldConfig(null);
      setFieldCaptureStatus(null);
      setIsEscalated(false);
      setRequiresLogin(false);
      setPendingFirstMessage(null);
      pendingFirstMessageRef.current = null;
      return;
    }

    if (!isAuthenticated) {
      clearHistoryRequest();
      clearSubmitRequest();
      hasInitialHistoryLoadedRef.current = false;
      setErrorMessage(null);
      setInputError(null);
      setIsLoadingHistory(false);
      seedGuestWelcomeMessage();
      return;
    }

    const queuedPendingMessage = pendingFirstMessageRef.current?.trim();
    if (queuedPendingMessage) {
      pendingFirstMessageRef.current = null;
      setPendingFirstMessage(null);
      setRequiresLogin(false);
      void submitValueRef.current(queuedPendingMessage);
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
      const didRefresh = await refreshChatHistory(controller.signal);
      setIsLoadingHistory(false);

      if (!didRefresh) {
        return;
      }

      if (prefillQuestionRef.current?.trim()) {
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
  }, [
    clearHistoryRequest,
    clearSubmitRequest,
    isAuthenticated,
    isOpen,
    refreshChatHistory,
    seedGuestWelcomeMessage,
  ]);

  const progressCurrent = fieldCaptureStatus?.capturedFields.length ?? 0;
  const progressTotal = fieldCaptureStatus?.requiredFields.length ?? 0;
  const phaseLabel = useMemo(() => {
    if (fieldCaptureStatus?.nextField || session?.isFieldCaptureActive) return 'LOAN MATCHING';
    return 'CHAT';
  }, [fieldCaptureStatus?.nextField, session?.isFieldCaptureActive]);

  const isCompleted = Boolean(session?.isCompleted) || Boolean(fieldCaptureStatus && !fieldCaptureStatus.nextField);

  return {
    messages,
    session,
    isLoadingHistory,
    isSubmitting,
    errorMessage,
    inputValue,
    inputError,
    nextFieldConfig,
    fieldCaptureStatus,
    phaseLabel,
    progressCurrent,
    progressTotal,
    isCompleted,
    isEscalated,
    requiresLogin,
    pendingFirstMessage,
    setInputValue,
    submitInput: async () => submitValue(inputValue),
    submitChip: async (value: string) => submitValue(value),
    resetInputError: () => setInputError(null),
    clearRequiresLogin: () => setRequiresLogin(false),
  };
}
