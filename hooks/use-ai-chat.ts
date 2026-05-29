'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchChatHistory, submitChatQuery } from '@/lib/api/ai-chat-service';
import { applyChatQueryResponseState } from '@/lib/ai-chat/apply-chat-query-response';
import { buildFieldCaptureFromHistory } from '@/lib/ai-chat/build-field-capture-from-history';
import { getChatQueryAssistantMessages } from '@/lib/ai-chat/get-chat-query-assistant-messages';
import { mapHistoryTurnsToMessages } from '@/lib/ai-chat/map-history-turns-to-messages';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat-copy';
import { useOtpAuthFlow } from '@/hooks/use-otp-auth-flow';
import { maskPhoneNumber } from '@/lib/utils/mask-phone';
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
  fieldCaptureStatus: AiChatFieldCaptureStatus | null;
  phaseLabel: string;
  progressCurrent: number;
  progressTotal: number;
  isCompleted: boolean;
  isEscalated: boolean;
  guestAuthStep: 'phone' | 'otp';
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
  const prefillQuestionRef = useRef<string | null>(null);
  const submitValueRef = useRef<(value: string) => Promise<void>>(async () => Promise.resolve());
  const optimisticMessageRef = useRef<AiChatMessage | null>(null);
  const { user, isAuthenticated, setUser } = useAuthStore();
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
  const [guestAuthStep, setGuestAuthStep] = useState<'phone' | 'otp'>('phone');
  const [guestAuthPhone, setGuestAuthPhone] = useState<string>('');

  const {
    error: authError,
    sendOtp,
    verifyOtp,
  } = useOtpAuthFlow({
    initialPhoneNumber: '',
    onAuthenticated: (authenticatedUser, token) => {
      setUser(authenticatedUser, token);
    },
  });

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

      const turns = history.turns ?? [];
      const mappedMessages = mapHistoryTurnsToMessages(turns);

      const shouldAppendPendingQuestion =
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

  const refreshChatHistoryAfterGuestAuth = useCallback(
    async (mobileNumber: string): Promise<void> => {
      const normalizedMobile = mobileNumber.trim();
      if (!normalizedMobile) {
        return;
      }

      // Force immediate history hydration after OTP success so guests see the
      // initial/pending AI question without reopening the modal.
      hasInitialHistoryLoadedRef.current = true;
      setIsLoadingHistory(true);
      setErrorMessage(null);
      setInputError(null);

      const response = await fetchChatHistory({
        userId: normalizedMobile,
        organizationCode: ORG_CODE,
        channel: CHANNEL,
        sessionId: sessionId ?? undefined,
        mobile: normalizedMobile,
      });

      if (!response.success || !response.data) {
        setErrorMessage(response.error ?? AI_CHAT_COPY.historyRefreshErrorMessage);
        setIsLoadingHistory(false);
        return;
      }

      applyHistoryResponse(response.data);
      setGuestAuthStep('phone');
      setGuestAuthPhone('');
      setIsLoadingHistory(false);
    },
    [applyHistoryResponse, sessionId],
  );

  useEffect(() => {
    prefillQuestionRef.current = prefillQuestion;
  }, [prefillQuestion]);

  useEffect(() => {
    if (!isAuthenticated && authError) {
      setInputError(authError);
    }
  }, [authError, isAuthenticated]);

  const submitValue = useCallback(
    async (value: string, displayValue?: string): Promise<void> => {
      const trimmedValue = value.trim();
      if (!trimmedValue || isSubmitting) return;

      if (!isAuthenticated) {
        setInputError(null);

        // Keep guest auth fully conversational: first capture phone, then OTP.
        if (guestAuthStep === 'phone') {
          const isPhoneValid = trimmedValue.length === 10 && /^[6-9]/.test(trimmedValue) && /^\d{10}$/.test(trimmedValue);
          if (!isPhoneValid) {
            setInputError(AI_CHAT_COPY.loginPhoneInvalid);
            return;
          }

          setIsSubmitting(true);
          setErrorMessage(null);
          setInputValue('');
          setMessages((prev) => [...prev, { id: `guest_phone_${Date.now()}`, role: 'user', text: trimmedValue }]);
          setGuestAuthPhone(trimmedValue);

          const isOtpSent = await sendOtp(trimmedValue);
          if (!isOtpSent) {
            setInputError(authError ?? 'Failed to send OTP. Please try again.');
            setIsSubmitting(false);
            return;
          }

          setGuestAuthStep('otp');
          setMessages((prev) => [
            ...prev,
            {
              id: `guest_otp_prompt_${Date.now()}`,
              role: 'assistant',
              text: AI_CHAT_COPY.loginOtpPrompt.replace('{phone}', maskPhoneNumber(trimmedValue)),
            },
          ]);
          setIsSubmitting(false);
          return;
        }

        const isOtpValid = /^\d{6}$/.test(trimmedValue);
        if (!isOtpValid) {
          setInputError(AI_CHAT_COPY.loginOtpInvalid);
          return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);
        setInputValue('');
        setMessages((prev) => [...prev, { id: `guest_otp_${Date.now()}`, role: 'user', text: '••••••' }]);

        const isOtpVerified = await verifyOtp(trimmedValue, guestAuthPhone);
        if (!isOtpVerified) {
          setInputError(authError ?? 'Invalid OTP. Please try again.');
          setIsSubmitting(false);
          return;
        }
        await refreshChatHistoryAfterGuestAuth(guestAuthPhone);
        setIsSubmitting(false);
        return;
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

        const data = response.data;
        const userId = context.userId;

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
            userId,
            setSession,
            setFieldCaptureStatus,
            setNextFieldConfig,
            setIsEscalated,
          });
          return;
        }

        applyChatQueryResponseState({
          data,
          currentSession: session,
          userId,
          setSession,
          setFieldCaptureStatus,
          setNextFieldConfig,
          setIsEscalated,
        });

        const assistantMessages = getChatQueryAssistantMessages(data);
        if (assistantMessages.length > 0) {
          setMessages((prev) => [...prev, ...assistantMessages]);
        }
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
      authError,
      guestAuthPhone,
      guestAuthStep,
      isAuthenticated,
      isSubmitting,
      nextFieldConfig,
      refreshChatHistoryAfterGuestAuth,
      sendOtp,
      session,
      verifyOtp,
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
      setGuestAuthStep('phone');
      setGuestAuthPhone('');
      return;
    }

    if (!isAuthenticated) {
      clearHistoryRequest();
      clearSubmitRequest();
      hasInitialHistoryLoadedRef.current = false;
      setErrorMessage(null);
      setInputError(null);
      setIsLoadingHistory(false);
      setGuestAuthStep('phone');
      setGuestAuthPhone('');
      seedGuestWelcomeMessage();
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

  const progressCurrent = fieldCaptureStatus?.capturedFields?.length ?? 0;
  const progressTotal = fieldCaptureStatus?.requiredFields?.length ?? 0;
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
    guestAuthStep,
    setInputValue,
    submitInput: async () => submitValue(inputValue),
    submitChip: async (value: string) =>
      submitValue(
        value,
        nextFieldConfig?.options.find((option) => option.value === value)?.label ?? value,
      ),
    resetInputError: () => setInputError(null),
  };
}
