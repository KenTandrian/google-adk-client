import { describe, expect, it, vi } from "vitest";
import { useAdkAssistant } from "./index";

// Mock React
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useMemo: (fn: () => any) => fn(),
  };
});

// Define top-level spy prefixed with "mock" so it can be accessed inside vi.mock factory
const mockCompositeSpy = vi.fn();

// Mock Assistant UI
vi.mock("@assistant-ui/react", () => {
  class MockCompositeAttachmentAdapter {
    adapters: any;
    constructor(adapters: any) {
      this.adapters = adapters;
      mockCompositeSpy(adapters);
    }
  }

  class MockSimpleImageAttachmentAdapter {}
  class MockSimpleTextAttachmentAdapter {}

  return {
    CompositeAttachmentAdapter: MockCompositeAttachmentAdapter,
    SimpleImageAttachmentAdapter: MockSimpleImageAttachmentAdapter,
    SimpleTextAttachmentAdapter: MockSimpleTextAttachmentAdapter,
  };
});

vi.mock("@assistant-ui/react-google-adk", () => {
  const mockLoad = vi.fn();
  const mockSessionAdapter = { id: "session-adapter-123" };
  const mockStream = { id: "stream-123" };
  const mockRuntime = { id: "runtime-123" };

  return {
    createAdkSessionAdapter: vi.fn().mockReturnValue({
      adapter: mockSessionAdapter,
      load: mockLoad,
    }),
    createAdkStream: vi.fn().mockReturnValue(mockStream),
    useAdkRuntime: vi.fn().mockReturnValue(mockRuntime),
  };
});

import {
  createAdkSessionAdapter,
  createAdkStream,
  useAdkRuntime,
} from "@assistant-ui/react-google-adk";

describe("useAdkAssistant", () => {
  it("should pre-wire and return the runtime with correct configurations", () => {
    mockCompositeSpy.mockClear();

    const result = useAdkAssistant({
      api: "/api/chat-endpoint",
      appName: "my-rich-agent",
      userId: "user-987",
      enableDefaultAttachments: true,
    });

    expect(createAdkSessionAdapter).toHaveBeenCalledWith({
      apiUrl: "/api/chat-endpoint",
      appName: "my-rich-agent",
      userId: "user-987",
    });

    expect(createAdkStream).toHaveBeenCalledWith({
      api: "/api/chat-endpoint",
      appName: "my-rich-agent",
      userId: "user-987",
    });

    expect(mockCompositeSpy).toHaveBeenCalled();

    expect(useAdkRuntime).toHaveBeenCalledWith(
      expect.objectContaining({
        load: expect.any(Function),
        sessionAdapter: expect.objectContaining({ id: "session-adapter-123" }),
        stream: expect.objectContaining({ id: "stream-123" }),
        adapters: expect.objectContaining({
          attachments: expect.any(Object),
        }),
      })
    );

    expect(result.runtime).toEqual({ id: "runtime-123" });
    expect(result.sessionAdapter).toEqual({ id: "session-adapter-123" });
    expect(result.load).toBeInstanceOf(Function);
    expect(result.stream).toEqual({ id: "stream-123" });
  });

  it("should skip default attachments if enableDefaultAttachments is false", () => {
    vi.clearAllMocks();
    mockCompositeSpy.mockClear();

    useAdkAssistant({
      api: "/api/chat-endpoint",
      appName: "my-rich-agent",
      userId: "user-987",
      enableDefaultAttachments: false,
    });

    expect(mockCompositeSpy).not.toHaveBeenCalled();

    expect(useAdkRuntime).toHaveBeenCalledWith(
      expect.objectContaining({
        adapters: {},
      })
    );
  });
});
