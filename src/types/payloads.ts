import type { Content } from "./google-genai";

/**
 * Request body for the `/run` and `/run_sse` endpoints.
 */
export interface RunAgentRequest {
  /** The name of the agent application. */
  appName: string;
  /** The ID of the user. */
  userId: string;
  /** The ID of the session. */
  sessionId: string;
  /** A new message to append to the session. */
  newMessage: Content;
  /**
   * Enables token-level streaming of model responses. Only used by
   * `/run_sse`; defaults to `false` on the server.
   */
  streaming?: boolean;
  /** A state delta to apply to the session before the run. */
  stateDelta?: Record<string, unknown>;
  /** Custom metadata attached to the run. */
  customMetadata?: Record<string, unknown>;
}

/**
 * Parameters for `AdkClient.run()` / `AdkClient.runSse()`.
 * `appName` and `userId` are bound to the client instance.
 */
export type RunAgentParams = Pick<RunAgentRequest, "sessionId" | "newMessage">;
