'use client';

import { getCookie } from 'cookies-next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchChatHistory, submitChatQuery } from '@/lib/api/ai-chat-service';
import { applyChatQueryResponseState } from '@/lib/ai-chat/apply-chat-query-response';
import { buildFieldCaptureFromHistory } from '@/lib/ai-chat/build-field-capture-from-history';
import {
  getEffectiveChatUserId,
  isGuestChatUserId,
  resolveChatUserId,
} from '@/lib/ai-chat/chat-identity';
import { getChatQueryAssistantMessages } from '@/lib/ai-chat/get-chat-query-assistant-messages';
import { mapHistoryResponseToMessages } from '@/lib/ai-chat/offer-sync/map-history-response-messages';
import { patchOfferListMessages } from '@/lib/ai-chat/patch-offer-list-messages';
import { prefetchChatConsentIp } from '@/lib/ai-chat/chat-consent-ip';
import { isFieldCaptureStage, isOfferSyncStage } from '@/lib/ai-chat/normalize-bot-stage';
import {
  resolveOfferSyncCredentialsFromHistory,
  shouldStartOfferSyncFromHistory,
} from '@/lib/ai-chat/resolve-offer-sync-credentials-from-history';
import { resolveSessionAfterHistoryLoad } from '@/lib/ai-chat/resolve-session-after-history-load';
import { resolveApiStage } from '@/lib/ai-chat/session-stage';
import { resolveAiChatInputState } from '@/lib/ai-chat/resolve-chat-input-state';
import { normalizeSessionFromApi } from '@/lib/ai-chat/session-stage';
import { logAiChat } from '@/lib/ai-chat/ai-chat-logger';
import { promoteChatAuthFromResponse } from '@/lib/ai-chat/promote-chat-auth-from-response';
import { AI_CHAT_COPY } from '@/lib/constants/ai-chat';
import { STORAGE_MOBILE } from '@/lib/constants/api-keys';
import { useAiChatOfferSync } from '@/hooks/use-ai-chat-offer-sync';
import { useAuthStore } from '@/stores/auth-store';
import { useAiChatStore } from '@/stores/ai-chat-store';
import { getErrorMessage, isAbortError } from '@/lib/utils/error-helpers';
import type {
  AiChatFieldCaptureStatus,
  AiChatNextFieldConfig,
  AiChatRenderableMessage,
  AiChatSession,
  ChatHistoryParams,
} from '@/types/ai-chat';
import type { LenderOfferStatus } from '@/types/wecredit';

interface UseAiChatResult {
  messages: AiChatRenderableMessage[];
  chatUserId: string;
  session: AiChatSession | null;
  isLoadingHistory: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  inputValue: string;
  inputError: string | null;
  nextFieldConfig: AiChatNextFieldConfig | null;
  showSelectChips: boolean;
  fieldCaptureStatus: AiChatFieldCaptureStatus | null;
  isFieldCaptureComplete: boolean;
  isChatInputDisabled: boolean;
  isEscalated: boolean;
  showGuestWelcome: boolean;
  isOfferPolling: boolean;
  isCheckingOfferStatus: boolean;
  showOfferPolling: boolean;
  onLiveOffersUpdated: (offers: LenderOfferStatus[], canReHit: boolean) => void;
  setInputValue: (value: string) => void;
  submitInput: () => Promise<void>;
  submitChip: (value: string) => Promise<void>;
  resetInputError: () => void;
}

const ORG_CODE = 'wecredit';
const CHANNEL = 'wecredit_bot';
const CHAT_HISTORY_NOT_FOUND_ERROR = 'chat_history_not_found';

