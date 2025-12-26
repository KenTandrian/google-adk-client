import type {
  FunctionResponseScheduling,
  Language,
  Outcome,
  VideoMetadata
} from "./google-genai";

export interface AdkAgentContent {
  parts: AdkAgentPart[];
  role: string;
}

export interface AdkAgentPart {
  videoMetadata?: VideoMetadata;
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
  outcome?: Outcome;
  output: string;
}

export interface AdkAgentExecutableCode {
  code: string;
  language?: Language;
}

export interface AdkAgentFunctionCall {
  id: string;
  args: Record<string, unknown>;
  name: string;
}

export interface AdkAgentFunctionResponse {
  willContinue: boolean;
  scheduling?: FunctionResponseScheduling;
  id: string;
  name: string;
  response: Record<string, unknown>;
}
