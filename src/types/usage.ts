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
  trafficType: string;
}

export interface AdkAgentTokenDetails {
  modality: string;
  tokenCount: number;
}
