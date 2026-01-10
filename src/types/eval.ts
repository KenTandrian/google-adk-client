import type { Content } from "./google-genai";

export type RunEvalResponse = RunEvalResult[];

export interface RunEvalResult {
  evalSetFile: string;
  evalSetId: string;
  evalId: string;
  finalEvalStatus: number;
  overallEvalMetricResults: OverallEvalMetricResult[];
  evalMetricResultPerInvocation: EvalMetricResultPerInvocation[];
  userId: string;
  sessionId: string;
}

export interface OverallEvalMetricResult {
  metricName: string;
  threshold: number;
  score: number;
  evalStatus: number;
}

export interface EvalMetricResultPerInvocation {
  actualInvocation: Invocation;
  expectedInvocation: Invocation;
  evalMetricResults: any[];
}

export interface Invocation {
  invocationId: string;
  userContent: Content;
  finalResponse: Content;
  intermediateData: IntermediateData;
  creationTimestamp: number;
}

export interface IntermediateData {
  toolUses: any[];
  intermediateResponses: any[];
}

export interface GetEvalResponse {
  evalId: string;
  conversation: Invocation[];
  sessionInput: SessionInput;
  creationTimestamp: number;
}

export interface SessionInput {
  appName: string;
  userId: string;
  state: Record<string, any>;
}

export interface GetEvalResultResponse {
  evalSetResultId: string;
  evalSetResultName: string;
  evalSetId: string;
  evalCaseResults: RunEvalResult[];
  creationTimestamp: number;
}
