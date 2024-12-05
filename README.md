# @effect-line

A collection of Effect-based libraries for working with LINE Platform APIs. This project wraps LINE SDK functionalities in the Effect type, making them more ergonomic to use within the [Effect](https://www.effect.website) ecosystem.

## Features

- Type-safe LINE API integrations
- Effect-based error handling and dependency injection
- First-class TypeScript support
- Modern ES modules

## Packages

- `@effect-line/types` - Shared TypeScript types and interfaces
- `@effect-line/messaging` - LINE Messaging API integration
- `@effect-line/pay` - LINE Pay API integration (coming soon)
- `@effect-line/notify` - LINE Notify API integration (coming soon)

## Getting Started

```bash
# Install messaging package
pnpm add @effect-line/messaging

# Install pay package (coming soon)
pnpm add @effect-line/pay
```

## Development

This project uses:

- `pnpm` for package management
- `tsup` for bundling
- `vitest` for testing

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Configuration Usage

```typescript
import { Redacted } from "effect"
import { MessagingApi } from "@effect-line/messaging-api"
import { config } from "@effect-line/config"
import * as Effect from "effect"

// Create a program that uses the configuration
const program = Effect.gen(function* ($) {
  // Get config values
  const lineConfig = yield* $(Effect.config(config))

  // Create MessagingApi layer with config
  const layer = MessagingApi.live(Redacted.value(lineConfig.channelAccessToken))

  // Use the MessagingApi
  const api = yield* $(MessagingApi)
  const response = yield* $(
    api.pushMessage({
      to: "userId",
      messages: [
        {
          type: "text",
          text: "Hello, world!"
        }
      ]
    })
  )

  return response
}).pipe(Effect.provide(layer))
```

Your `.env` file should look like:

```makefile
LINE_CHANNEL_ID=your-channel-id
LINE_CHANNEL_SECRET=your-channel-secret
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
```
