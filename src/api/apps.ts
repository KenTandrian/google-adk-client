import type { ApiClient } from "../types";

export class Apps {
  private readonly client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Lists all apps available to the user.
   * @returns A list of app names available to the user.
   */
  async list(): Promise<string[]> {
    return this.client.requestJson(`/list-apps`);
  }
}
