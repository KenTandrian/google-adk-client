import { beforeEach, describe, expect, it, vi } from "vitest";

import { AdkClient } from "..";
import { createMockResponse } from "../test-setup";

describe("AdkClient sessions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const client = new AdkClient({
    appName: "test-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  it("should call the correct endpoint for sessions.create (without options)", async () => {
    const mockResponse = createMockResponse({ id: "new-session" });
    (fetch as any).mockResolvedValue(mockResponse);

    await client.sessions.create();

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should call the correct endpoint for sessions.create (with options)", async () => {
    const mockResponse = createMockResponse({ id: "new-session" });
    (fetch as any).mockResolvedValue(mockResponse);

    await client.sessions.create({
      state: { foo: "bar" },
      events: [],
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: { foo: "bar" },
          events: [],
        }),
      }
    );
  });

  it("should call the correct endpoint for sessions.createWithId (without initial state)", async () => {
    const mockResponse = createMockResponse({ id: "session-123" });
    (fetch as any).mockResolvedValue(mockResponse);

    await client.sessions.createWithId("session-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions/session-123",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should call the correct endpoint for sessions.createWithId (with initial state)", async () => {
    const mockResponse = createMockResponse({ id: "session-123" });
    (fetch as any).mockResolvedValue(mockResponse);

    await client.sessions.createWithId("session-123", { baz: "qux" });

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions/session-123",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ baz: "qux" }),
      }
    );
  });

  it("should call the correct endpoint for sessions.get", async () => {
    const mockResponse = createMockResponse({ id: "session-123" });
    (fetch as any).mockResolvedValue(mockResponse);

    await client.sessions.get("session-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions/session-123",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should call the correct endpoint for sessions.delete", async () => {
    const mockResponse = createMockResponse({});
    (fetch as any).mockResolvedValue(mockResponse);

    await client.sessions.delete("session-123");

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions/session-123",
      {
        method: "DELETE",
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should call the correct endpoint for sessions.list", async () => {
    const mockResponse = createMockResponse([]);
    (fetch as any).mockResolvedValue(mockResponse);

    await client.sessions.list();

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/users/user-123/sessions",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });

  describe("ensure", () => {
    it("should return existing session when get succeeds", async () => {
      const mockSession = { id: "session-123", state: { existing: true } };
      const mockResponse = createMockResponse(mockSession);
      (fetch as any).mockResolvedValue(mockResponse);

      const result = await client.sessions.ensure("session-123");

      expect(result).toEqual(mockSession);
      expect(fetch).toHaveBeenCalledWith(
        "https://example.com/apps/test-app/users/user-123/sessions/session-123",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      // Ensure createWithId was not called (fetch called only once)
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should create session when get fails", async () => {
      // First fetch (get) fails
      const mockErrorResponse = {
        ok: false,
        statusText: "Not Found",
        json: async () => ({}),
      };
      // Second fetch (createWithId) succeeds
      const mockSession = { id: "session-123", state: { created: true } };
      const mockSuccessResponse = createMockResponse(mockSession);

      let callCount = 0;
      (fetch as any).mockImplementation(async () => {
        callCount++;
        if (callCount === 1) {
          return mockErrorResponse;
        }
        return mockSuccessResponse;
      });

      const result = await client.sessions.ensure("session-123", {
        initial: "data",
      });

      expect(result).toEqual(mockSession);
      expect(fetch).toHaveBeenNthCalledWith(
        1,
        "https://example.com/apps/test-app/users/user-123/sessions/session-123",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      expect(fetch).toHaveBeenNthCalledWith(
        2,
        "https://example.com/apps/test-app/users/user-123/sessions/session-123",
        {
          method: "POST",
          headers: {
            accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initial: "data" }),
        }
      );
    });
  });
});
