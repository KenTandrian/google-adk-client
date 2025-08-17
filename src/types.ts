export interface AdkAgentSession {
  id: string;
  appName: string;
  userId: string;
  state: Record<string, unknown>;
  events: AdkAgentEvent[];
  lastUpdateTime: number;
}

export interface AdkAgentEvent {
  content: AdkAgentContent;
  groundingMetadata?: AdkAgentGroundingMetadata;
  partial?: boolean;
  turnComplete?: boolean;
  errorCode?: string;
  errorMessage?: string;
  interrupted?: boolean;
  customMetadata?: Record<string, unknown>;
  usageMetadata?: AdkAgentUsageMetadata;
  invocationId: string;
  author: string;
  actions?: AdkAgentActions;
  longRunningToolIds?: string[];
  branch?: string;
  id: string;
  timestamp: number;
}

export interface AdkAgentContent {
  parts: AdkAgentPart[];
  role: string;
}

export interface AdkAgentPart {
  videoMetadata?: AdkAgentVideoMetadata;
  thought?: boolean;
  inlineData?: AdkAgentInlineData;
  fileData?: AdkAgentFileData;
  thoughtSignature?: string;
  codeExecutionResult?: AdkAgentCodeExecutionResult;
  executableCode?: AdkAgentExecutableCode;
  functionCall?: AdkAgentFunctionCall;
  functionResponse?: AdkAgentFunctionResponse;
  text?: string;
}

export interface AdkAgentVideoMetadata {
  fps: number;
  endOffset: string;
  startOffset: string;
}

export interface AdkAgentInlineData {
  displayName: string;
  data: string;
  mimeType: string;
}

export interface AdkAgentFileData {
  displayName: string;
  fileUri: string;
  mimeType: string;
}

export interface AdkAgentCodeExecutionResult {
  outcome: string;
  output: string;
}

export interface AdkAgentExecutableCode {
  code: string;
  language: string;
}

export interface AdkAgentFunctionCall {
  id: string;
  args: Record<string, unknown>;
  name: string;
}

export interface AdkAgentFunctionResponse {
  willContinue: boolean;
  scheduling: string;
  id: string;
  name: string;
  response: Record<string, unknown>;
}

export interface AdkAgentGroundingMetadata {
  groundingChunks: AdkAgentGroundingChunk[];
  groundingSupports: AdkAgentGroundingSupport[];
  retrievalMetadata: AdkAgentRetrievalMetadata;
  retrievalQueries: string[];
  searchEntryPoint: AdkAgentSearchEntryPoint;
  webSearchQueries: string[];
}

export interface AdkAgentGroundingChunk {
  retrievedContext?: AdkAgentRetrievedContext;
  web?: AdkAgentWeb;
}

export interface AdkAgentRetrievedContext {
  ragChunk: AdkAgentRagChunk;
  text: string;
  title: string;
  uri: string;
}

export interface AdkAgentRagChunk {
  pageSpan: AdkAgentPageSpan;
  text: string;
}

export interface AdkAgentPageSpan {
  firstPage: number;
  lastPage: number;
}

export interface AdkAgentWeb {
  domain: string;
  title: string;
  uri: string;
}

export interface AdkAgentGroundingSupport {
  confidenceScores: number[];
  groundingChunkIndices: number[];
  segment: AdkAgentSegment;
}

export interface AdkAgentSegment {
  endIndex: number;
  partIndex: number;
  startIndex: number;
  text: string;
}

export interface AdkAgentRetrievalMetadata {
  googleSearchDynamicRetrievalScore: number;
}

export interface AdkAgentSearchEntryPoint {
  renderedContent: string;
  sdkBlob: string;
}

export interface AdkAgentUsageMetadata {
  cacheTokensDetails?: AdkAgentTokenDetails[];
  cachedContentTokenCount?: number;
  candidatesTokenCount?: number;
  candidatesTokensDetails?: AdkAgentTokenDetails[];
  promptTokenCount?: number;
  promptTokensDetails?: AdkAgentTokenDetails[];
  thoughtsTokenCount?: number;
  toolUsePromptTokenCount?: number;
  toolUsePromptTokensDetails?: AdkAgentTokenDetails[];
  totalTokenCount?: number;
  trafficType: string;
}

