# Google ADK Client Library

A TypeScript client library for the Google ADK (Agent Development Kit).

## Features

- **Simple and robust:** A high-level, easy-to-use client library that abstracts away the complexities of the Google ADK agent API.
- **Strongly-typed:** Written in TypeScript to provide strong type safety for all API interactions.
- **Flexible:** Can be used in any TypeScript project, including Next.js, Node.js, and browser-based applications.
- **Seamless AI SDK Integration:** Provides a simple and robust way to connect the Google ADK agent service to the Vercel AI SDK and its ecosystem of UI components.

## Installation

```bash
npm install @google-adk/client
```

## Usage

### `AdkClient`

The core of the library is the `AdkClient` class. It provides methods for all the Google ADK agent API endpoints.

```typescript
import { AdkClient } from "@google-adk/client";

const client = new AdkClient({
  baseUrl: "https://my-adk-agent.example.com",
  auth: {
    userId: "user-123",
  },
});

const session = await client.getSession("my-session-id");
```

### Vercel AI SDK Connectors

The library provides two connectors for the Vercel AI SDK:

#### 1. Server-Side Connector

This connector is a function that simplifies handling streaming responses in Next.js API routes.

```typescript
// src/app/api/chat/route.ts
import { AdkClient } from "@google-adk/client";
import { createAdkAiSdkStream } from "@google-adk/client/ai-sdk/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const client = new AdkClient({ userId: session.user.id });
  const adkResponse = await client.runSse({ messages });
  return createAdkAiSdkStream(adkResponse);
}
```

#### 2. Client-Side Connector (`ChatTransport`)

This connector is a class that implements the `ChatTransport` interface from the `ai/react` package. It allows the `useChat` hook to communicate directly with the Google ADK agent from the client-side.

```typescript
// Example usage in a React component
import { useChat } from "@ai-sdk/react";
import { AdkClient } from "@google-adk/client";
import { AdkChatTransport } from "@google-adk/client/ai-sdk/client";

const client = new AdkClient({
  baseUrl: "https://my-adk-agent.example.com",
  auth: {
    userId: "user-123",
  },
});

const transport = new AdkChatTransport(client);

function MyChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    transport,
  });

  // ... render the chat UI
}
```

## Development

To get started with development, clone the repository and install the dependencies:

```bash
git clone https://github.com/KenTandrian/google-adk-client.git
cd google-adk-client
npm install
```

### Testing

To run the tests, use the following command:

```bash
npm test
```
