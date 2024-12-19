# @effect-line/cli

Command line interface for LINE Platform operations, built with [Effect](https://effect.website).

## Features

- Environment configuration validation
- Secure credential management
- Modern ES modules support

## Installation

```bash
# Local installation
pnpm add @effect-line/cli

# Global installation
pnpm add -g @effect-line/cli
```

## Configuration

The CLI requires the following environment variables to be set:

```bash
export LINE_CHANNEL_SECRET="your_channel_secret"
export LINE_CHANNEL_ACCESS_TOKEN="your_channel_access_token"
```

You can also create a `.env` file in your project root:

```env
LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
```

## Usage

### Commands

```bash
# Show help
effect-line --help
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Run tests
pnpm test
```

## License

MIT - see [LICENSE](LICENSE) for details.
