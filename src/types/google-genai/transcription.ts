/**
 * Vendored types from @google/genai v2.15.0
 *
 * These enums are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 *
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

/** Information about a single recognized word. */
export interface WordInfo {
  /** Transcript of the word.
   */
  word?: string;
  /** Start offset in time of the word relative to the start of the audio.
   */
  startOffset?: string;
  /** End offset in time of the word relative to the start of the audio.
   */
  endOffset?: string;
}

/** Audio transcription in Server Content. */
export interface Transcription {
  /** Optional. Transcription text. */
  text?: string;
  /** Optional. The bool indicates the end of the transcription. */
  finished?: boolean;
  /** The BCP-47 language code of the transcription. */
  languageCode?: string;
  /** A label identifying the speaker of this audio segment (e.g. "spk_1", "spk_2").
   */
  speakerLabel?: string;
  /** Detailed word-level transcriptions and timing details.
   */
  words?: WordInfo[];
}
