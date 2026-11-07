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

  it("converts remote file URLs to fileData", () => {
    const content = uiMessagesToAdkContent([
      userMessage([
        {
          type: "file",
          mediaType: "application/pdf",
          url: "gs://bucket/doc.pdf",
        },
      ]),
    ]);

    expect(content.parts).toEqual([
      {
        fileData: {
          displayName: "file",
          fileUri: "gs://bucket/doc.pdf",
          mimeType: "application/pdf",
        },
      },
    ]);
  });

  it("maps the assistant role to model", () => {
    const content = uiMessagesToAdkContent([
      { id: "m1", role: "assistant", parts: [{ type: "text", text: "hi" }] },
    ]);

    expect(content.role).toBe("model");
  });

  it("maps non-assistant roles to user", () => {
    const content = uiMessagesToAdkContent([
      { id: "m1", role: "system", parts: [{ type: "text", text: "hi" }] },
    ]);

    expect(content.role).toBe("user");
  });

  it("skips parts with no ADK equivalent instead of sending empty parts", () => {
    const content = uiMessagesToAdkContent([
      userMessage([{ type: "step-start" }, { type: "text", text: "hello" }]),
    ]);

    expect(content.parts).toEqual([{ text: "hello" }]);
  });

  it("throws when no parts can be converted", () => {
    expect(() =>
      uiMessagesToAdkContent([userMessage([{ type: "step-start" }])])
    ).toThrow("The last message has no parts that can be sent to ADK");
  });

  it("throws on an empty message list", () => {
    expect(() => uiMessagesToAdkContent([])).toThrow(
      "At least one message is required"
    );
  });
});
