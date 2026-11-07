import type { UIMessage } from "ai";
import { describe, expect, it } from "vitest";

import { uiMessagesToAdkContent } from "./messages";

function userMessage(parts: UIMessage["parts"]): UIMessage {
  return { id: "m1", role: "user", parts };
}

describe("uiMessagesToAdkContent", () => {
  it("converts only the last message", () => {
    const messages: UIMessage[] = [
      userMessage([{ type: "text", text: "first" }]),
      {
        id: "m2",
        role: "assistant",
        parts: [{ type: "text", text: "reply" }],
      },
      userMessage([{ type: "text", text: "second" }]),
    ];

    expect(uiMessagesToAdkContent(messages)).toEqual({
      role: "user",
      parts: [{ text: "second" }],
    });
  });

  it("converts data-URL files to inlineData", () => {
    const content = uiMessagesToAdkContent([
      userMessage([
        {
          type: "file",
          mediaType: "image/png",
          filename: "cat.png",
          url: "data:image/png;base64,aGVsbG8=",
        },
      ]),
    ]);

    expect(content.parts).toEqual([
      {
        inlineData: {
          data: "aGVsbG8=",
          displayName: "cat.png",
          mimeType: "image/png",
        },
      },
    ]);
  });
});
