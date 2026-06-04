import { AI_CHAT_COPY } from "@/lib/constants/ai-chat";

export const FinTypingBlock = () => {
  return (
    <div className="flex justify-center">
      <span className=" py-1 text-xs text-muted-foreground">
        {AI_CHAT_COPY.typingMessage}
      </span>
    </div>
  );
};