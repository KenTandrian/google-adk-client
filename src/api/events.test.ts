import { describe, expect, it } from "vitest";

import { AdkClient } from "..";
import { createMockResponse } from "../test-setup";

describe("AdkClient events", () => {
  const client = new AdkClient({
    appName: "test-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  it("should call the correct endpoint for events.getGraph", async () => {
    const mockResponse = createMockResponse({});
    (fetch as any).mockResolvedValue(mockResponse);

    await client.events.getGraph("session-123", "event-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions/session-123/events/event-123/graph",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });
});
