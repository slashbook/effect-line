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

```typescript
import * as Messaging from "@effect-line/messaging"
import * as Config from "@effect/io/Config"

// Create a message client
const program = Messaging.make({
  channelId: Config.string("LINE_CHANNEL_ID"),
  channelSecret: Config.string("LINE_CHANNEL_SECRET"),
  channelAccessToken: Config.string("LINE_CHANNEL_ACCESS_TOKEN")
})

// Send a message
const sendMessage = Messaging.text("Hello from Effect!")
  .pipe(
    Messaging.send("USER_ID"),
    Effect.provideLayer(program)
  )
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
