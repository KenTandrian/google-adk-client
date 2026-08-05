import type { ApiClient } from "../types";

export class Memory {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Adds all events from a given session to the memory service.
   * @param sessionId The ID of the session to add to memory.
   */
  async patch(sessionId: string): Promise<void> {
    await this.client.request(
      `/apps/${this.client.appName}/users/${this.client.userId}/memory`,
      {
        method: "PATCH",
        body: JSON.stringify({ sessionId }),
      }
    );
  }
}
