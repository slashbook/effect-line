# @effect-line/core

> Core utilities and configurations for LINE Platform integration with Effect

## Features

- Type-safe configuration management
- Secure handling of sensitive credentials
- Shared utilities and helpers
- Effect-based error handling

## Installation

```bash
pnpm add @effect-line/core
```

## Usage

### Configuration

The package provides type-safe configuration management through Effect's Config module:

```typescript
import { Effect, Config } from "effect"
import { LineConfig } from "@effect-line/core"

// Set up environment variables:
// LINE_CHANNEL_ID=your-channel-id
// LINE_CHANNEL_SECRET=your-channel-secret
// LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token

const program = Effect.gen(function* () {
  const config = yield* LineConfig
  
  // Channel ID is accessible
  console.log("Channel ID:", config.channelId)
  
  // Secret and Token are securely redacted
  console.log("Config:", config) // Sensitive fields are hidden
})

// Run with environment variables
program.pipe(
  Effect.provide(LineConfig.layer),
  Effect.runPromise
)
```

### Type Safety

All configurations are fully type-safe:

```typescript
interface LineConfig {
  readonly channelId: string
  readonly channelSecret: Secret
  readonly channelAccessToken: Secret
}
```

### Error Handling

The configuration includes built-in error handling:

```typescript
const programWithErrors = program.pipe(
  Effect.catchTag("ConfigError", (error) => 
    Console.error("Configuration error:", error.message)
  )
)
```

### Utilities

The package also provides common utilities:

```typescript
import { createSignature, validateSignature } from "@effect-line/core"

// Create a signature for webhook validation
const signature = createSignature(channelSecret, body)

// Validate an incoming webhook
const isValid = validateSignature(channelSecret, body, signature)
```

## Related Packages

- `@effect-line/messaging-api` - LINE Messaging API integration
- `@effect-line/cli` - Command-line interface for LINE operations

## License

MIT License - see the [LICENSE](LICENSE) file for details
