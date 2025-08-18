import { describe, expect, it } from "vitest";

import { AdkClient } from "..";
import { createMockResponse } from "../test-setup";

describe("AdkClient artifacts", () => {
  const client = new AdkClient({
    appName: "test-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  it("should call the correct endpoint for artifacts.listNames", async () => {
    const mockResponse = createMockResponse([]);
    (fetch as any).mockResolvedValue(mockResponse);

    await client.artifacts.listNames("session-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions/session-123/artifacts",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });
});
