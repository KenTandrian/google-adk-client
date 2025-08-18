# Google ADK Client Library

A TypeScript client library for the Google ADK (Agent Development Kit).

## Features

- **Simple and robust:** A high-level, easy-to-use client library that abstracts away the complexities of the Google ADK agent API.
- **Strongly-typed:** Written in TypeScript to provide strong type safety for all API interactions.
- **Flexible:** Can be used in any TypeScript project, including Next.js, Node.js, and browser-based applications.
- **Seamless AI SDK Integration:** Provides a simple and robust way to connect the Google ADK agent service to the Vercel AI SDK and its ecosystem of UI components.

## Installation

```bash
npm install @kentandrian/google-adk
```

## Usage

### `AdkClient`

The core of the library is the `AdkClient` class. It provides methods for all the Google ADK agent API endpoints, organized into logical groups.

```typescript
import { AdkClient } from "@kentandrian/google-adk";

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
import { AdkClient } from "@kentandrian/google-adk";
import { createAdkAiSdkStream } from "@kentandrian/google-adk/ai-sdk";
import { auth } from "lib/auth";

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

  const adkResponse = await client.runSse("session-123", messages);
  return createAdkAiSdkStream(adkResponse);
}
```

#### 2. Client-Side Connector (`AdkChatTransport`)

This connector is a class that extends the `HttpChatTransport` from the `ai` package. It allows the `useChat` hook to communicate directly with the Google ADK agent from the client-side.

```typescript
// Example usage in a React component
import { useChat } from "@ai-sdk/react";
import { AdkClient } from "@kentandrian/google-adk";
import { AdkChatTransport } from "@kentandrian/google-adk/ai-sdk";

const client = new AdkClient({
  baseUrl: "https://my-adk-agent.example.com",
  appName: "my-app-name",
  userId: "user-123",
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
pnpm install
```

### Testing

To run the tests, use the following command:

```bash
pnpm test
```
