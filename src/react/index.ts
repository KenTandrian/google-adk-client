import {
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
} from "@assistant-ui/react";
import {
  createAdkSessionAdapter,
  createAdkStream,
  useAdkRuntime,
} from "@assistant-ui/react-google-adk";
import { useMemo } from "react";

export interface UseAdkAssistantOptions {
  /**
   * The API path of the secure local proxy (e.g., "/api/chat").
   */
  api: string;

  /**
   * The application name.
   */
  appName: string;

  /**
   * The user ID.
   */
  userId: string;

  /**
   * Automatically pre-wires default image and plain text attachment adapters.
   * @default true
   */
  enableDefaultAttachments?: boolean;

  /**
   * Optional overrides or additions for the underlying useAdkRuntime call.
   */
  runtimeOptions?: Omit<
    Parameters<typeof useAdkRuntime>[0],
    "load" | "sessionAdapter" | "stream"
  >;
}

/**
 * A high-level React integration hook that wraps `@assistant-ui/react` and
 * `@assistant-ui/react-google-adk` configurations.
 * It encapsulates the session adapter, stream setup, attachment adapters, and historical message loader.
 *
 * @example
 * ```tsx
 * import { useAdkAssistant } from "@kentandrian/google-adk/react";
 * import { AssistantRuntimeProvider } from "@assistant-ui/react";
 *
 * export function Assistant() {
 *   const { runtime } = useAdkAssistant({
 *     api: "/api/chat",
 *     appName: "genmedia-agent-app",
 *     userId: "new-test-123",
 *     enableDefaultAttachments: true,
 *   });
 *
 *   return (
 *     <AssistantRuntimeProvider runtime={runtime}>
 *       <MyCustomChatLayout />
 *     </AssistantRuntimeProvider>
 *   );
 * }
 * ```
 */
export function useAdkAssistant({
  api,
  appName,
  userId,
  enableDefaultAttachments = true,
  runtimeOptions = {},
}: UseAdkAssistantOptions) {
  // Create the ADK session adapter memoized
  const { adapter: sessionAdapter, load } = useMemo(() => {
    return createAdkSessionAdapter({
      apiUrl: api,
      appName,
      userId,
    });
  }, [api, appName, userId]);

  // Create the ADK stream memoized
  const stream = useMemo(() => {
    return createAdkStream({
      api,
      appName,
      userId,
    });
  }, [api, appName, userId]);

  // Combine default attachment adapters with any custom adapters
  const adapters = useMemo(() => {
    const defaultAdapters = enableDefaultAttachments
      ? {
          attachments: new CompositeAttachmentAdapter([
            new SimpleImageAttachmentAdapter(),
            new SimpleTextAttachmentAdapter(),
          ]),
        }
      : {};

    return {
      ...defaultAdapters,
      ...runtimeOptions.adapters,
    };
  }, [enableDefaultAttachments, runtimeOptions.adapters]);

  // Initialize the runtime using useAdkRuntime
  const runtime = useAdkRuntime({
    ...runtimeOptions,
    adapters,
    load,
    sessionAdapter,
    stream,
  });

  return {
    runtime,
    sessionAdapter,
    load,
    stream,
  };
}
