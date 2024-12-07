# @effect-line/cli

A command-line interface for interacting with LINE Messaging API using Effect.

## Installation

```bash
npm install @effect-line/cli
# or
yarn add @effect-line/cli
# or
pnpm add @effect-line/cli
```

## Development Setup

1. Build the CLI:

```bash
pnpm build
```

2. Run in development:

```bash
# From the root of the monorepo
node packages/cli/dist/index.js

# Or with pnpm
pnpm --filter @effect-line/cli exec effect-line
```

## Configuration

The CLI requires LINE API credentials. Set them using environment variables:

```env
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
```

## Commands

### Push Message

Send text messages to a LINE user:

```bash
effect-line push-message --userId USER_ID --message "Hello" --message "World"
# or using aliases
effect-line push-message -u USER_ID -m "Hello" -m "World"
```

Options:

- `--userId, -u`: The LINE user ID to send messages to
- `--message, -m`: Text messages to send (can be specified multiple times)

## License

MIT
