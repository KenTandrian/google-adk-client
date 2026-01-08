import { vi } from "vitest";

// Mock the global fetch function
vi.stubGlobal("fetch", vi.fn());

export function createMockResponse<T>(data: T) {
  return {
    ok: true,
    json: () => Promise.resolve(data),
  };
}
