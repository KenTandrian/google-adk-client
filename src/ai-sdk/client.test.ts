import type { UIMessageChunk } from "ai";
import { describe, expect, it } from "vitest";

import { AdkClient } from "..";
import { AdkChatTransport } from "./client";

function streamOf(chunks: Uint8Array[]): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
}

async function collect(
  stream: ReadableStream<UIMessageChunk>
): Promise<UIMessageChunk[]> {
  const chunks: UIMessageChunk[] = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) return chunks;
    chunks.push(value);
  }
}

function sseLine(text: string, partial = true): string {
  return `data: ${JSON.stringify({ partial, content: { parts: [{ text }] } })}\n\n`;
}

const transport = new AdkChatTransport(
  new AdkClient({
    appName: "my-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  })
);

describe("AdkChatTransport.processResponseStream", () => {
  it("wraps text deltas in text-start and text-end", async () => {
    const encoder = new TextEncoder();
    const chunks = await collect(
      transport.processResponseStream(
        streamOf([encoder.encode(sseLine("Hello") + sseLine(" world"))])
      )
    );

    const id = (chunks[0] as { id: string }).id;
    expect(chunks).toEqual([
      { type: "text-start", id },
      { type: "text-delta", id, delta: "Hello" },
      { type: "text-delta", id, delta: " world" },
      { type: "text-end", id },
    ]);
  });

  it("reassembles SSE lines split across chunks", async () => {
    const bytes = new TextEncoder().encode(sseLine("Hello") + sseLine("there"));
    const chunks = await collect(
      transport.processResponseStream(
        streamOf([bytes.slice(0, 20), bytes.slice(20, 60), bytes.slice(60)])
      )
    );

    expect(
      chunks.flatMap((c) => (c.type === "text-delta" ? [c.delta] : []))
    ).toEqual(["Hello", "there"]);
  });

  it("decodes multi-byte characters split across chunks", async () => {
    const bytes = new TextEncoder().encode(sseLine("héllo 👋"));
    const splitAt = bytes.indexOf(0xf0) + 2;
    const chunks = await collect(
      transport.processResponseStream(
        streamOf([bytes.slice(0, splitAt), bytes.slice(splitAt)])
      )
    );

    expect(chunks.find((c) => c.type === "text-delta")).toMatchObject({
      delta: "héllo 👋",
    });
  });

  it("handles a final line without a trailing newline", async () => {
    const chunks = await collect(
      transport.processResponseStream(
        streamOf([new TextEncoder().encode(sseLine("end").trimEnd())])
      )
    );

    expect(chunks.map((c) => c.type)).toEqual([
      "text-start",
      "text-delta",
      "text-end",
    ]);
  });

  it("emits nothing when there are no partial text events", async () => {
    const chunks = await collect(
      transport.processResponseStream(
        streamOf([new TextEncoder().encode(sseLine("final", false))])
      )
    );

    expect(chunks).toEqual([]);
  });
});
