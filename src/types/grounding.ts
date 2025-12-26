import type {
  GroundingChunkWeb,
  GroundingSupport,
  RagChunkPageSpan,
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
  retrievedContext?: AdkAgentRetrievedContext;
  web?: GroundingChunkWeb;
}

export interface AdkAgentRetrievedContext {
  ragChunk: AdkAgentRagChunk;
  text: string;
  title: string;
  uri: string;
}

export interface AdkAgentRagChunk {
  pageSpan: RagChunkPageSpan;
  text: string;
}
