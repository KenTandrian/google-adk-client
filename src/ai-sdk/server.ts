import { createUIMessageStream, createUIMessageStreamResponse } from "ai";

import { generateUUID } from "@/utils";

/**
 * Creates a stream response for UI messages from an SSE stream.
 * This function reads the stream, decodes the text, and writes the messages to the writer.
 * It handles the parsing of JSON data from the SSE format and writes deltas for text messages
 * with start and end markers.
 *
 * @param response - The response from the server containing the SSE stream.
 * @throws Will throw an error if the response body is not available.
 * @returns A stream response that can be used to send messages to the UI.
 * @example
 * const client = new AdkClient(userId);
 * const response = await client.runSse(sessionId, messages);
 * return createAdkAiSdkStream(response);
 */
export function createAdkAiSdkStream(response: Response) {
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
              try {
                const json = JSON.parse(line.substring(6));
                if (json?.partial && json?.content?.parts?.[0].text) {
                  writer.write({
                    type: "text-delta",
                    id: messageId,
                    delta: json.content.parts[0].text,
                  });
                }
              } catch (error) {
                console.error(error);
              }
            }
          }
        }

        writer.write({
          type: "text-end",
          id: messageId,
        });
      },
    }),
  });
}
