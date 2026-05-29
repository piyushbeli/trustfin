/** Canonical field prompts — used by mock, inference, and fallbacks. */
export const AI_CHAT_FIELD_QUESTIONS: Record<string, string> = {
  mobile: 'Please share your mobile number to check your loan offer.',
  name: 'Please enter your full name as shown on your ID.',
  dob: 'Please share your date of birth.',
  gender: 'Please select your gender.',
  pincode: 'Please share your residential pincode.',
  employmentType: 'Are you salaried or self-employed?',
  salary: 'What is your monthly salary (in ₹)?',
  requiredLoanAmount: 'Please select your required loan amount.',
  pan: 'Please enter your PAN (Permanent Account Number).',
};

export const getQuestionForField = (field: string): string =>
  AI_CHAT_FIELD_QUESTIONS[field] ?? 'Please share the next detail.';
