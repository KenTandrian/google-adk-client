import type { Content } from "./google-genai";

/**
 * Parameters for `AdkClient.run()` / `AdkClient.runSse()`.
 */
export interface RunAgentParams {
  /** The session ID of the session. */
  sessionId: string;
  /** A new message to append to the session. */
  newMessage: Content;
}

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
