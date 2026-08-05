/**
 * Detailed information about an agent within an application.
 */
export interface AgentInfo {
  name?: string;
  description?: string;
  instruction?: string;
}

/**
 * Detailed information about an ADK application.
 */
export interface AppInfo {
  name: string;
  rootAgentName: string;
  description: string;
  language: "yaml" | "python";
  isComputerUse?: boolean;
  agents?: Record<string, AgentInfo> | null;
}
