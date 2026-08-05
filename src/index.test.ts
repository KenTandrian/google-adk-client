import { describe, expect, it } from "vitest";
import { AdkClient } from ".";
import { createMockResponse } from "./test-setup";

describe("AdkClient", () => {
  it("should be defined", () => {
    expect(AdkClient).toBeDefined();
  });

  it("should throw an error if appName is not provided", () => {
    expect(
      () =>
        new AdkClient({
          baseUrl: "https://example.com",
          userId: "user-123",
        })
    ).toThrow(
      "App name is required. Provide it in the constructor or set the ADK_APP_NAME environment variable."
    );
  });

  it("should throw an error if baseUrl is not provided", () => {
    expect(
      () =>
        new AdkClient({
          appName: "my-app",
          userId: "user-123",
        })
    ).toThrow(
      "Base URL is required. Provide it in the constructor or set the ADK_BASE_URL environment variable."
    );
  });

  it("should call the correct endpoint for health", async () => {
    const client = new AdkClient({
      appName: "my-app",
      baseUrl: "https://example.com",
      userId: "user-123",
    });
    const mockResponse = createMockResponse({ status: "ok" });
    (fetch as any).mockResolvedValue(mockResponse);

    const result = await client.health();

    expect(result).toEqual({ status: "ok" });
    expect(fetch).toHaveBeenCalledWith("https://example.com/health", {
      headers: {
        accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  });

  it("should call the correct endpoint for version", async () => {
    const client = new AdkClient({
      appName: "my-app",
      baseUrl: "https://example.com",
      userId: "user-123",
    });
    const mockVersionInfo = {
      version: "2.5.0",
      language: "python",
      language_version: "3.11.15",
    };
    const mockResponse = createMockResponse(mockVersionInfo);
    (fetch as any).mockResolvedValue(mockResponse);

    const result = await client.version();

    expect(result).toEqual(mockVersionInfo);
    expect(fetch).toHaveBeenCalledWith("https://example.com/version", {
      headers: {
        accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  });
});
