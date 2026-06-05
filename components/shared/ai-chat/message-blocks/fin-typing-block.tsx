import { AI_CHAT_COPY } from "@/lib/constants/ai-chat";

export const FinTypingBlock = ({
  message,
}: {
  message?: string;
}) => {
  return (
    <div className="flex justify-center">
      <span className=" py-1 text-xs text-muted-foreground">
        {message || AI_CHAT_COPY.typingMessage}
      </span>
    </div>
  );
};