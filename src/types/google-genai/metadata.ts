/**
 * Vendored types from @google/genai v1.34.0
 *
 * These types are copied locally to keep the client library lightweight.
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

/** Usage metadata about response(s). */
export interface UsageMetadata {
  /** Number of tokens in the prompt. When `cached_content` is set, this is still the total effective prompt size meaning this includes the number of tokens in the cached content. */
  promptTokenCount?: number;
  /** Number of tokens in the cached part of the prompt (the cached content). */
  cachedContentTokenCount?: number;
  /** Total number of tokens across all the generated response candidates. */
  responseTokenCount?: number;
  /** Number of tokens present in tool-use prompt(s). */
  toolUsePromptTokenCount?: number;
  /** Number of tokens of thoughts for thinking models. */
  thoughtsTokenCount?: number;
  /** Total token count for prompt, response candidates, and tool-use prompts(if present). */
  totalTokenCount?: number;
  /** List of modalities that were processed in the request input. */
  promptTokensDetails?: ModalityTokenCount[];
  /** List of modalities that were processed in the cache input. */
  cacheTokensDetails?: ModalityTokenCount[];
  /** List of modalities that were returned in the response. */
  responseTokensDetails?: ModalityTokenCount[];
  /** List of modalities that were processed in the tool-use prompt. */
  toolUsePromptTokensDetails?: ModalityTokenCount[];
  /** Traffic type. This shows whether a request consumes Pay-As-You-Go or Provisioned Throughput quota. */
  trafficType?: TrafficType;
}
