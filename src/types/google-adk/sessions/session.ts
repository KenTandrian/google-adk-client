/**
 * Vendored types from @google/adk v0.2.1
 *
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/adk changes significantly.
 *
 * @see https://github.com/google/adk-js/blob/main/core/src/sessions/session.ts
 */

import type { Event } from "../events/event";

/**
 * Represents a session in a conversation between agents and users.
 */
export interface Session {
  /**
   * The unique identifier of the session.
   */
  id: string;

  /**
   * The name of the app.
   */
  appName: string;

  /**
   * The id of the user.
   */
  userId: string;

  /**
   * The state of the session.
   */
  state: Record<string, unknown>;

  /**
   * The events of the session, e.g. user input, model response, function
   * call/response, etc.
   */
  events: Event[];

  /**
   * The last update time of the session.
   */
  lastUpdateTime: number;
}
