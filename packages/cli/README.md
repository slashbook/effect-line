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
./bin/effect-line.js

# Or directly with pnpm
pnpm --filter @effect-line/cli exec effect-line
```

## Configuration

Create a `.env` file in your project root with your LINE credentials:

```env
LINE_CHANNEL_ID=your-channel-id
LINE_CHANNEL_SECRET=your-channel-secret
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
```

## Commands

Currently implemented commands:

- `effect-line`: Displays "Hello World" (default command)

Coming soon:

- `push`: Send a push message to a single user
- `multicast`: Send a message to multiple users

## License

MIT
