import { describe, expect, it } from "vitest";

import { AdkClient } from "..";
import { createMockResponse } from "../test-setup";

describe("AdkClient apps", () => {
  const client = new AdkClient({
    appName: "test-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  it("should call the correct endpoint for apps.list", async () => {
    const mockResponse = createMockResponse(["app1", "app2"]);
    (fetch as any).mockResolvedValue(mockResponse);

    await client.apps.list();

    expect(fetch).toHaveBeenCalledWith("https://example.com/list-apps", {
      headers: {
        accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  });

  it("should call the correct endpoint for apps.getInfo (default appName)", async () => {
    const mockAppInfo = {
      name: "test-app",
      rootAgentName: "root",
      description: "Test App",
      language: "python",
    };
    const mockResponse = createMockResponse(mockAppInfo);
    (fetch as any).mockResolvedValue(mockResponse);

    const result = await client.apps.getInfo();

    expect(result).toEqual(mockAppInfo);
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/app-info",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should call the correct endpoint for apps.getInfo (custom appName)", async () => {
    const mockAppInfo = {
      name: "custom-app",
      rootAgentName: "root",
      description: "Custom App",
      language: "yaml",
    };
    const mockResponse = createMockResponse(mockAppInfo);
    (fetch as any).mockResolvedValue(mockResponse);

    const result = await client.apps.getInfo("custom-app");

    expect(result).toEqual(mockAppInfo);
    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/custom-app/app-info",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });
});
