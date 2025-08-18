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
});
