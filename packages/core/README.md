# @effect-line/core

> Type-safe configuration and utilities for LINE Platform integration

## Installation

```bash
pnpm add @effect-line/core
```

## Documentation

### Configuration

This package provides type-safe configuration for LINE Platform APIs through Effect's Config module:

```typescript
import { Effect, Config, Layer } from "effect"
import { LineConfig } from "@effect-line/core/Config"

// Environment variables required:
// - LINE_CHANNEL_ID=your-channel-id
// - LINE_CHANNEL_SECRET=your-channel-secret
// - LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token

const program = Effect.gen(function* () {
  const config = yield* LineConfig.config
  console.log("Channel ID:", config.channelId)
  // Channel Secret and Access Token are redacted for security
})

// Run the program
program.pipe(
  Effect.provide(Layer.setConfigProvider(Config.envProvider())),
  Effect.runPromise
)
```

### Type Safety

The configuration is fully type-safe:

```typescript
// Configuration type with redacted sensitive fields
interface LineConfig {
  readonly channelId: string
  readonly channelSecret: Redacted<string>
  readonly channelAccessToken: Redacted<string>
}
```

## License

MIT - See [LICENSE](./LICENSE) for details
