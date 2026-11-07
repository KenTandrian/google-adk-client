import type { UIMessage } from "ai";

import type { Content } from "../types";

/**
 * Converts the latest AI SDK `UIMessage` into the ADK `Content` expected by
 * `AdkClient.run()` / `AdkClient.runSse()`.
 *
 * ADK sessions keep the conversation history on the server, so only the last
 * message is sent.
 *
 * @param messages The AI SDK messages, typically from `useChat`.
 */
export function uiMessagesToAdkContent(messages: UIMessage[]): Content {
  const lastMessage = messages[messages.length - 1];

  const parts = lastMessage.parts.map((part) => {
    switch (part.type) {
      case "text":
        return { text: part.text };
      case "file": {
        const [_, base64Data] = part.url.split(",");
        return {
          inlineData: {
            data: base64Data,
            displayName: part.filename ?? "file",
            mimeType: part.mediaType,
          },
        };
      }
      default:
        return {};
    }
  });

  return {
    parts,
    role: lastMessage.role,
  };
}
