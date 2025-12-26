/**
 * Vendored types from @google/adk v0.2.1
 * 
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/adk changes significantly.
 * 
 * @see https://github.com/google/adk-js/blob/main/core/src/models/llm_response.ts
 */

import type {
  Content,
  GroundingMetadata,
  UsageMetadata
} from "../../google-genai";

/**
 * LLM response class that provides the first candidate response from the
 * model if available. Otherwise, returns error code and message.
 */
export interface LlmResponse {
  /**
   * The content of the response.
   */
  content?: Content;

  /**
   * The grounding metadata of the response.
   */
  groundingMetadata?: GroundingMetadata;

  /**
   * Indicates whether the text content is part of a unfinished text stream.
   * Only used for streaming mode and when the content is plain text.
   */
  partial?: boolean;

  /**
   * Indicates whether the response from the model is complete.
   * Only used for streaming mode.
   */
  turnComplete?: boolean;

  /**
   * Error code if the response is an error. Code varies by model.
   */
  errorCode?: string;

  /**
   * Error message if the response is an error.
   */
  errorMessage?: string;

  /**
   * Flag indicating that LLM was interrupted when generating the content.
   * Usually it's due to user interruption during a bidi streaming.
   */
  interrupted?: boolean;

  /**
   * The custom metadata of the LlmResponse.
   * An optional key-value pair to label an LlmResponse.
   * NOTE: the entire object must be JSON serializable.
   */
  customMetadata?: {[key: string]: any};

  /**
   * The usage metadata of the LlmResponse.
   */
  usageMetadata?: UsageMetadata;
}
