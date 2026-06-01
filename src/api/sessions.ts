import type { ApiClient, CreateSessionOptions } from "../types";
import type { Session } from "../types/google-adk";

export class Sessions {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Creates a new session.
   * @param options Optional initial state and events for the session.
   * @returns The created session.
   */
  async create(options?: CreateSessionOptions): Promise<Session> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions`,
      {
        method: "POST",
        body: options ? JSON.stringify(options) : undefined,
      }
    );
  }

  /**
   * Lists all sessions for the user.
   * @returns A list of user's sessions.
   */
  async list(): Promise<Session[]> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions`
    );
  }

  /**
   * Creates a new session with a specific ID.
   * @param sessionId The ID of the session to create.
   * @param initialState Optional initial state for the session.
   * @returns The created session.
   */
  async createWithId(
    sessionId: string,
    initialState?: Record<string, unknown>
  ): Promise<Session> {
    return this.client.requestJson(
      `/apps/${this.client.appName}/users/${this.client.userId}/sessions/${sessionId}`,
      {
        method: "POST",
        body: initialState ? JSON.stringify(initialState) : undefined,
      }
    );
  }

  /**
   * Gets a specific session by its ID.
   * @param sessionId The ID of the session to retrieve.
   * @returns The requested session.
   */
  async get(sessionId: string): Promise<Session> {
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

  /**
   * Checks if a session exists. If it does not exist, creates it.
   * @param sessionId The ID of the session to ensure.
   * @param initialState Optional initial state for the session if created.
   * @returns The retrieved or created session.
   */
  async ensure(
    sessionId: string,
    initialState?: Record<string, unknown>
  ): Promise<Session> {
    try {
      return await this.get(sessionId);
    } catch (_error) {
      return await this.createWithId(sessionId, initialState);
    }
  }
}
