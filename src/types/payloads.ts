import type { Content } from "./google-genai";

export interface AdkAgentRunSsePayload {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: Content;
  streaming: boolean;
}
