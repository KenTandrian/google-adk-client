import type { Part } from "./google-genai";

export interface AdkAgentContent {
  parts: Part[];
  role: string;
}
