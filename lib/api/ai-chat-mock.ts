import type {
  AiChatFieldCaptureStatus,
  AiChatNextFieldConfig,
  AiChatOption,
  AiChatSession,
  AiChatTurn,
  ChatHistoryParams,
  ChatHistoryResponse,
  ChatQueryPayload,
  ChatQueryResponse,
} from '@/types/ai-chat';

interface MockSessionState {
  session: AiChatSession;
  turns: AiChatTurn[];
  captured: Record<string, string>;
}

const ORGANIZATION_CODE = 'wecredit';
const CHANNEL_CODE = 'wecredit_bot';
const REQUIRED_FIELDS = [
  'mobile',
  'name',
  'dob',
  'gender',
  'pincode',
  'employmentType',
  'salary',
  'requiredLoanAmount',
  'pan',
] as const;
const OPTIONAL_FIELDS = ['email', 'addressType', 'salaryMode', 'hasCreditCard'] as const;

const mockSessions = new Map<string, MockSessionState>();

const selectOptions = (options: AiChatOption[]): AiChatOption[] => options;

const fieldConfigs: Record<string, AiChatNextFieldConfig> = {
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
    options: selectOptions([
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ]),
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
    options: selectOptions([
      { label: 'Salaried', value: 'salaried' },
      { label: 'Self-employed', value: 'self_employed' },
      { label: 'Business owner', value: 'business_owner' },
    ]),
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
    options: selectOptions([
      { label: '₹1L—₹2L', value: '100000-200000' },
      { label: '₹2L—₹5L', value: '200000-500000' },
      { label: '₹5L—₹10L', value: '500000-1000000' },
      { label: 'Above ₹10L', value: '1000000+' },
    ]),
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

function getSessionKey(params: ChatHistoryParams | ChatQueryPayload): string {
  return params.sessionId ?? `${params.userId}:${params.organizationCode}:${params.channel}`;
}

function getNextField(captured: Record<string, string>): string | null {
  return REQUIRED_FIELDS.find((field) => !captured[field]) ?? null;
}

function buildCaptureStatus(captured: Record<string, string>): AiChatFieldCaptureStatus {
  const nextField = getNextField(captured);
  return {
    requiredFields: [...REQUIRED_FIELDS],
    optionalFields: [...OPTIONAL_FIELDS],
    capturedFields: REQUIRED_FIELDS.filter((field) => Boolean(captured[field])),
    missingFields: [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].filter((field) => !captured[field]),
    nextField,
    nextQuestion: nextField ? getQuestionForField(nextField) : null,
    nextFieldConfig: nextField ? fieldConfigs[nextField] : null,
  };
}

function getQuestionForField(field: string): string {
  const questions: Record<string, string> = {
    mobile: 'Please share your mobile number to check your loan offer.',
    name: 'Please enter your full name as shown on your ID.',
    dob: 'Please share your date of birth.',
    gender: 'Please select your gender.',
    pincode: 'Please share your pincode.',
    employmentType: 'Please select your employment type.',
    salary: 'What is your monthly salary in hand?',
    requiredLoanAmount: 'What loan amount are you looking for?',
    pan: 'Please share your PAN card number.',
  };
  return questions[field] ?? 'Please share the next detail.';
}

function createInitialState(params: ChatHistoryParams): MockSessionState {
  const nextField = 'requiredLoanAmount';
  const session: AiChatSession = {
    userId: params.userId,
    organizationCode: params.organizationCode || ORGANIZATION_CODE,
    channel: params.channel || CHANNEL_CODE,
    stage: `field_capture:${nextField}`,
    intent: 'greeting',
    nextField,
    pendingQuestion:
      "Hi! I'm Finn 👋 I'll find your best personalised personal loan offer in 60 seconds. What amount are you looking for?",
    pendingField: nextField,
    isFieldCaptureActive: true,
    isCompleted: false,
    shouldAskNextQuestion: true,
    updatedAt: new Date().toISOString(),
  };

  return { session, turns: [], captured: {} };
}

function getOrCreateState(params: ChatHistoryParams | ChatQueryPayload): MockSessionState {
  const key = getSessionKey(params);
  const state = mockSessions.get(key);
  if (state) return state;

  const nextState = createInitialState({
    userId: params.userId,
    organizationCode: params.organizationCode,
    channel: params.channel,
    sessionId: params.sessionId,
  });
  mockSessions.set(key, nextState);
  return nextState;
}

function appendTurn(state: MockSessionState, turn: AiChatTurn): void {
  state.turns.push(turn);
  state.session.updatedAt = new Date().toISOString();
}

function makeTurnId(state: MockSessionState): string {
  return `turn_${String(state.turns.length + 1).padStart(3, '0')}`;
}

function validateFieldValue(field: string, value: string): { isValid: boolean; errorMessage?: string } {
  const regex = fieldConfigs[field]?.validation?.regex;
  if (!regex) return { isValid: true };
  const re = new RegExp(regex);
  const isValid = re.test(value);
  return {
    isValid,
    errorMessage: isValid ? undefined : fieldConfigs[field]?.validation?.errorMessage ?? 'Invalid input.',
  };
}

export async function fetchMockChatHistory(params: ChatHistoryParams): Promise<ChatHistoryResponse> {
  const state = getOrCreateState(params);
  return {
    session: state.session,
    turns: state.turns,
  };
}

export async function submitMockChatQuery(payload: ChatQueryPayload): Promise<ChatQueryResponse> {
  const state = getOrCreateState(payload);
  const now = new Date().toISOString();
  const nextField = getNextField(state.captured) ?? payload.field ?? 'requiredLoanAmount';
  const activeField = payload.field ?? nextField;
  const userValue = payload.query.trim();
  const validation = activeField ? validateFieldValue(activeField, userValue) : { isValid: true };

  if (activeField && !validation.isValid) {
    return {
      intent: 'field_validation',
      answer: validation.errorMessage ?? 'Please provide a valid value.',
      organizationCode: state.session.organizationCode,
      channel: state.session.channel,
      captureFields: true,
      shouldAskNextQuestion: true,
      escalateToHuman: false,
      fieldCaptureStatus: buildCaptureStatus(state.captured),
      validation: {
        isValid: false,
        errorMessage: validation.errorMessage,
      },
    };
  }

  if (activeField) {
    state.captured[activeField] = userValue;
    appendTurn(state, {
      turnId: makeTurnId(state),
      turnType: 'field',
      field: activeField,
      askedQuestion: getQuestionForField(activeField),
      userAnswer: userValue,
      normalizedValue: userValue,
      assistantResponse: '',
      intent: `submit_${activeField}`,
      stageBefore: state.session.stage,
      stageAfter: state.session.stage,
      fieldValueStored: true,
      validation: { isValid: true, errorMessage: null },
      createdAt: now,
    });
  } else {
    appendTurn(state, {
      turnId: makeTurnId(state),
      turnType: 'chat',
      userQuery: userValue,
      assistantResponse: 'Sure, I can help you with that.',
      intent: 'loan_request',
      stageBefore: state.session.stage,
      stageAfter: state.session.stage,
      fieldValueStored: false,
      createdAt: now,
    });
  }

  const captureStatus = buildCaptureStatus(state.captured);
  const nextCaptureField = captureStatus.nextField ?? null;
  state.session.stage = nextCaptureField ? `field_capture:${nextCaptureField}` : 'completed';
  state.session.nextField = nextCaptureField;
  state.session.pendingField = nextCaptureField;
  state.session.pendingQuestion = captureStatus.nextQuestion ?? 'Thanks! We are matching your best offer.';
  state.session.isCompleted = !nextCaptureField;
  state.session.shouldAskNextQuestion = Boolean(nextCaptureField);
  state.session.isFieldCaptureActive = Boolean(nextCaptureField);

  return {
    intent: 'loan_request',
    answer: captureStatus.nextQuestion ?? 'Thanks! Your profile is complete. We are matching offers now.',
    organizationCode: state.session.organizationCode,
    lenderCode: null,
    channel: state.session.channel,
    captureFields: Boolean(nextCaptureField),
    shouldAskNextQuestion: Boolean(nextCaptureField),
    escalateToHuman: false,
    fieldCaptureStatus: captureStatus,
  };
}
