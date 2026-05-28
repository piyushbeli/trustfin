import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface OpenAiChatParams {
  prefillQuestion?: string;
  sessionId?: string;
}

interface AiChatStoreState {
  isOpen: boolean;
  sessionId: string | null;
  prefillQuestion: string | null;
}

interface AiChatStoreActions {
  openModal: (params?: OpenAiChatParams) => void;
  closeModal: () => void;
  reset: () => void;
}

const AI_CHAT_SESSION_KEY = 'ai-chat-session-id';

function getInitialSessionId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(AI_CHAT_SESSION_KEY);
}

function persistSessionId(sessionId: string | null): void {
  if (typeof window === 'undefined') return;
  if (!sessionId) {
    window.localStorage.removeItem(AI_CHAT_SESSION_KEY);
    return;
  }
  window.localStorage.setItem(AI_CHAT_SESSION_KEY, sessionId);
}

export const useAiChatStore = create<AiChatStoreState & AiChatStoreActions>()(
  devtools(
    (set, get) => ({
      isOpen: false,
      sessionId: getInitialSessionId(),
      prefillQuestion: null,

      openModal: (params) => {
        const nextSessionId = params?.sessionId ?? get().sessionId;
        persistSessionId(nextSessionId ?? null);
        set({
          isOpen: true,
          prefillQuestion: params?.prefillQuestion ?? null,
          sessionId: nextSessionId ?? null,
        });
      },

      closeModal: () => {
        set({ isOpen: false, prefillQuestion: null });
      },

      reset: () => {
        persistSessionId(null);
        set({ isOpen: false, prefillQuestion: null, sessionId: null });
      },
    }),
    { name: 'ai-chat-store' },
  ),
);
