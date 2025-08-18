import { describe, expect, it } from "vitest";

import { AdkClient } from "..";
import { createMockResponse } from "../test-setup";

describe("AdkClient evals", () => {
  const client = new AdkClient({
    appName: "test-app",
    baseUrl: "https://example.com",
    userId: "user-123",
  });

  it("should call the correct endpoint for evals.listEvalSets", async () => {
    const mockResponse = createMockResponse([]);
    (fetch as any).mockResolvedValue(mockResponse);

    await client.evals.listEvalSets();

    expect(fetch).toHaveBeenCalledWith(
      "https://example.com/apps/test-app/eval_sets",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    );
  });
});
