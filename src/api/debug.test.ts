import { describe, expect, it } from "vitest";

import { AdkClient } from "..";
import { createMockResponse } from "../test-setup";

describe("AdkClient debug", () => {
  const client = new AdkClient({
    appName: "test-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  it("should call the correct endpoint for debug.getTrace", async () => {
    const mockResponse = createMockResponse({});
    (fetch as any).mockResolvedValue(mockResponse);

    await client.debug.getTrace("event-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/debug/trace/event-123",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });
});
