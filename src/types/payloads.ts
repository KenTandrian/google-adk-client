import {
  Blob,
  CodeExecutionResult,
  ExecutableCode,
  FileData,
  FunctionCall,
  FunctionResponse,
  VideoMetadata
} from "./google-genai";

export interface AdkAgentRunSsePayload {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: {
    parts: Array<{
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
    }>;
    role: string;
  };
  streaming: boolean;
}
