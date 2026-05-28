import type {
  AiChatFieldCaptureStatus,
  AiChatNextFieldConfig,
  AiChatSession,
  AiChatTurn,
  ChatHistoryParams,
  ChatHistoryResponse,
  ChatQueryPayload,
  ChatQueryResponse,
} from '@/types/ai-chat';
import { AI_CHAT_FIELD_CONFIG_FALLBACKS } from '@/lib/ai-chat/resolve-next-field-config';

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

const fieldConfigs: Record<string, AiChatNextFieldConfig> = AI_CHAT_FIELD_CONFIG_FALLBACKS;

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
  const session: AiChatSession = {
    userId: params.userId,
    organizationCode: params.organizationCode || ORGANIZATION_CODE,
    channel: params.channel || CHANNEL_CODE,
    stage: 'chat',
    intent: 'greeting',
    nextField: null,
    pendingQuestion:
      "Hi, I’m Finn 👋 I’ll quickly check the best loan offer available for you.",
    pendingField: null,
    isFieldCaptureActive: false,
    isCompleted: false,
    shouldAskNextQuestion: false,
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
