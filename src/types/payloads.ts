import type { Content } from "./google-genai";

export interface AgentRunSsePayload {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: Content;
  streaming: boolean;
}