export function useAiChat(isOpen: boolean): UseAiChatResult {
  const historyAbortRef = useRef<AbortController | null>(null);
  const submitAbortRef = useRef<AbortController | null>(null);
  const [hasGuestStartedChat, setHasGuestStartedChat] = useState<boolean>(false);
  /** True when history is empty / not found — drives Trustfin welcome for guests and new signed-in users. */
  const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(false);
  const prefillQuestionRef = useRef<string | null>(null);
  const submitValueRef = useRef<(value: string) => Promise<void>>(async () => Promise.resolve());
  const optimisticMessageRef = useRef<AiChatRenderableMessage | null>(null);
  const sessionRef = useRef<AiChatSession | null>(null);
  const messagesRef = useRef<AiChatRenderableMessage[]>([]);
  /** Latest chat-query auth hints — used when stage flips to `completed` on the same response. */
  const [offerSyncCredentials, setOfferSyncCredentials] = useState<{
    mobile?: string;
    token?: string;
  }>({});
  /**
   * Offer-sync flow (check-status-all polling):
   * 1. chat-query returns stage `completed` → requestOfferSync() bumps this counter
   * 2. useAiChatOfferSync sees the bump + session.stage `completed` → starts polling
   * 3. Each tick: check-status-all → chat-offer persist → inject offer_list into messages
   * 4. Backend later moves stage to `offer_received` — polling stops (only `completed` polls)
   */
  const [offerSyncTrigger, setOfferSyncTrigger] = useState(0);
  const { user, isAuthenticated } = useAuthStore();
  const { prefillQuestion } = useAiChatStore();

  const [messages, setMessages] = useState<AiChatRenderableMessage[]>([]);
  const [session, setSession] = useState<AiChatSession | null>(null);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
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
      mobile: user?.phoneNumber,
    };
  }, [isAuthenticated, user?.phoneNumber]);

  const chatUserId = useMemo(
    () =>
      resolveChatUserId({
        isAuthenticated,
        phoneNumber: user?.phoneNumber,
      }),
    [isAuthenticated, user?.phoneNumber],
  );

  /** Wakes useAiChatOfferSync — it compares this counter to detect a fresh chat-query `completed`. */
  const requestOfferSync = useCallback((): void => {
    setOfferSyncTrigger((count) => count + 1);
  }, []);

  const applyHistoryResponse = useCallback(
    (
      history: Awaited<ReturnType<typeof fetchChatHistory>>['data'],
      options?: { suppressMessages?: boolean },
    ): void => {
      if (!history) return;

      const mappedMessages = mapHistoryResponseToMessages(history, options);
      const hasHistoryOffers = mappedMessages.some((message) => message.kind === 'offer_list');
      const normalizedSession = normalizeSessionFromApi(history.session);
      // Prefer live session.stage from chat-query over lagging history (see resolveSessionAfterHistoryLoad).
      const resolvedSession = resolveSessionAfterHistoryLoad(
        sessionRef.current,
        normalizedSession,
        { hasOfferListMessages: hasHistoryOffers },
      );

      setMessages(mappedMessages);
      setSession(resolvedSession);

      // Modal reopen path: history says `completed` but offer turn not saved yet — start polling.
      if (shouldStartOfferSyncFromHistory(resolvedSession, hasHistoryOffers)) {
        setOfferSyncCredentials(
          resolveOfferSyncCredentialsFromHistory(resolvedSession, history.turns ?? []),
        );
        requestOfferSync();
      }

      const { fieldCaptureStatus, nextFieldConfig } = buildFieldCaptureFromHistory(
        resolvedSession,
        history.turns ?? [],
      );
      setFieldCaptureStatus(fieldCaptureStatus);
      setNextFieldConfig(nextFieldConfig);
      setIsEscalated(false);
    },
    [requestOfferSync],
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
        if (response.error !== 'aborted' && response.error !== CHAT_HISTORY_NOT_FOUND_ERROR) {
          logAiChat('hook', 'refreshChatHistory failed', {
            userId: context.userId,
            error: response.error ?? null,
          });
        }

        if (response.error === CHAT_HISTORY_NOT_FOUND_ERROR) {
          // Backend uses "chat history not found" for brand new users.
          // Treat this as an empty chat so the Trustfin guest welcome is shown.
          setMessages([]);
          setSession(null);
          setFieldCaptureStatus(null);
          setNextFieldConfig(null);
          setIsEscalated(false);
          setErrorMessage(null);
          setHasGuestStartedChat(false);
          setShowWelcomeScreen(true);
          return true;
        }

        if (response.error !== 'aborted') {
          setErrorMessage(response.error ?? fallbackMessage);
        }
        return false;
      }

      applyHistoryResponse(response.data, options);
      const turnCount = response.data.turns?.length ?? 0;
      setShowWelcomeScreen(turnCount === 0);
      return true;
    },
    [applyHistoryResponse, buildRequestContext],
  );

  const refreshChatHistorySilently = useCallback(async (): Promise<void> => {
    await refreshChatHistory(
      new AbortController().signal,
      AI_CHAT_COPY.historyRefreshErrorMessage,
    );
  }, [refreshChatHistory]);

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
      const responseStage = resolveApiStage(data.stage, data.session?.stage);

      const resolvedOfferSyncMobile =
        data.mobile?.trim() ||
        (/^[6-9]\d{9}$/.test(sessionUserId) ? sessionUserId : undefined) ||
        // Cookie is set synchronously by completeAppLogin inside promoteChatAuthFromResponse,
        // so it is readable here even before the auth store React state re-renders.
        (getCookie(STORAGE_MOBILE) as string | undefined)?.trim() ||
        undefined;

      setOfferSyncCredentials({
        mobile: resolvedOfferSyncMobile,
        token: data.authToken ?? undefined,
      });

      // --- Offer-sync entry (primary path: chat-query returns stage `completed`) ---

      if (data.validation && !data.validation.isValid) {
        if (data.answer) {
          setMessages((prev) => [
            ...prev,
            {
              kind: 'text',
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

        // Field capture done — bump trigger so useAiChatOfferSync starts check-status-all polling.
        if (isOfferSyncStage(responseStage)) {
          requestOfferSync();
        }

        // Only reload history on promotion when we are not entering the offer-sync phase.
        if (didPromote && !isOfferSyncStage(responseStage)) {
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

      const assistantMessages = getChatQueryAssistantMessages(data).map((message) => ({
        kind: 'text' as const,
        id: message.id,
        role: message.role,
        text: message.text,
      }));
      if (assistantMessages.length > 0) {
        setMessages((prev) => [...prev, ...assistantMessages]);
      }

      // Same offer-sync trigger on the happy path (last field answer → stage `completed`).
      if (isOfferSyncStage(responseStage)) {
        requestOfferSync();
      }

      if (didPromote && !isOfferSyncStage(responseStage)) {
        await refreshChatHistoryAfterPromotion();
      }
    },
    [refreshChatHistoryAfterPromotion, requestOfferSync, session],
  );

  const submitValue = useCallback(
    async (value: string, displayValue?: string): Promise<void> => {
      const trimmedValue = value.trim();
      if (!trimmedValue || isSubmitting) return;

      // Guest welcome should remain until the guest sends their first message.
      if (isGuestChatUserId(buildRequestContext().userId)) {
        setHasGuestStartedChat(true);
      }
      setShowWelcomeScreen(false);

      setInputError(null);

      const optimisticMessage: AiChatRenderableMessage = {
        kind: 'text',
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
      setHasGuestStartedChat(false);
      setShowWelcomeScreen(false);
      setMessages([]);
      setSession(null);
      setErrorMessage(null);
      setInputValue('');
      setInputError(null);
      setNextFieldConfig(null);
      setDismissedSelectField(null);
      setFieldCaptureStatus(null);
      setIsEscalated(false);
      setOfferSyncCredentials({});
      setOfferSyncTrigger(0);
      return;
    }

    void prefetchChatConsentIp();

    // Guest promotion changes isAuthenticated/phoneNumber → buildRequestContext re-runs this effect.
    // Reloading history mid-poll can replace session.stage `completed` with `offer_received` and kill polling.
    const hasOfferListMessages = messagesRef.current.some((message) => message.kind === 'offer_list');
    const isCompletedAwaitingOffers =
      isOfferSyncStage(sessionRef.current?.stage) && !hasOfferListMessages;

    if (isCompletedAwaitingOffers) {
      setIsLoadingHistory(false);
      return;
    }

    clearHistoryRequest();
    const controller = new AbortController();
    historyAbortRef.current = controller;
    setIsLoadingHistory(true);
    setErrorMessage(null);
    setInputError(null);

    const loadHistory = async (): Promise<void> => {
      // Always render server history when it exists.
      // Welcome screen is now controlled by turnCount === 0 and not-found handling.
      const loadContext = buildRequestContext();
      const shouldSuppressGuestMessages = false;

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
        setHasGuestStartedChat(true);
        setShowWelcomeScreen(false);
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
  }, [buildRequestContext, clearHistoryRequest, clearSubmitRequest, isOpen, refreshChatHistory]);

  const sessionStage = session?.stage;
  const { isFieldCaptureComplete, isChatInputDisabled } = useMemo(
    () => resolveAiChatInputState(sessionStage),
    [sessionStage],
  );

  const onLiveOffersUpdated = useCallback((offers: LenderOfferStatus[], canReHit: boolean) => {
    setMessages((prev) => patchOfferListMessages(prev, offers, { canReHit }));
  }, []);

  const hasOfferMessages = useMemo(
    () => messages.some((message) => message.kind === 'offer_list'),
    [messages],
  );

  // Injects the first offer_list message directly into state — avoids a chat-history reload.
  const injectOfferListMessage = useCallback((offers: LenderOfferStatus[], canReHit: boolean) => {
    setMessages((prev) => [
      ...prev,
      {
        kind: 'offer_list' as const,
        id: `offer_injected_${Date.now()}`,
        offers,
        canReHit,
      },
    ]);
  }, []);

  // Poll loop lives in useAiChatOfferSync — this hook only wires session, credentials, and triggers.
  const { isOfferPolling, isCheckingOfferStatus } = useAiChatOfferSync({
    stage: session?.stage,
    userId: chatUserId,
    mobile: user?.phoneNumber,
    sessionUserId: session?.userId,
    responseMobile: offerSyncCredentials.mobile,
    responseToken: offerSyncCredentials.token,
    isOpen,
    isLoadingHistory,
    offerSyncTrigger,
    historyHasOfferMessages: hasOfferMessages,
    onOffersReady: injectOfferListMessage,
  });

  const showOfferPolling = (isOfferPolling || isCheckingOfferStatus) && !hasOfferMessages;

  const showSelectChips = useMemo(() => {
    if (!isFieldCaptureStage(sessionStage) || nextFieldConfig?.inputType !== 'select') {
      return false;
    }

    const activeField = nextFieldConfig.field;
    return dismissedSelectField !== activeField;
  }, [dismissedSelectField, nextFieldConfig, sessionStage]);

  const showGuestWelcome =
    showWelcomeScreen && !hasGuestStartedChat && !isLoadingHistory;

  return {
    messages,
    chatUserId,
    session,
    isLoadingHistory,
    isSubmitting,
    errorMessage,
    inputValue,
    inputError,
    nextFieldConfig,
    showSelectChips,
    fieldCaptureStatus,
    isFieldCaptureComplete,
    isChatInputDisabled,
    isEscalated,
    showGuestWelcome,
    isOfferPolling,
    isCheckingOfferStatus,
    showOfferPolling,
    onLiveOffersUpdated,
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
