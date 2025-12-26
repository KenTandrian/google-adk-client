import type { MediaModality, TrafficType } from "./google-genai";

export interface AdkAgentUsageMetadata {
  cacheTokensDetails?: AdkAgentTokenDetails[];
  cachedContentTokenCount?: number;
  candidatesTokenCount?: number;
  candidatesTokensDetails?: AdkAgentTokenDetails[];
  promptTokenCount?: number;
  promptTokensDetails?: AdkAgentTokenDetails[];
  thoughtsTokenCount?: number;
  toolUsePromptTokenCount?: number;
  toolUsePromptTokensDetails?: AdkAgentTokenDetails[];
  totalTokenCount?: number;
  trafficType?: TrafficType;
}

export interface AdkAgentTokenDetails {
  modality?: MediaModality;
  tokenCount: number;
}
