/**
 * Vendored types from @google/genai v2.15.0
 *
 * These enums are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 *
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

import type { MediaModality, TrafficType } from "./enums";

/** Represents token counting info for a single modality. */
export interface ModalityTokenCount {
  /** The modality associated with this token count. */
  modality?: MediaModality;
  /** Number of tokens. */
  tokenCount?: number;
}

/** Usage metadata about the content generation request and response. This message provides a detailed breakdown of token usage and other relevant metrics. This data type is not supported in Gemini API. */
export interface GenerateContentResponseUsageMetadata {
  /** Output only. A detailed breakdown of the token count for each modality in the cached content. */
  cacheTokensDetails?: ModalityTokenCount[];
  /** Output only. The number of tokens in the cached content that was used for this request. */
  cachedContentTokenCount?: number;
  /** The total number of tokens in the generated candidates. */
  candidatesTokenCount?: number;
  /** Output only. A detailed breakdown of the token count for each modality in the generated candidates. */
  candidatesTokensDetails?: ModalityTokenCount[];
  /** The total number of tokens in the prompt. This includes any text, images, or other media provided in the request. When `cached_content` is set, this also includes the number of tokens in the cached content. */
  promptTokenCount?: number;
  /** Output only. A detailed breakdown of the token count for each modality in the prompt. */
  promptTokensDetails?: ModalityTokenCount[];
  /** Output only. The number of tokens that were part of the model's generated "thoughts" output, if applicable. */
  thoughtsTokenCount?: number;
  /** Output only. The number of tokens in the results from tool executions, which are provided back to the model as input, if applicable. */
  toolUsePromptTokenCount?: number;
  /** Output only. A detailed breakdown by modality of the token counts from the results of tool executions, which are provided back to the model as input. */
  toolUsePromptTokensDetails?: ModalityTokenCount[];
  /** The total number of tokens for the entire request. This is the sum of `prompt_token_count`, `candidates_token_count`, `tool_use_prompt_token_count`, and `thoughts_token_count`. */
  totalTokenCount?: number;
  /** Output only. The traffic type for this request. */
  trafficType?: TrafficType;
}
