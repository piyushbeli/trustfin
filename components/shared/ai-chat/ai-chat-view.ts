export type AiChatViewMode = 'login' | 'initialLoading' | 'chat';

interface GetAiChatViewModeParams {
  requiresLogin: boolean;
  isInitialLoading: boolean;
}

export const getAiChatViewMode = ({
  requiresLogin,
  isInitialLoading,
}: GetAiChatViewModeParams): AiChatViewMode => {
  if (requiresLogin) {
    return 'login';
  }

  if (isInitialLoading) {
    return 'initialLoading';
  }

  return 'chat';
};
