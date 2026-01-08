import type { Event } from "./google-adk";

/**
 * Represents options for creating a session.
 */
export interface AdkCreateSessionOptions {
  state?: Record<string, unknown>;
  events?: Event[];
}
