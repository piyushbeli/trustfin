import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface OpenAiChatParams {
  prefillQuestion?: string;
}

interface AiChatStoreState {
  isOpen: boolean;
  prefillQuestion: string | null;
}

interface AiChatStoreActions {
  openModal: (params?: OpenAiChatParams) => void;
  closeModal: () => void;
}

export const useAiChatStore = create<AiChatStoreState & AiChatStoreActions>()(
  devtools(
    (set) => ({
      isOpen: false,
      prefillQuestion: null,

      openModal: (params) => {
        set({
          isOpen: true,
          prefillQuestion: params?.prefillQuestion ?? null,
        });
      },

      closeModal: () => {
        set({ isOpen: false, prefillQuestion: null });
      },
    }),
    { name: 'ai-chat-store' },
  ),
);
