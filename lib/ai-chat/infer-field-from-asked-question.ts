import { AI_CHAT_FIELD_QUESTIONS } from '@/lib/ai-chat/field-questions';

/** Reverse-maps an askedQuestion string to a field key for input config after history reload. */
export const inferFieldFromAskedQuestion = (askedQuestion: string | null | undefined): string | null => {
  const normalized = askedQuestion?.trim();
  if (!normalized) {
    return null;
  }

  const entries = Object.entries(AI_CHAT_FIELD_QUESTIONS);
  const exactMatch = entries.find(([, question]) => question === normalized);
  if (exactMatch) {
    return exactMatch[0];
  }

  // Fuzzy match for minor API wording differences
  const lower = normalized.toLowerCase();
  const fuzzyMatch = entries.find(([, question]) => {
    const q = question.toLowerCase();
    return lower.includes(q.slice(0, 20)) || q.includes(lower.slice(0, 20));
  });

  return fuzzyMatch?.[0] ?? null;
};
