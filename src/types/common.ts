import type {
  Blob,
  CodeExecutionResult,
  ExecutableCode,
  FileData,
  FunctionCall,
  FunctionResponse,
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
  functionResponse?: FunctionResponse;
  text?: string;
}
