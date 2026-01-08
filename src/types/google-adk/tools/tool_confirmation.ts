/**
 * Vendored types from @google/adk v0.2.1
 *
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/adk changes significantly.
 *
 * @see https://github.com/google/adk-js/blob/main/core/src/tools/tool_confirmation.ts
 */

/**
 * Represents a tool confirmation configuration.
 */
export interface ToolConfirmation {
  /** The hint text for why the input is needed. */
  hint: string;

  /** Whether the tool excution is confirmed. */
  confirmed: boolean;

  /**
   * The custom data payload needed from the user to continue the flow.
   * It should be JSON serializable.
   */
  payload?: unknown;
}
