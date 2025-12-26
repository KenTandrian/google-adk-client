import { AdkAuthConfig } from "./auth";
import { LlmResponse, ToolConfirmation } from "./google-adk";

/**
 * Represents an event in a conversation between agents and users.
 */
export interface AdkAgentEvent extends LlmResponse {
  id: string;
  invocationId: string;
  author: string;
  actions: AdkEventActions;
  longRunningToolIds?: string[];
  branch?: string;
  timestamp: number;
}

/**
 * Represents the actions attached to an event.
 */
export interface AdkEventActions {
  skipSummarization?: boolean;
  stateDelta: Record<string, unknown>;
  artifactDelta: Record<string, number>;
  transferToAgent?: string;
  escalate?: boolean;
  requestedAuthConfigs: Record<string, AdkAuthConfig>;
  requestedToolConfirmations: Record<string, ToolConfirmation>;
}
