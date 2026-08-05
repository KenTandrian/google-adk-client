import type { Event } from "./google-adk";

/**
 * Represents options for creating a new session.
 */
export interface CreateSessionOptions {
  state?: Record<string, unknown>;
  events?: Event[];
}

/**
 * Request payload to update session state.
 */
export interface UpdateSessionRequest {
  stateDelta: Record<string, unknown>;
}
