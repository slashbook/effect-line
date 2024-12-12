# @effect-line/messaging-api

> Effect-based wrapper for LINE Messaging API with automatic error handling and retries

## Features

- Type-safe LINE Messaging API integration
- Automatic error handling and retries
- Effect-based API for better composability
- Full TypeScript support
- Modern ES modules

## Installation

```bash
pnpm add @effect-line/messaging-api
```

## Usage

### Configuration

First, set up your LINE API credentials as environment variables:

```bash
export LINE_CHANNEL_ID=your_channel_id
export LINE_CHANNEL_SECRET=your_channel_secret
export LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
```

### Push Message

Send a message to a single user:

```typescript
import { Effect } from "effect"
import { NodeRuntime } from "@effect/platform-node"
import { MessagingApi } from "@effect-line/messaging-api"

const program = Effect.gen(function* () {
  const api = yield* MessagingApi

  // Send a text message
  const result = yield* api.pushMessage({
    to: "USER_ID",
    messages: [
      {
        type: "text",
        text: "Hello, world!"
      }
    ]
  })

  return result
})

// Run with automatic error handling
NodeRuntime.runMain(
  program.pipe(
    Effect.provide(MessagingApi.Default)
  )
)
```

### Multicast Message

Send messages to multiple users:

```typescript
const multicastProgram = Effect.gen(function* () {
  const api = yield* MessagingApi

  // Send to multiple users
  yield* api.multicast({
    to: ["USER_ID_1", "USER_ID_2"],
    messages: [
      {
        type: "text",
        text: "Hello, everyone!"
      }
    ]
  })
})
```

### Error Handling

The API automatically handles common errors and implements retry policies:

```typescript
import { Effect, Console } from "effect"

const programWithErrorHandling = program.pipe(
  Effect.catchTag("RateLimitError", (error) => 
    Console.log("Rate limit exceeded:", error)
  ),
  Effect.catchTag("InvalidTokenError", (error) => 
    Console.error("Invalid token:", error)
  )
)
```

### Using Custom Channel Access Token

If you need to use a different channel access token than the one specified in environment variables, you can create a custom layer:

```typescript
import { MessagingApi } from "@effect-line/messaging-api"

// Create a layer with custom access token
const customBot = MessagingApi.layer("your-custom-access-token")

const program = Effect.gen(function*() {
  const api = yield* MessagingApi
  
  yield* api.pushMessage({
    to: "USER_ID",
    messages: [{ type: "text", text: "Hello from custom bot!" }]
  })
})

// Use the custom bot layer
program.pipe(
  Effect.provide(customBot),
  Effect.runPromise
)
```

### Using Multiple Bots

You can create multiple layers for different bots and use them in your program:

```typescript
import { MessagingApi } from "@effect-line/messaging-api"

// Create layers for different bots
const bot1 = MessagingApi.layer("bot1-access-token")
const bot2 = MessagingApi.layer("bot2-access-token")

// Use bot1
const program1 = Effect.gen(function*() {
  const api = yield* MessagingApi
  yield* api.pushMessage({
    to: "USER_ID",
    messages: [{ type: "text", text: "Hello from Bot 1!" }]
  })
}).pipe(
  Effect.provide(bot1),
  Effect.runPromise
)

// Use bot2
const program2 = Effect.gen(function*() {
  const api = yield* MessagingApi
  yield* api.pushMessage({
    to: "USER_ID",
    messages: [{ type: "text", text: "Hello from Bot 2!" }]
  })
}).pipe(
  Effect.provide(bot2),
  Effect.runPromise
)
```

## API Reference

### MessagingApi

The main service interface:

```typescript
interface MessagingApi {
  readonly pushMessage: (params: PushMessageParams) => Effect<never, ApiError, PushMessageResult>
  readonly multicast: (params: MulticastParams) => Effect<never, ApiError, MulticastResult>
  // ... more methods
}
```

### Error Types

Common error types that may occur:

- `ApiError` - Base error type
- `RateLimitError` - When API rate limit is exceeded
- `InvalidTokenError` - When access token is invalid
- `NetworkError` - For connection issues
- `ValidationError` - For invalid parameters

## CLI Integration

This package is used by `@effect-line/cli` to provide command-line interface for LINE operations. See the CLI package for more details.

## License

MIT License - see the [LICENSE](LICENSE) file for details
