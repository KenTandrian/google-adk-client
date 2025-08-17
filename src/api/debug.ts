import type { ApiClient } from "@/types";

export class Debug {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Gets the trace for a specific event.
   * @param eventId The ID of the event to get the trace for.
   * @returns The trace information for the specified event.
   */
  async getTrace(eventId: string): Promise<string> {
    return this.client.requestJson(`/debug/trace/${eventId}`);
  }

  /**
   * Gets the trace for a specific session.
   * @param sessionId The ID of the session to get the trace for.
   * @returns The trace information for the specified session.
   */
  async getSessionTrace(sessionId: string): Promise<string> {
    return this.client.requestJson(`/debug/trace/session/${sessionId}`);
  }
}
