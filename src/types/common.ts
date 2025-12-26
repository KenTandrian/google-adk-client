import type {
  Blob,
  CodeExecutionResult,
  ExecutableCode,
  FileData,
  FunctionCall,
  FunctionResponseScheduling,
  VideoMetadata
} from "./google-genai";

export interface AdkAgentContent {
  parts: AdkAgentPart[];
  role: string;
}

export interface AdkAgentPart {
  videoMetadata?: VideoMetadata;
  thought?: boolean;
  inlineData?: Blob;
  fileData?: FileData;
  thoughtSignature?: string;
  codeExecutionResult?: CodeExecutionResult;
  executableCode?: ExecutableCode;
  functionCall?: FunctionCall;
  functionResponse?: AdkAgentFunctionResponse;
  text?: string;
}

export interface AdkAgentFunctionResponse {
  willContinue: boolean;
  scheduling?: FunctionResponseScheduling;
  id: string;
  name: string;
  response: Record<string, unknown>;
}
