/**
 * Vendored types from @google/genai v1.34.0
 *
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 *
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

/** Metadata related to retrieval in the grounding flow. */
export interface RetrievalMetadata {
  /** Optional. Score indicating how likely information from Google Search could help answer the prompt. The score is in the range `[0, 1]`, where 0 is the least likely and 1 is the most likely. This score is only populated when Google Search grounding and dynamic retrieval is enabled. It will be compared to the threshold to determine whether to trigger Google Search. */
  googleSearchDynamicRetrievalScore?: number;
}
