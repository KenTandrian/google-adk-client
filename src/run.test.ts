import { beforeEach, describe, expect, it } from "vitest";

import { AdkClient } from ".";
import { createMockResponse } from "./test-setup";

describe("AdkClient run methods", () => {
  const client = new AdkClient({
    appName: "my-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  const newMessage = {
    role: "user",
    parts: [
      { text: "Describe this" },
      { inlineData: { data: "aGk=", mimeType: "image/png" } },
    ],
  };

  beforeEach(() => {
    (fetch as any).mockReset();
    (fetch as any).mockResolvedValue(createMockResponse([]));
  });

  function lastRequest() {
    const [url, init] = (fetch as any).mock.calls.at(-1);
    return { url, init, body: JSON.parse(init.body) };
  }

  it("runSse posts the run payload to /run_sse", async () => {
    await client.runSse({ sessionId: "session-1", newMessage });

    const { url, init, body } = lastRequest();
    expect(url).toBe("https://example.com/run_sse");
    expect(init.method).toBe("POST");
    expect(init.headers.accept).toBe("text/event-stream");
    expect(body).toEqual({
      appName: "my-app",
      userId: "user-123",
      sessionId: "session-1",
      newMessage,
      streaming: true,
    });
  });

  it("run posts the run payload to /run with streaming disabled", async () => {
    await client.run({ sessionId: "session-1", newMessage });

    const { url, init, body } = lastRequest();
    expect(url).toBe("https://example.com/run");
    expect(init.method).toBe("POST");
    expect(body).toEqual({
      appName: "my-app",
      userId: "user-123",
      sessionId: "session-1",
      newMessage,
      streaming: false,
    });
  });
});
