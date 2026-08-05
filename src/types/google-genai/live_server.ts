/**
 * Vendored types from @google/genai v2.15.0
 *
 * These enums are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 *
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

/** Server will not be able to service client soon. */
export interface LiveServerGoAway {
  /** The remaining time before the connection will be terminated as ABORTED. The minimal time returned here is specified differently together with the rate limits for a given model. */
  timeLeft?: string;
}

/** Update of the session resumption state.

Only sent if `session_resumption` was set in the connection config. */
export interface LiveServerSessionResumptionUpdate {
  /** New handle that represents state that can be resumed. Empty if `resumable`=false. */
  newHandle?: string;
  /** True if session can be resumed at this point. It might be not possible to resume session at some points. In that case we send update empty new_handle and resumable=false. Example of such case could be model executing function calls or just generating. Resuming session (using previous session token) in such state will result in some data loss. */
  resumable?: boolean;
  /** Index of last message sent by client that is included in state represented by this SessionResumptionToken. Only sent when `SessionResumptionConfig.transparent` is set.

Presence of this index allows users to transparently reconnect and avoid issue of losing some part of realtime audio input/video. If client wishes to temporarily disconnect (for example as result of receiving GoAway) they can do it without losing state by buffering messages sent since last `SessionResumptionTokenUpdate`. This field will enable them to limit buffering (avoid keeping all requests in RAM).

Note: This should not be used for when resuming a session at some time later -- in those cases partial audio and video frames are likely not needed. */
  lastConsumedClientMessageIndex?: string;
}
