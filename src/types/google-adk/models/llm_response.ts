/**
 * Vendored types from @google/adk v1.5.0
 *
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/adk changes significantly.
 *
 * @see https://github.com/google/adk-js/blob/main/core/src/models/llm_response.ts
 */

import type {
  CitationMetadata,
  Content,
  FinishReason,
  GenerateContentResponseUsageMetadata,
  GroundingMetadata,
  LiveServerGoAway,
  LiveServerSessionResumptionUpdate,
  Transcription,
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
   * The citation metadata of the response.
   */
  citationMetadata?: CitationMetadata;

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
  customMetadata?: { [key: string]: unknown };

  /**
   * The usage metadata of the LlmResponse.
   */
  usageMetadata?: GenerateContentResponseUsageMetadata;

  /**
   * The finish reason of the response.
   */
  finishReason?: FinishReason;

  /**
   * The session resumption update of the LlmResponse
   */
  liveSessionResumptionUpdate?: LiveServerSessionResumptionUpdate;

  /**
   * Server-side signal that the live connection will be closed soon. The
   * caller should reconnect using the latest session resumption handle.
   */
  goAway?: LiveServerGoAway;

  /**
   * Audio transcription of user input.
   */
  inputTranscription?: Transcription;

  /**
   * Audio transcription of model output.
   */
  outputTranscription?: Transcription;

  /**
   * The interaction ID returned by the model, if any.
   */
  interactionId?: string;

  /** The model version used to generate the response. */
  modelVersion?: string;

  /** The session ID of the Live session. */
  liveSessionId?: string;
}
