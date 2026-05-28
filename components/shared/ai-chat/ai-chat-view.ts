export type AiChatViewMode = 'initialLoading' | 'chat';

interface GetAiChatViewModeParams {
  isInitialLoading: boolean;
}

export const getAiChatViewMode = ({
  isInitialLoading,
}: GetAiChatViewModeParams): AiChatViewMode => {
  if (isInitialLoading) {
    return 'initialLoading';
  }

  return 'chat';
};
