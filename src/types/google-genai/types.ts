/**
 * Vendored types from @google/genai v1.34.0
 * 
 * These types are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 * 
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

/** URI based data. */
export interface FileData {
  /** Optional. Display name of the file data. Used to provide a label or filename to distinguish file datas. This field is only returned in PromptMessage for prompt management. It is currently used in the Gemini GenerateContent calls only when server side tools (code_execution, google_search, and url_context) are enabled. This field is not supported in Gemini API. */
  displayName?: string;
  /** Required. URI. */
  fileUri?: string;
  /** Required. The IANA standard MIME type of the source data. */
  mimeType?: string;
}

/** Metadata describes the input video content. */
export interface VideoMetadata {
  /** Optional. The end offset of the video. */
  endOffset?: string;
  /** Optional. The frame rate of the video sent to the model. If not specified, the default value will be 1.0. The fps range is (0.0, 24.0]. */
  fps?: number;
  /** Optional. The start offset of the video. */
  startOffset?: string;
}