export interface AdkAgentTokenDetails {
  modality: string;
  tokenCount: number;
}

export interface AdkAgentActions {
  skipSummarization?: boolean;
  stateDelta?: Record<string, unknown>;
  artifactDelta?: Record<string, number>;
  transferToAgent?: string;
  escalate?: boolean;
  requestedAuthConfigs?: Record<string, AdkAgentAuthConfig>;
}

export interface AdkAgentAuthConfig {
  authScheme: AdkAgentAuthScheme;
  rawAuthCredential?: AdkAgentAuthCredential;
  exchangedAuthCredential?: AdkAgentAuthCredential;
  credentialKey?: string;
}

export interface AdkAgentAuthScheme {
  type: string;
  description: string;
  in: string;
  name: string;
}

export interface AdkAgentAuthCredential {
  authType: string;
  resourceRef?: string;
  apiKey?: string;
  http?: AdkAgentHttpAuth;
  serviceAccount?: AdkAgentServiceAccountAuth;
  oauth2?: AdkAgentOAuth2Auth;
}

export interface AdkAgentHttpAuth {
  scheme: string;
  credentials: {
    username?: string;
    password?: string;
    token?: string;
  };
}

export interface AdkAgentServiceAccountAuth {
  serviceAccountCredential: AdkAgentServiceAccountCredential;
  scopes: string[];
  useDefaultCredential?: boolean;
}

export interface AdkAgentServiceAccountCredential {
  type: string;
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientX509CertUrl: string;
  universeDomain: string;
}

export interface AdkAgentOAuth2Auth {
  clientId: string;
  clientSecret: string;
  authUri: string;
  state: string;
  redirectUri: string;
  authResponseUri: string;
  authCode: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  expiresIn: number;
}

export interface AdkAgentRunSsePayload {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: {
    parts: Array<{
      videoMetadata?: AdkAgentVideoMetadata;
      thought?: boolean;
      inlineData?: AdkAgentInlineData;
      fileData?: AdkAgentFileData;
      thoughtSignature?: string;
      codeExecutionResult?: AdkAgentCodeExecutionResult;
      executableCode?: AdkAgentExecutableCode;
      functionCall?: AdkAgentFunctionCall;
      functionResponse?: AdkAgentFunctionResponse;
      text?: string;
    }>;
    role: string;
  };
  streaming: boolean;
}

export type AdkRunEvalResponse = AdkRunEvalResult[];

export interface AdkRunEvalResult {
  evalSetFile: string;
  evalSetId: string;
  evalId: string;
  finalEvalStatus: number;
  overallEvalMetricResults: AdkOverallEvalMetricResult[];
  evalMetricResultPerInvocation: AdkEvalMetricResultPerInvocation[];
  userId: string;
  sessionId: string;
}

export interface AdkOverallEvalMetricResult {
  metricName: string;
  threshold: number;
  score: number;
  evalStatus: number;
}

export interface AdkEvalMetricResultPerInvocation {
  actualInvocation: AdkInvocation;
  expectedInvocation: AdkInvocation;
  evalMetricResults: any[];
}

export interface AdkInvocation {
  invocationId: string;
  userContent: AdkAgentContent;
  finalResponse: AdkAgentContent;
  intermediateData: AdkIntermediateData;
  creationTimestamp: number;
}

export interface AdkIntermediateData {
  toolUses: any[];
  intermediateResponses: any[];
}

export interface AdkGetEvalResponse {
  evalId: string;
  conversation: AdkInvocation[];
  sessionInput: AdkSessionInput;
  creationTimestamp: number;
}

export interface AdkSessionInput {
  appName: string;
  userId: string;
  state: Record<string, any>;
}

export interface AdkGetEvalResultResponse {
  evalSetResultId: string;
  evalSetResultName: string;
  evalSetId: string;
  evalCaseResults: AdkRunEvalResult[];
  creationTimestamp: number;
}
