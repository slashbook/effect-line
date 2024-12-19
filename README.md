# @effect-line

> Effect-based libraries for LINE Platform integration with automatic error handling and type safety

## Features

- **Type-safe Integration**: Full TypeScript support with proper type inference
- **Effect-based Architecture**: Leverage the power of [Effect](https://effect.website) for better composability
- **Modern Development**: ES modules support
- **Security First**: Secure credential management

## Packages

- `@effect-line/core` - Core utilities and configuration
- `@effect-line/messaging-api` - LINE Messaging API integration
- `@effect-line/cli` - Command-line tools for configuration management

## Quick Start

```bash
# Install dependencies
pnpm add @effect-line/core @effect-line/messaging-api
```

## Documentation

Each package contains its own detailed specification:

- [Core Package Specification](packages/core/SPEC.md)
- [Messaging API Specification](packages/messaging-api/SPEC.md)
- [CLI Specification](packages/cli/SPEC.md)

## Examples

### Sending a Message

```typescript
import { MessagingApi } from "@effect-line/messaging-api"
import { Config } from "@effect-line/core"
import { Effect, pipe } from "effect"

const program = pipe(
  MessagingApi.pushMessage({
    to: "USER_ID",
    messages: [
      {
        type: "text",
        text: "Hello, World!"
      }
    ]
  }),
  Effect.provideService(Config, config)
)
```

## License

MIT - see [LICENSE](LICENSE) for details.
