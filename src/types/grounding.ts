import type { RetrievalMetadata, SearchEntryPoint } from "./google-genai";

export interface AdkAgentGroundingMetadata {
  groundingChunks: AdkAgentGroundingChunk[];
  groundingSupports: AdkAgentGroundingSupport[];
  retrievalMetadata: RetrievalMetadata;
  retrievalQueries: string[];
  searchEntryPoint: SearchEntryPoint;
  webSearchQueries: string[];
}

export interface AdkAgentGroundingChunk {
  retrievedContext?: AdkAgentRetrievedContext;
  web?: AdkAgentWeb;
}

export interface AdkAgentRetrievedContext {
  ragChunk: AdkAgentRagChunk;
  text: string;
  title: string;
  uri: string;
}

export interface AdkAgentRagChunk {
  pageSpan: AdkAgentPageSpan;
  text: string;
}

export interface AdkAgentPageSpan {
  firstPage: number;
  lastPage: number;
}

export interface AdkAgentWeb {
  domain: string;
  title: string;
  uri: string;
}

export interface AdkAgentGroundingSupport {
  confidenceScores: number[];
  groundingChunkIndices: number[];
  segment: AdkAgentSegment;
}

export interface AdkAgentSegment {
  endIndex: number;
  partIndex: number;
  startIndex: number;
  text: string;
}
