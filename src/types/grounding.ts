import type {
  GroundingChunk,
  GroundingSupport,
  RetrievalMetadata,
  SearchEntryPoint
} from "./google-genai";

export interface AdkAgentGroundingMetadata {
  groundingChunks: GroundingChunk[];
  groundingSupports: GroundingSupport[];
  retrievalMetadata: RetrievalMetadata;
  retrievalQueries: string[];
  searchEntryPoint: SearchEntryPoint;
  webSearchQueries: string[];
}
