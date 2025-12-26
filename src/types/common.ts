import type {
  CodeExecutionResult,
  FileData,
  FunctionCall,
  FunctionResponseScheduling,
  Language,
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
  fileData?: FileData;
  thoughtSignature?: string;
  codeExecutionResult?: CodeExecutionResult;
  executableCode?: AdkAgentExecutableCode;
  functionCall?: FunctionCall;
  functionResponse?: AdkAgentFunctionResponse;
  text?: string;
}

export interface AdkAgentInlineData {
  displayName: string;
  data: string;
  mimeType: string;
}

export interface AdkAgentExecutableCode {
  code: string;
  language?: Language;
}

export interface AdkAgentFunctionResponse {
  willContinue: boolean;
  scheduling?: FunctionResponseScheduling;
  id: string;
  name: string;
  response: Record<string, unknown>;
}
