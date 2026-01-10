import type { Event } from "./google-adk";

/**
 * Represents options for creating a session.
 */
export interface CreateSessionOptions {
  state?: Record<string, unknown>;
  events?: Event[];
}
