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
import { getQuestionForField } from '@/lib/ai-chat/field-questions';
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

const GREETING_MESSAGE =
  "Hi, I'm Finn 👋 I'll quickly check the best loan offer available for you.";

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

function isFieldHelpQuery(query: string): boolean {
  const lower = query.toLowerCase();
  return lower.includes('why') || lower.includes('kyu') || lower.includes('kya');
}

function createInitialState(params: ChatHistoryParams): MockSessionState {
  const now = new Date().toISOString();
  const session: AiChatSession = {
    userId: params.userId,
    organizationCode: params.organizationCode || ORGANIZATION_CODE,
    channel: params.channel || CHANNEL_CODE,
    stage: 'chat',
    intent: 'greeting',
    isFieldCaptureActive: false,
    isCompleted: false,
    shouldAskNextQuestion: false,
    updatedAt: now,
  };

  const turns: AiChatTurn[] = [
    {
      turnId: 'turn_001',
      turnType: 'chat',
      assistantResponse: GREETING_MESSAGE,
      createdAt: now,
    },
  ];

  return { session, turns, captured: {} };
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
  const nextField = getNextField(state.captured) ?? payload.field ?? null;
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

  const captureBefore = buildCaptureStatus(state.captured);
  const currentQuestion = activeField
    ? getQuestionForField(activeField)
    : captureBefore.nextQuestion ?? getQuestionForField('name');

  if (activeField) {
    if (isFieldHelpQuery(userValue)) {
      appendTurn(state, {
        turnId: makeTurnId(state),
        turnType: 'field_help',
        userQuery: userValue,
        assistantResponse:
          'This information is required to verify your eligibility. Your data is kept secure.',
        askedQuestion: currentQuestion,
        createdAt: now,
      });
    } else {
      state.captured[activeField] = userValue;
      const captureAfter = buildCaptureStatus(state.captured);
      const nextQuestion = captureAfter.nextQuestion;
      const isComplete = !captureAfter.nextField;

      appendTurn(state, {
        turnId: makeTurnId(state),
        turnType: 'field',
        userQuery: userValue,
        assistantResponse: isComplete
          ? 'Thanks, we have received your details. We are checking your loan offer now.'
          : '',
        askedQuestion: nextQuestion ?? undefined,
        createdAt: now,
      });
    }
  } else {
    const firstCaptureField = captureBefore.nextField ?? 'name';
    const firstQuestion = getQuestionForField(firstCaptureField);

    appendTurn(state, {
      turnId: makeTurnId(state),
      turnType: 'chat',
      userQuery: userValue,
      assistantResponse: 'I can help check your loan offer',
      askedQuestion: firstQuestion,
      createdAt: now,
    });

    state.session.isFieldCaptureActive = true;
    state.session.shouldAskNextQuestion = true;
  }

  const captureStatus = buildCaptureStatus(state.captured);
  const nextCaptureField = captureStatus.nextField ?? null;
  state.session.stage = nextCaptureField ? `field_capture:${nextCaptureField}` : 'completed';
  state.session.nextField = nextCaptureField;
  state.session.pendingField = nextCaptureField;
  state.session.pendingQuestion = captureStatus.nextQuestion ?? undefined;
  state.session.isCompleted = !nextCaptureField;
  state.session.shouldAskNextQuestion = Boolean(nextCaptureField);
  state.session.isFieldCaptureActive = Boolean(nextCaptureField);

  if (state.session.isCompleted) {
    delete state.session.nextField;
    delete state.session.pendingField;
    delete state.session.pendingQuestion;
  }

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
