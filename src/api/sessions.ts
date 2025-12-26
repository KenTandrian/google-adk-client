import type { AdkAgentSession, ApiClient } from "../types";

export class Sessions {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Creates a new session.
   * @param defaultState Optional initial state for the session.
   * @returns The created session.
   */
  async create(defaultState?: object): Promise<AdkAgentSession> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions`,
      {
        method: "POST",
        body: defaultState
          ? JSON.stringify({ state: defaultState })
          : undefined,
      }
    );
  }

  /**
   * Lists all sessions for the user.
   * @returns A list of user's sessions.
   */
  async list(): Promise<AdkAgentSession[]> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions`
    );
  }

  /**
   * Creates a new session with a specific ID.
   * @param sessionId The ID of the session to create.
   * @param defaultState Optional initial state for the session.
   * @returns The created session.
   */
  async createWithId(
    sessionId: string,
    defaultState?: object
  ): Promise<AdkAgentSession> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}`,
      {
        method: "POST",
        body: defaultState
          ? JSON.stringify({ state: defaultState })
          : undefined,
      }
    );
  }

  /**
   * Gets a specific session by its ID.
   * @param sessionId The ID of the session to retrieve.
   * @returns The requested session.
   */
  async get(sessionId: string): Promise<AdkAgentSession> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}`
    );
  }

  /**
   * Deletes a specific session by its ID.
   * @param sessionId The ID of the session to delete.
   */
  async delete(sessionId: string): Promise<void> {
    await this.client.request(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}`,
      {
        method: "DELETE",
      }
    );
  }
}
