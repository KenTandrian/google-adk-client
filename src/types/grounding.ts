import type {
  GroundingChunkRetrievedContext,
  GroundingChunkWeb,
  GroundingSupport,
  RetrievalMetadata,
  SearchEntryPoint
} from "./google-genai";

export interface AdkAgentGroundingMetadata {
  groundingChunks: AdkAgentGroundingChunk[];
  groundingSupports: GroundingSupport[];
  retrievalMetadata: RetrievalMetadata;
  retrievalQueries: string[];
  searchEntryPoint: SearchEntryPoint;
  webSearchQueries: string[];
}

export interface AdkAgentGroundingChunk {
  retrievedContext?: GroundingChunkRetrievedContext;
  web?: GroundingChunkWeb;
}
