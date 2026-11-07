# Google ADK Client Library

A TypeScript client library for the Google ADK (Agent Development Kit).

> Disclaimer: This is an independent community project and is not officially affiliated with Google.

## Features

- **Simple and robust:** A high-level, easy-to-use client library that abstracts away the complexities of the Google ADK agent API.
- **Strongly-typed:** Written in TypeScript to provide strong type safety for all API interactions.
- **Flexible:** Can be used in any TypeScript project, including Next.js, Node.js, and browser-based applications.
- **Seamless AI SDK Integration:** Provides a simple and robust way to connect the Google ADK agent service to the Vercel AI SDK and its ecosystem of UI components.

## Installation

```bash
npm install google-adk-client
```

## Migrating from `@kentandrian/google-adk`

This package was previously published as `@kentandrian/google-adk` (last version: `0.1.8`). Version `0.2.0` includes these breaking changes:

1. **New package name.** Replace `@kentandrian/google-adk` with `google-adk-client` in your dependencies and imports. The subpaths (`/ai-sdk`, `/server`, `/react`) are unchanged.
2. **`run()` and `runSse()` take an object with ADK `Content`.** The root package no longer depends on AI SDK types. Convert AI SDK messages with `uiMessagesToAdkContent()`:

   ```diff
   - const response = await client.runSse("session-123", messages);
   + import { uiMessagesToAdkContent } from "google-adk-client/ai-sdk";
   +
   + const response = await client.runSse({
   +   sessionId: "session-123",
   +   newMessage: uiMessagesToAdkContent(messages),
   + });
   ```

   Without the AI SDK, pass ADK `Content` directly: `newMessage: { role: "user", parts: [{ text: "Hello" }] }`.

3. **`AgentRunSsePayload` is renamed to `RunAgentRequest`**, matching the ADK API server.

## Usage

### `AdkClient`

The core of the library is the `AdkClient` class. It provides methods for all the Google ADK agent API endpoints, organized into logical groups.

```typescript
import { AdkClient } from "google-adk-client";

// The client can be configured with environment variables:
// process.env.ADK_BASE_URL = "https://my-adk-agent.example.com";
// process.env.ADK_APP_NAME = "my-app-name";

const client = new AdkClient({
  userId: "user-123",
});

// Access API groups
const sessions = await client.sessions.list();
const artifacts = await client.artifacts.listNames("session-456");
```

### Vercel AI SDK Connectors

The library provides two connectors for the Vercel AI SDK:

#### 1. Server-Side Connector

This connector is a function that simplifies handling streaming responses in Next.js API routes.

```typescript
// src/app/api/chat/route.ts
import { AdkClient } from "google-adk-client";
import {
  createAdkAiSdkStream,
  uiMessagesToAdkContent,
} from "google-adk-client/ai-sdk";

import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const client = new AdkClient({
    baseUrl: "https://my-adk-agent.example.com",
    appName: "my-app-name",
    userId: session.user.id,
  });

  const adkResponse = await client.runSse({
    sessionId: "session-123",
    newMessage: uiMessagesToAdkContent(messages),
  });
  return createAdkAiSdkStream(adkResponse);
}
```

#### 2. Client-Side Connector (`AdkChatTransport`)

This connector is a class that extends the `HttpChatTransport` from the `ai` package. It allows the `useChat` hook to communicate directly with the Google ADK agent from the client-side.

```typescript
// Example usage in a React component
import { useChat } from "@ai-sdk/react";
import { AdkClient } from "google-adk-client";
import { AdkChatTransport } from "google-adk-client/ai-sdk";

const client = new AdkClient({
  baseUrl: "https://my-adk-agent.example.com",
  appName: "my-app-name",
  userId: "user-123",
});

const transport = new AdkChatTransport(client);

function MyChatComponent() {
  const { messages, sendMessage } = useChat({
    transport,
  });

  // ... render the chat UI
}
```

### Full-Stack & Remote Agent Developer Toolkit

#### 1. Secure Proxy Route Creator (`google-adk-client/server`)

Prevent browser credential leakage by proxying requests securely through your Next.js App Router API route handler:

```typescript
// app/api/chat/[[...path]]/route.ts
import { createAdkProxy } from "google-adk-client/server";

export const { GET, POST, PUT, DELETE } = createAdkProxy({
  baseUrl: process.env.ADK_URL, // Remote ADK service URL kept secure on the server
  apiPrefix: "/api/chat", // Prefix path to strip (defaults to "/api/chat")
  headers: async (req) => ({
    Authorization: `Bearer ${process.env.INTERNAL_ADK_SECRET}`, // Optional auth injection
  }),
});
```

> [!WARNING]
> The proxy forwards request paths and bodies as-is, including the `userId` chosen by the browser. Authenticate requests and validate the `userId` before forwarding them, or users may access other users' sessions.

#### 2. High-Level React Integration Hook (`google-adk-client/react`)

Quickly connect `@assistant-ui/react` to your local proxy route with less than 10 lines of boilerplate code:

```tsx
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useAdkAssistant } from "google-adk-client/react";

export function MyAssistantComponent() {
  const { runtime } = useAdkAssistant({
    api: "/api/chat", // Local proxy endpoint
    appName: "my-agent-app",
    userId: "user-123",
    enableDefaultAttachments: true, // Pre-wires composite image and text attachment adapters
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <MyCustomChatLayout />
    </AssistantRuntimeProvider>
  );
}
```

## Development

To get started with development, clone the repository and install the dependencies:

```bash
git clone https://github.com/KenTandrian/google-adk-client.git
cd google-adk-client
pnpm install
```

### Testing

To run the tests, use the following command:

```bash
pnpm test
```
