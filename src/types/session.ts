import { Event } from "./google-adk";

/**
 * Represents a session in a conversation between agents and users.
 */
export interface AdkAgentSession {
  id: string;
  appName: string;
  userId: string;
  state: Record<string, unknown>;
  events: Event[];
  lastUpdateTime: number;
}

/**
 * Represents options for creating a session.
 */
export interface AdkCreateSessionOptions {
  state?: Record<string, unknown>;
  events?: Event[];
}
