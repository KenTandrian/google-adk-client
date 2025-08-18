import { describe, expect, it } from "vitest";
import { AdkClient } from ".";

describe("AdkClient", () => {
  it("should be defined", () => {
    expect(AdkClient).toBeDefined();
  });

  it("should throw an error if appName is not provided", () => {
    expect(
      () =>
        new AdkClient({
          baseUrl: "https://example.com",
          userId: "user-123",
        })
    ).toThrow(
      "App name is required. Provide it in the constructor or set the ADK_APP_NAME environment variable."
    );
  });

  it("should throw an error if baseUrl is not provided", () => {
    expect(
      () =>
        new AdkClient({
          appName: "my-app",
          userId: "user-123",
        })
    ).toThrow(
      "Base URL is required. Provide it in the constructor or set the ADK_BASE_URL environment variable."
    );
  });
});
