/**
 * Vendored types from @google/genai v1.34.0
 *
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 *
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

/** Grounding chunk. */
export interface GroundingChunk {
  /** Grounding chunk from context retrieved by the retrieval tools. This field is not supported in Gemini API. */
  retrievedContext?: GroundingChunkRetrievedContext;
  /** Grounding chunk from the web. */
  web?: GroundingChunkWeb;
}

/** Chunk from context retrieved by the retrieval tools. This data type is not supported in Gemini API. */
export interface GroundingChunkRetrievedContext {
  /** Output only. The full document name for the referenced Vertex AI Search document. */
  documentName?: string;
  /** Additional context for the RAG retrieval result. This is only populated when using the RAG retrieval tool. */
  ragChunk?: RagChunk;
  /** Text of the attribution. */
  text?: string;
  /** Title of the attribution. */
  title?: string;
  /** URI reference of the attribution. */
  uri?: string;
}

/** Chunk from the web. */
export interface GroundingChunkWeb {
  /** Domain of the (original) URI. This field is not supported in Gemini API. */
  domain?: string;
  /** Title of the chunk. */
  title?: string;
  /** URI reference of the chunk. */
  uri?: string;
}

/** Grounding support. */
export interface GroundingSupport {
  /** Confidence score of the support references. Ranges from 0 to 1. 1 is the most confident. For Gemini 2.0 and before, this list must have the same size as the grounding_chunk_indices. For Gemini 2.5 and after, this list will be empty and should be ignored. */
  confidenceScores?: number[];
  /** A list of indices (into 'grounding_chunk') specifying the citations associated with the claim. For instance [1,3,4] means that grounding_chunk[1], grounding_chunk[3], grounding_chunk[4] are the retrieved content attributed to the claim. */
  groundingChunkIndices?: number[];
  /** Segment of the content this support belongs to. */
  segment?: Segment;
}

/** A RagChunk includes the content of a chunk of a RagFile, and associated metadata. This data type is not supported in Gemini API. */
export interface RagChunk {
  /** If populated, represents where the chunk starts and ends in the document. */
  pageSpan?: RagChunkPageSpan;
  /** The content of the chunk. */
  text?: string;
}

/** Represents where the chunk starts and ends in the document. This data type is not supported in Gemini API. */
export interface RagChunkPageSpan {
  /** Page where chunk starts in the document. Inclusive. 1-indexed. */
  firstPage?: number;
  /** Page where chunk ends in the document. Inclusive. 1-indexed. */
  lastPage?: number;
}

/** Metadata related to retrieval in the grounding flow. */
export interface RetrievalMetadata {
  /** Optional. Score indicating how likely information from Google Search could help answer the prompt. The score is in the range `[0, 1]`, where 0 is the least likely and 1 is the most likely. This score is only populated when Google Search grounding and dynamic retrieval is enabled. It will be compared to the threshold to determine whether to trigger Google Search. */
  googleSearchDynamicRetrievalScore?: number;
}

/** Google search entry point. */
export interface SearchEntryPoint {
  /** Optional. Web content snippet that can be embedded in a web page or an app webview. */
  renderedContent?: string;
  /** Optional. Base64 encoded JSON representing array of tuple.
   * @remarks Encoded as base64 string. */
  sdkBlob?: string;
}

/** Segment of the content. */
export interface Segment {
  /** Output only. End index in the given Part, measured in bytes. Offset from the start of the Part, exclusive, starting at zero. */
  endIndex?: number;
  /** Output only. The index of a Part object within its parent Content object. */
  partIndex?: number;
  /** Output only. Start index in the given Part, measured in bytes. Offset from the start of the Part, inclusive, starting at zero. */
  startIndex?: number;
  /** Output only. The text corresponding to the segment from the response. */
  text?: string;
}
