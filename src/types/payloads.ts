import {
    AdkAgentCodeExecutionResult,
    AdkAgentExecutableCode,
    AdkAgentFileData,
    AdkAgentFunctionCall,
    AdkAgentFunctionResponse,
    AdkAgentInlineData,
    AdkAgentVideoMetadata,
} from "./common";

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
