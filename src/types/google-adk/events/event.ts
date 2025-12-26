/**
 * Vendored types from @google/adk v0.2.1
 * 
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/adk changes significantly.
 * 
 * @see https://github.com/google/adk-js/blob/main/core/src/events/event_actions.ts
 */

import { LlmResponse } from '../models/llm_response';

import { EventActions } from './event_actions';

/**
 * Represents an event in a conversation between agents and users.

  It is used to store the content of the conversation, as well as the actions
  taken by the agents like function calls, etc.
 */
export interface Event extends LlmResponse {
  /**
   * The unique identifier of the event.
   * Do not assign the ID. It will be assigned by the session.
   */
  id: string;

  /**
   * The invocation ID of the event. Should be non-empty before appending to a
   * session.
   */
  invocationId: string;

  /**
   * "user" or the name of the agent, indicating who appended the event to the
   * session.
   */
  author?: string;

  /**
   * The actions taken by the agent.
   */
  actions: EventActions;

  /**
   * Set of ids of the long running function calls. Agent client will know from
   * this field about which function call is long running. Only valid for
   * function call event
   */
  longRunningToolIds?: string[];

  /**
   * The branch of the event.
   * The format is like agent_1.agent_2.agent_3, where agent_1 is the parent of
   * agent_2, and agent_2 is the parent of agent_3.
   *
   * Branch is used when multiple sub-agent shouldn't see their peer agents'
   * conversation history.
   */
  branch?: string;

  /**
   * The timestamp of the event.
   */
  timestamp: number;
}
