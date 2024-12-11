# @effect-line

A collection of Effect-based libraries for working with LINE Platform APIs. This project wraps LINE SDK functionalities in the Effect type, making them more ergonomic to use within the [Effect](https://www.effect.website) ecosystem.

## Features

- Type-safe LINE API integrations with automatic error handling
- Dependency injection and testing made easy with Effect
- Modern ES modules and CommonJS support
- Command line tools for development

## Packages

- `@effect-line/core` - Shared types, utilities
- `@effect-line/messaging-api` - LINE Messaging API integration with automatic error handling and retry policies
- `@effect-line/liff` - LINE Liff API integration (coming soon)

## Installation

```bash
pnpm add @effect-line/messaging-api @effect-line/config
```

## Development

```bash
# Install
git clone https://github.com/your-username/effect-line.git
cd effect-line
pnpm install

# Common commands
pnpm build    # Build all packages
pnpm test     # Run tests
pnpm format   # Format code
```

For development guidelines and best practices when using Windsurf IDE, please refer to [PROMPTS.md](PROMPTS.md).

## License

MIT License - see the [LICENSE](LICENSE) file for details
