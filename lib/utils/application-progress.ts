/**
 * Pure helpers for application progress (0–100).
 * Used by loan forms and any future multi-step / field-based flows.
 */

export type FieldCompleteChecker<T> = (
  key: keyof T,
  value: T[keyof T],
  values: T
) => boolean;

/** Clamp a percentage to 0–100. */
export const clampProgress = (value: number): number =>
  Math.min(100, Math.max(0, Math.round(value)));

/**
 * Step-based progress: step 1 of 3 → 33%, step 3 of 3 → 100%.
 */
export const getStepProgress = (currentStep: number, totalSteps: number): number => {
  if (totalSteps <= 0) return 0;
  const step = Math.min(Math.max(1, currentStep), totalSteps);
  return clampProgress((step / totalSteps) * 100);
};

/**
 * Field-completion progress: share of tracked fields that pass isComplete.
 */
export const getFieldCompletionProgress = <T extends object>(
  values: T,
  fields: (keyof T)[],
  isComplete: FieldCompleteChecker<T>
): number => {
  if (fields.length === 0) return 0;
  const completed = fields.filter((key) =>
    isComplete(key, values[key], values)
  ).length;
  return clampProgress((completed / fields.length) * 100);
};
