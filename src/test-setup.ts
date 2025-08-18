import { vi } from "vitest";

// Mock the global fetch function
vi.stubGlobal("fetch", vi.fn());

export function createMockResponse(data: any) {
  return {
    ok: true,
    json: () => new Promise((resolve) => resolve(data)),
  };
}
