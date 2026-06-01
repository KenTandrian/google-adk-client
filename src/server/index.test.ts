import { beforeEach, describe, expect, it, vi } from "vitest";
import { createAdkProxy } from "./index";

describe("createAdkProxy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should transparently forward POST request to the remote service", async () => {
    const mockResponse = new Response(JSON.stringify({ result: "success" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    (fetch as any).mockResolvedValue(mockResponse);

    const proxy = createAdkProxy({
      baseUrl: "https://remote-adk.internal",
    });

    const request = new Request("http://localhost:3000/api/chat/run", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-custom-client-header": "hello",
      },
      body: JSON.stringify({ prompt: "test" }),
    });

    const response = await proxy.POST(request);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({ result: "success" });

    expect(fetch).toHaveBeenCalledWith(
      "https://remote-adk.internal/run",
      expect.objectContaining({
        method: "POST",
        body: expect.any(Object),
      })
    );

    const fetchArgs = (fetch as any).mock.calls[0][1];
    expect(fetchArgs.headers.get("x-custom-client-header")).toBe("hello");
    expect(fetchArgs.headers.get("host")).toBeNull();
  });

  it("should correctly inject custom headers via headers option", async () => {
    const mockResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    (fetch as any).mockResolvedValue(mockResponse);

    const proxy = createAdkProxy({
      baseUrl: "https://remote-adk.internal",
      headers: async (req) => {
        const token = req.headers.get("Authorization") ?? "";
        return {
          Authorization: `${token} secret-suffix`,
          "x-added-header": "value",
        };
      },
    });

    const request = new Request("http://localhost:3000/api/chat/run_sse", {
      method: "POST",
      headers: {
        Authorization: "Bearer user-token",
      },
      body: JSON.stringify({ sse: true }),
    });

    const response = await proxy.POST(request);
    expect(response.status).toBe(200);

    expect(fetch).toHaveBeenCalledWith(
      "https://remote-adk.internal/run_sse",
      expect.objectContaining({
        method: "POST",
      })
    );

    const fetchArgs = (fetch as any).mock.calls[0][1];
    expect(fetchArgs.headers.get("Authorization")).toBe(
      "Bearer user-token secret-suffix"
    );
    expect(fetchArgs.headers.get("x-added-header")).toBe("value");
  });

  it("should correctly parse and forward URL search parameters", async () => {
    const mockResponse = new Response(JSON.stringify([]), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
    (fetch as any).mockResolvedValue(mockResponse);

    const proxy = createAdkProxy({
      baseUrl: "https://remote-adk.internal",
    });

    const request = new Request(
      "http://localhost:3000/api/chat/apps/my-app/users/123/sessions?limit=10&offset=2",
      {
        method: "GET",
      }
    );

    const response = await proxy.GET(request);
    expect(response.status).toBe(200);

    expect(fetch).toHaveBeenCalledWith(
      "https://remote-adk.internal/apps/my-app/users/123/sessions?limit=10&offset=2",
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("should support custom apiPrefix configuration", async () => {
    const mockResponse = new Response(JSON.stringify({ ok: true }), {
      status: 200,
    });
    (fetch as any).mockResolvedValue(mockResponse);

    const proxy = createAdkProxy({
      baseUrl: "https://remote-adk.internal",
      apiPrefix: "/custom-prefix",
    });

    const request = new Request("http://localhost:3000/custom-prefix/run", {
      method: "POST",
      body: JSON.stringify({ test: true }),
    });

    const response = await proxy.POST(request);
    expect(response.status).toBe(200);

    expect(fetch).toHaveBeenCalledWith(
      "https://remote-adk.internal/run",
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});
