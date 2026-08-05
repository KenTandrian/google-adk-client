import type { Content } from "./google-genai";

/**
 * Payload for running an agent execution.
 */
export interface AgentRunSsePayload {
  appName: string;
  userId: string;
  sessionId: string;
  newMessage: Content;
  streaming: boolean;
}
