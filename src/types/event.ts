import { AdkAuthConfig } from "./auth";
import { ToolConfirmation } from "./google-adk";
import { Content } from "./google-genai";
import { AdkAgentGroundingMetadata } from "./grounding";
import { AdkAgentUsageMetadata } from "./usage";

/**
 * Represents an event in a conversation between agents and users.
 */
export interface AdkAgentEvent {
  content: Content;
  groundingMetadata?: AdkAgentGroundingMetadata;
  partial?: boolean;
  turnComplete?: boolean;
  errorCode?: string;
  errorMessage?: string;
  interrupted?: boolean;
  customMetadata?: Record<string, unknown>;
  usageMetadata?: AdkAgentUsageMetadata;
  invocationId: string;
  author: string;
  actions: AdkEventActions;
  longRunningToolIds?: string[];
  branch?: string;
  id: string;
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
