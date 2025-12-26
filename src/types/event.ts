import { EventActions, LlmResponse } from "./google-adk";

/**
 * Represents an event in a conversation between agents and users.
 */
export interface AdkAgentEvent extends LlmResponse {
  id: string;
  invocationId: string;
  author: string;
  actions: EventActions;
  longRunningToolIds?: string[];
  branch?: string;
  timestamp: number;
}
