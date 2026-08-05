import type { UIMessage } from "ai";

import { Apps } from "./api/apps";
import { Artifacts } from "./api/artifacts";
import { Debug } from "./api/debug";
import { Evals } from "./api/evals";
import { Events } from "./api/events";
import { Memory } from "./api/memory";
import { Sessions } from "./api/sessions";
import type {
  AgentRunSsePayload,
  HealthResponse,
  VersionResponse,
} from "./types";

export interface AdkClientOptions {
  appName?: string;
  baseUrl?: string;
  userId: string;
}

/**
 * The main entry point for interacting with the ADK API.
 * It provides methods to manage applications, sessions, artifacts, evaluations,
 * events, and memory.
 *
 * @example
 * const adkClient = new AdkClient({
 *   appName: "myApp",
 *   baseUrl: "https://api.example.com",
 *   userId: "user123",
 * });
 */
export class AdkClient {
  private readonly appName: string;
  private readonly baseUrl: string;
  private readonly userId: string;

  public readonly sessions: Sessions;
  public readonly artifacts: Artifacts;
  public readonly evals: Evals;
  public readonly apps: Apps;
  public readonly debug: Debug;
  public readonly events: Events;
  public readonly memory: Memory;

  constructor(options: AdkClientOptions) {
    const appName = options.appName ?? process.env.ADK_APP_NAME;
    const baseUrl = options.baseUrl ?? process.env.ADK_BASE_URL;
    this.userId = options.userId;

    if (!appName) {
      throw new Error(
        "App name is required. Provide it in the constructor or set the ADK_APP_NAME environment variable."
      );
    }

    if (!baseUrl) {
      throw new Error(
        "Base URL is required. Provide it in the constructor or set the ADK_BASE_URL environment variable."
      );
    }
    this.appName = appName;
    this.baseUrl = baseUrl;

    this.apps = new Apps({
      appName: this.appName,
      userId: this.userId,
      request: this.request.bind(this),
      requestJson: this.requestJson.bind(this),
    });

    this.artifacts = new Artifacts({
      appName: this.appName,
      userId: this.userId,
      request: this.request.bind(this),
      requestJson: this.requestJson.bind(this),
    });

    this.debug = new Debug({
      appName: this.appName,
      userId: this.userId,
      request: this.request.bind(this),
      requestJson: this.requestJson.bind(this),
    });

    this.evals = new Evals({
      appName: this.appName,
      userId: this.userId,
      request: this.request.bind(this),
      requestJson: this.requestJson.bind(this),
    });

    this.events = new Events({
      appName: this.appName,
      userId: this.userId,
      request: this.request.bind(this),
      requestJson: this.requestJson.bind(this),
    });

    this.memory = new Memory({
      appName: this.appName,
      userId: this.userId,
      request: this.request.bind(this),
      requestJson: this.requestJson.bind(this),
    });

    this.sessions = new Sessions({
      appName: this.appName,
      userId: this.userId,
      request: this.request.bind(this),
      requestJson: this.requestJson.bind(this),
    });
  }

  private async request(
    endpoint: string,
    options?: RequestInit
  ): Promise<Response> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response;
  }

  private async requestJson<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await this.request(endpoint, options);
    return response.json();
  }

  private transformMessagesToAdkNewMessage(
    messages: UIMessage[]
  ): AgentRunSsePayload["newMessage"] {
    const lastMessage = messages[messages.length - 1];

    const parts = lastMessage.parts.map((part) => {
      switch (part.type) {
        case "text":
          return { text: part.text };
        case "file": {
          const [_, base64Data] = part.url.split(",");
          return {
            inlineData: {
              data: base64Data,
              displayName: part.filename ?? "file",
              mimeType: part.mediaType,
            },
          };
        }
        default:
          return {};
      }
    });

    return {
      parts,
      role: lastMessage.role,
    };
  }

  /**
   * Checks health of the ADK service.
   */
  async health(): Promise<HealthResponse> {
    return this.requestJson<HealthResponse>("/health");
  }

  /**
   * Runs an agent in streaming mode and returns the response.
   */
  async runSse(sessionId: string, messages: UIMessage[]): Promise<Response> {
    const newMessage = this.transformMessagesToAdkNewMessage(messages);
    const body: AgentRunSsePayload = {
      appName: this.appName,
      userId: this.userId,
      sessionId: sessionId,
      newMessage,
      streaming: true,
    };

    return this.request("/run_sse", {
      body: JSON.stringify(body),
      headers: { accept: "text/event-stream" },
      method: "POST",
    });
  }

  /**
   * Runs an agent and returns a response.
   */
  async run(sessionId: string, messages: UIMessage[]): Promise<Response> {
    const newMessage = this.transformMessagesToAdkNewMessage(messages);
    const body: AgentRunSsePayload = {
      appName: this.appName,
      userId: this.userId,
      sessionId: sessionId,
      newMessage,
      streaming: false,
    };

    return this.request("/run", {
      body: JSON.stringify(body),
      method: "POST",
    });
  }

  /**
   * Gets version of the ADK service.
   */
  async version(): Promise<VersionResponse> {
    return this.requestJson<VersionResponse>("/version");
  }
}

export * from "./types";
