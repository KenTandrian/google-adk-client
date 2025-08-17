import { ApiClient } from "./sessions";

export class Events {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Gets the graph representation of a specific event in a session.
   * @param sessionId The ID of the session to get the event from.
   * @param eventId The ID of the event to get the graph for.
   * @returns The graph representation of the event.
   */
  async getGraph(sessionId: string, eventId: string): Promise<string> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}/events/${eventId}/graph`
    );
  }
}
