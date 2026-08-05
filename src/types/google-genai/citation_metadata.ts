/**
 * Vendored types from @google/genai v2.15.0
 *
 * These enums are copied locally to keep the client library lightweight.
 * Update when @google/genai changes significantly.
 *
 * @see https://github.com/googleapis/js-genai/blob/main/src/types.ts
 */

/** Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp. This data type is not supported in Gemini API. */
export interface GoogleTypeDate {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
}

/** A citation for a piece of generatedcontent. This data type is not supported in Gemini API. */
export interface Citation {
  /** Output only. The end index of the citation in the content. */
  endIndex?: number;
  /** Output only. The license of the source of the citation. */
  license?: string;
  /** Output only. The publication date of the source of the citation. */
  publicationDate?: GoogleTypeDate;
  /** Output only. The start index of the citation in the content. */
  startIndex?: number;
  /** Output only. The title of the source of the citation. */
  title?: string;
  /** Output only. The URI of the source of the citation. */
  uri?: string;
}

/** Citation information when the model quotes another source. */
export interface CitationMetadata {
  /** Contains citation information when the model directly quotes, at
      length, from another source. Can include traditional websites and code
      repositories.
       */
  citations?: Citation[];
}
