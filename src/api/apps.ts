import type { ApiClient, AppInfo } from "../types";

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

  /**
   * Returns detailed info for a given ADK app.
   * @param appName Optional app name. Defaults to the client appName.
   * @returns Detailed info for the specified or default app.
   */
  async getInfo(appName?: string): Promise<AppInfo> {
    const targetApp = appName ?? this.client.appName;
    return this.client.requestJson(`/apps/${targetApp}/app-info`);
  }
}
