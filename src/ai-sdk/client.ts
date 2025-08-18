import {
  type ChatRequestOptions,
  HttpChatTransport,
  type UIMessage,
  type UIMessageChunk,
} from "ai";

import { generateUUID } from "@/utils";
import type { AdkClient } from "..";

/**
 * A transport class for handling chat messages in the ADK client.
 * This class extends HttpChatTransport to provide methods for sending messages
 * and processing response streams.
 */
export class AdkChatTransport extends HttpChatTransport<UIMessage> {
  private adk: AdkClient;

  constructor(adk: AdkClient) {
    super({});
    this.adk = adk;
  }

  processResponseStream(
    stream: ReadableStream<Uint8Array>
  ): ReadableStream<UIMessageChunk> {
    const messageId = generateUUID();

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const decoder = new TextDecoder();
        const text = decoder.decode(chunk);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.substring(6));
              if (json?.partial && json?.content?.parts?.[0].text) {
                const chunk: UIMessageChunk = {
                  type: "text-delta",
                  id: messageId,
                  delta: json.content.parts[0].text,
                };
                controller.enqueue(chunk);
              }
            } catch (error) {
              console.error(error);
            }
          }
        }
      },
    });

    return stream.pipeThrough(transformStream);
  }

  async sendMessages({
    messages,
    chatId,
    sessionId,
  }: {
    messages: UIMessage[];
    chatId: string;
    sessionId?: string;
  } & ChatRequestOptions): Promise<ReadableStream<UIMessageChunk>> {
    const resolvedSessionId = sessionId ?? chatId;

    if (!resolvedSessionId) {
      throw new Error("Session ID or Chat ID is required");
    }

    const response = await this.adk.runSse(resolvedSessionId, messages);

    if (!response.body) {
      throw new Error("No response body from ADK agent");
    }

    return this.processResponseStream(response.body);
  }
}
