import type { AiChatFieldCaptureStatus, AiChatNextFieldConfig, AiChatSession } from '@/types/ai-chat';

export const AI_CHAT_FIELD_CONFIG_FALLBACKS: Record<string, AiChatNextFieldConfig> = {
  mobile: {
    field: 'mobile',
    label: 'Mobile Number',
    inputType: 'number',
    uiType: 'text_input',
    required: true,
    placeholder: 'Enter 10-digit mobile number',
    options: [],
    validation: {
      errorMessage: 'Please enter a valid 10-digit mobile number.',
      regex: '^[0-9]{10}$',
    },
  },
  name: {
    field: 'name',
    label: 'Full name',
    inputType: 'text',
    uiType: 'text_input',
    required: true,
    placeholder: 'Enter your full name',
    options: [],
    validation: {
      errorMessage: 'Please enter at least 2 characters.',
      regex: '^.{2,}$',
    },
  },
  dob: {
    field: 'dob',
    label: 'Date of birth',
    inputType: 'date',
    uiType: 'text_input',
    required: true,
    placeholder: 'DD-MM-YYYY / DD/MM/YYYY / YYYY-MM-DD',
    options: [],
    validation: {
      errorMessage: 'Please enter a valid date.',
      regex: '^([0-9]{2}[-/][0-9]{2}[-/][0-9]{4}|[0-9]{4}-[0-9]{2}-[0-9]{2})$',
    },
  },
  gender: {
    field: 'gender',
    label: 'Gender',
    inputType: 'select',
    uiType: 'chips',
    required: true,
    placeholder: 'Select your gender',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ],
    validation: {
      allowedValues: ['male', 'female', 'other'],
      errorMessage: 'Please select a valid gender.',
    },
  },
  pincode: {
    field: 'pincode',
    label: 'Pincode',
    inputType: 'number',
    uiType: 'text_input',
    required: true,
    placeholder: 'Enter your pincode',
    options: [],
    validation: {
      errorMessage: 'Please enter a valid 6-digit pincode.',
      regex: '^[0-9]{6}$',
    },
  },
  employmentType: {
    field: 'employmentType',
    label: 'Employment type',
    inputType: 'select',
    uiType: 'chips',
    required: true,
    placeholder: 'Select employment type',
    options: [
      { label: 'Salaried', value: 'salaried' },
      { label: 'Self-employed', value: 'self_employed' },
      { label: 'Business owner', value: 'business_owner' },
    ],
    validation: {
      allowedValues: ['salaried', 'self_employed', 'business_owner'],
      errorMessage: 'Please select a valid employment type.',
    },
  },
  salary: {
    field: 'salary',
    label: 'Monthly salary',
    inputType: 'number',
    uiType: 'text_input',
    required: true,
    placeholder: 'Enter monthly salary',
    options: [],
    validation: {
      errorMessage: 'Please enter a valid salary amount.',
      regex: '^[0-9]{4,}$',
    },
  },
  requiredLoanAmount: {
    field: 'requiredLoanAmount',
    label: 'Required loan amount',
    inputType: 'select',
    uiType: 'chips',
    required: true,
    placeholder: 'Select loan amount',
    options: [
      { label: '₹1L—₹2L', value: '100000-200000' },
      { label: '₹2L—₹5L', value: '200000-500000' },
      { label: '₹5L—₹10L', value: '500000-1000000' },
      { label: 'Above ₹10L', value: '1000000+' },
    ],
  },
  pan: {
    field: 'pan',
    label: 'PAN',
    inputType: 'text',
    uiType: 'text_input',
    required: true,
    placeholder: 'ABCDE1234F',
    options: [],
    validation: {
      errorMessage: 'Please enter a valid PAN.',
      regex: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$',
    },
  },
};

interface ResolveNextFieldConfigParams {
  session?: AiChatSession | null;
  fieldCaptureStatus?: AiChatFieldCaptureStatus | null;
}

export const resolveNextFieldConfig = ({
  session,
  fieldCaptureStatus,
}: ResolveNextFieldConfigParams): AiChatNextFieldConfig | null => {
  if (fieldCaptureStatus?.nextFieldConfig) {
    return fieldCaptureStatus.nextFieldConfig;
  }

  const nextField =
    fieldCaptureStatus?.nextField ??
    session?.pendingField ??
    session?.nextField ??
    null;

  if (!nextField) {
    return null;
  }

  return AI_CHAT_FIELD_CONFIG_FALLBACKS[nextField] ?? null;
};
