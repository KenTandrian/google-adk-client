import { beforeEach, describe, expect, it, vi } from "vitest";

import { AdkClient } from "..";
import { createMockResponse } from "../test-setup";

describe("AdkClient memory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const client = new AdkClient({
    appName: "test-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  it("should call the correct endpoint for memory.patch", async () => {
    const mockResponse = createMockResponse({});
    (fetch as any).mockResolvedValue(mockResponse);

    await client.memory.patch("session-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/memory",
      {
        method: "PATCH",
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId: "session-123" }),
      }
    );
  });
});
