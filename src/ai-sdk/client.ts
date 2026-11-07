import {
  type ChatRequestOptions,
  HttpChatTransport,
  type UIMessage,
  type UIMessageChunk,
} from "ai";

import type { AdkClient } from "..";
import { generateUUID } from "../utils";
import { uiMessagesToAdkContent } from "./messages";

/**
 * A transport class for handling chat messages in the ADK client.
 * This class extends HttpChatTransport to provide methods for sending messages
 * and processing response streams.
 */
export class AdkChatTransport extends HttpChatTransport<UIMessage> {
  private readonly adk: AdkClient;

  constructor(adk: AdkClient) {
    super({});
    this.adk = adk;
  }

  processResponseStream(
    stream: ReadableStream<Uint8Array>
  ): ReadableStream<UIMessageChunk> {
    const messageId = generateUUID();
    const decoder = new TextDecoder();
    let buffer = "";
    let started = false;

    const handleLine = (
      line: string,
      controller: TransformStreamDefaultController<UIMessageChunk>
    ) => {
      if (!line.startsWith("data: ")) {
        return;
      }
      try {
        const json = JSON.parse(line.substring(6));
        if (json?.partial && json?.content?.parts?.[0].text) {
          if (!started) {
            controller.enqueue({ type: "text-start", id: messageId });
            started = true;
          }
          controller.enqueue({
            type: "text-delta",
            id: messageId,
            delta: json.content.parts[0].text,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const transformStream = new TransformStream<Uint8Array, UIMessageChunk>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          handleLine(line, controller);
        }
      },
      flush(controller) {
        buffer += decoder.decode();
        if (buffer) {
          handleLine(buffer, controller);
        }
        if (started) {
          controller.enqueue({ type: "text-end", id: messageId });
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

    const response = await this.adk.runSse({
      sessionId: resolvedSessionId,
      newMessage: uiMessagesToAdkContent(messages),
    });

    if (!response.body) {
      throw new Error("No response body from ADK agent");
    }

    return this.processResponseStream(response.body);
  }
}
