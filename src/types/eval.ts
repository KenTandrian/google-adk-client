import { AdkAgentContent } from "./common";

export type AdkRunEvalResponse = AdkRunEvalResult[];

export interface AdkRunEvalResult {
  evalSetFile: string;
  evalSetId: string;
  evalId: string;
  finalEvalStatus: number;
  overallEvalMetricResults: AdkOverallEvalMetricResult[];
  evalMetricResultPerInvocation: AdkEvalMetricResultPerInvocation[];
  userId: string;
  sessionId: string;
}

export interface AdkOverallEvalMetricResult {
  metricName: string;
  threshold: number;
  score: number;
  evalStatus: number;
}

export interface AdkEvalMetricResultPerInvocation {
  actualInvocation: AdkInvocation;
  expectedInvocation: AdkInvocation;
  evalMetricResults: any[];
}

export interface AdkInvocation {
  invocationId: string;
  userContent: AdkAgentContent;
  finalResponse: AdkAgentContent;
  intermediateData: AdkIntermediateData;
  creationTimestamp: number;
}

export interface AdkIntermediateData {
  toolUses: any[];
  intermediateResponses: any[];
}

export interface AdkGetEvalResponse {
  evalId: string;
  conversation: AdkInvocation[];
  sessionInput: AdkSessionInput;
  creationTimestamp: number;
}

export interface AdkSessionInput {
  appName: string;
  userId: string;
  state: Record<string, any>;
}

export interface AdkGetEvalResultResponse {
  evalSetResultId: string;
  evalSetResultName: string;
  evalSetId: string;
  evalCaseResults: AdkRunEvalResult[];
  creationTimestamp: number;
}
