const LOG_PREFIX = '[ai-chat]';

const isAiChatLoggingEnabled = (): boolean => process.env.NODE_ENV === 'development';

/** Dev-only structured logs for AI chat API + guest welcome debugging. */
export function logAiChat(scope: string, message: string, data?: Record<string, unknown>): void {
  if (!isAiChatLoggingEnabled()) {
    return;
  }

  if (data) {
    console.info(`${LOG_PREFIX} [${scope}] ${message}`, data);
    return;
  }

  console.info(`${LOG_PREFIX} [${scope}] ${message}`);
}
