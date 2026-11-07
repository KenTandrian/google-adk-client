import type { UIMessage } from "ai";

import type { Content, Part } from "../types";

/**
 * Converts the latest AI SDK `UIMessage` into the ADK `Content` expected by
 * `AdkClient.run()` / `AdkClient.runSse()`.
 *
 * ADK sessions keep the conversation history on the server, so only the last
 * message is sent. Text parts become `text` parts, data-URL files become
 * `inlineData` parts, and other file URLs become `fileData` parts. Part types
 * with no ADK equivalent (reasoning, tool calls, sources, etc.) are skipped.
 *
 * @param messages The AI SDK messages, typically from `useChat`.
 * @throws If `messages` is empty or the last message has no convertible parts.
 */
export function uiMessagesToAdkContent(messages: UIMessage[]): Content {
  const lastMessage = messages[messages.length - 1];

  if (!lastMessage) {
    throw new Error("At least one message is required");
  }

  const parts: Part[] = [];

  for (const part of lastMessage.parts) {
    switch (part.type) {
      case "text":
        parts.push({ text: part.text });
        break;
      case "file": {
        if (part.url.startsWith("data:")) {
          parts.push({
            inlineData: {
              data: part.url.slice(part.url.indexOf(",") + 1),
              displayName: part.filename ?? "file",
              mimeType: part.mediaType,
            },
          });
        } else {
          parts.push({
            fileData: {
              displayName: part.filename ?? "file",
              fileUri: part.url,
              mimeType: part.mediaType,
            },
          });
        }
        break;
      }
      default:
        break;
    }
  }

  if (parts.length === 0) {
    throw new Error("The last message has no parts that can be sent to ADK");
  }

  return {
    parts,
    role: lastMessage.role === "assistant" ? "model" : "user",
  };
}
