export type AiChatViewMode = 'initialLoading' | 'guestWelcome' | 'chat';

interface GetAiChatViewModeParams {
  isInitialLoading: boolean;
  showGuestWelcome: boolean;
}

export const getAiChatViewMode = ({
  isInitialLoading,
  showGuestWelcome,
}: GetAiChatViewModeParams): AiChatViewMode => {
  if (isInitialLoading) {
    return 'initialLoading';
  }

  if (showGuestWelcome) {
    return 'guestWelcome';
  }

  return 'chat';
};
