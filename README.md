# @effect-line

> Effect-based libraries for LINE Platform integration with automatic error handling and type safety

## Features

- **Type-safe Integration**: Full TypeScript support with proper type inference
- **Automatic Error Handling**: Built-in error handling and retry policies
- **Effect-based Architecture**: Leverage the power of [Effect](https://effect.website) for better composability
- **Modern Development**: ES modules support and comprehensive CLI tools
- **Security First**: Secure credential management and webhook validation

## Packages

- `@effect-line/core` - Core utilities, configuration, and shared functionality
- `@effect-line/messaging-api` - LINE Messaging API integration with automatic error handling
- `@effect-line/domain` - Shared domain types and interfaces
- `@effect-line/cli` - Command-line tools for LINE Platform operations

## Quick Start

### Installation

```bash
# Install core functionality
pnpm add @effect-line/core

# Install messaging API integration
pnpm add @effect-line/messaging-api

# Install CLI tools (optional)
pnpm add -g @effect-line/cli
```

### Basic Usage

```typescript
import { Effect } from "effect"
import { MessagingApi } from "@effect-line/messaging-api"

// Create a program to send a message
const program = Effect.gen(function* () {
  const api = yield* MessagingApi
  
  yield* api.pushMessage({
    to: "USER_ID",
    messages: [{ type: "text", text: "Hello from Effect!" }]
  })
})

// Run with automatic error handling
program.pipe(
  Effect.provide(MessagingApi.Default),
  Effect.runPromise
)
```

## Development

```bash
# Clone the repository
git clone https://github.com/your-username/effect-line.git
cd effect-line

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Format code
pnpm format
```

## Documentation

- [Core Package](packages/core/README.md)
- [Messaging API](packages/messaging-api/README.md)
- [CLI Tools](packages/cli/README.md)
- [Domain Types](packages/domain/README.md)

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

MIT License - see the [LICENSE](LICENSE) file for details
