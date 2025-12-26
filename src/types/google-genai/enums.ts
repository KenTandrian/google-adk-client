/**
 * Vendored types from @google/genai v1.34.0
 * 
 * These enums are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 * 
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

/** Specifies how the response should be scheduled in the conversation. */
export enum FunctionResponseScheduling {
  /**
   * This value is unused.
   */
  SCHEDULING_UNSPECIFIED = 'SCHEDULING_UNSPECIFIED',
  /**
   * Only add the result to the conversation context, do not interrupt or trigger generation.
   */
  SILENT = 'SILENT',
  /**
   * Add the result to the conversation context, and prompt to generate output without interrupting ongoing generation.
   */
  WHEN_IDLE = 'WHEN_IDLE',
  /**
   * Add the result to the conversation context, interrupt ongoing generation and prompt to generate output.
   */
  INTERRUPT = 'INTERRUPT',
}

/** Programming language of the `code`. */
export enum Language {
  /**
   * Unspecified language. This value should not be used.
   */
  LANGUAGE_UNSPECIFIED = 'LANGUAGE_UNSPECIFIED',
  /**
   * Python >= 3.10, with numpy and simpy available.
   */
  PYTHON = 'PYTHON',
}

/** Server content modalities. */
export enum MediaModality {
  /**
   * The modality is unspecified.
   */
  MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED",
  /**
   * Plain text.
   */
  TEXT = "TEXT",
  /**
   * Images.
   */
  IMAGE = "IMAGE",
  /**
   * Video.
   */
  VIDEO = "VIDEO",
  /**
   * Audio.
   */
  AUDIO = "AUDIO",
  /**
   * Document, e.g. PDF.
   */
  DOCUMENT = "DOCUMENT"
}

/** Outcome of the code execution. */
export enum Outcome {
  /**
   * Unspecified status. This value should not be used.
   */
  OUTCOME_UNSPECIFIED = 'OUTCOME_UNSPECIFIED',
  /**
   * Code execution completed successfully.
   */
  OUTCOME_OK = 'OUTCOME_OK',
  /**
   * Code execution finished but with a failure. `stderr` should contain the reason.
   */
  OUTCOME_FAILED = 'OUTCOME_FAILED',
  /**
   * Code execution ran for too long, and was cancelled. There may or may not be a partial output present.
   */
  OUTCOME_DEADLINE_EXCEEDED = 'OUTCOME_DEADLINE_EXCEEDED',
}

/** Output only. The traffic type for this request. This enum is not supported in Gemini API. */
export enum TrafficType {
  /**
   * Unspecified request traffic type.
   */
  TRAFFIC_TYPE_UNSPECIFIED = "TRAFFIC_TYPE_UNSPECIFIED",
  /**
   * The request was processed using Pay-As-You-Go quota.
   */
  ON_DEMAND = "ON_DEMAND",
  /**
   * Type for Provisioned Throughput traffic.
   */
  PROVISIONED_THROUGHPUT = "PROVISIONED_THROUGHPUT"
}
