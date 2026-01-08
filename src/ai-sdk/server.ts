import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  type UIMessageStreamWriter,
} from "ai";

import { generateUUID } from "../utils";

/**
 * Parses a JSON text line from an SSE stream and writes text deltas to the provided writer.
 * @param messageId - The message ID associated with the text deltas.
 * @param jsonText - The JSON text line to parse.
 * @param writer - The UIMessageStreamWriter to write the text deltas to.
 */
function handleDataLine(
  jsonText: string,
  messageId: string,
  writer: UIMessageStreamWriter
) {
  try {
    const json = JSON.parse(jsonText);
    if (json?.partial && json?.content?.parts?.[0].text) {
      writer.write({
        delta: json.content.parts[0].text,
        id: messageId,
        type: "text-delta",
      });
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Creates a stream response for UI messages from an SSE stream.
 * This function reads the stream, decodes the text, and writes the messages to the writer.
 * It handles the parsing of JSON data from the SSE format and writes deltas for text messages
 * with start and end markers.
 *
 * @param response - The response from the server containing the SSE stream.
 * @param options - Optional parameters to customize the stream creation.
 * @throws Will throw an error if the response body is not available.
 * @returns A stream response that can be used to send messages to the UI.
 * @example
 * const client = new AdkClient(userId);
 * const response = await client.runSse(sessionId, messages);
 * return createAdkAiSdkStream(response);
 */
export function createAdkAiSdkStream(
  response: Response,
  options: {
    createUIMessageStream?: Omit<
      Parameters<typeof createUIMessageStream>[0],
      "execute" | "generateId"
    >;
    createUIMessageStreamResponse?: Omit<
      Parameters<typeof createUIMessageStreamResponse>[0],
      "stream"
    >;
  } = {}
) {
  if (!response.body) {
    throw new Error("No response body");
  }

  const sseStream = response.body;

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      async execute({ writer }) {
        const reader = sseStream.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const messageId = generateUUID();

        writer.write({
          type: "text-start",
          id: messageId,
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              handleDataLine(line.substring(6), messageId, writer);
            }
          }
        }

        writer.write({
          type: "text-end",
          id: messageId,
        });
      },
      generateId: generateUUID,
      ...options.createUIMessageStream,
    }),
    ...options.createUIMessageStreamResponse,
  });
}
