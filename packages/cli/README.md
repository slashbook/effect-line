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

Send text messages to a single LINE user:

```bash
effect-line push-message --userId USER_ID --message "Hello" --message "World"
# or using aliases
effect-line push-message -u USER_ID -m "Hello" -m "World"
```

### Multicast Message

Send text messages to multiple LINE users:

```bash
effect-line multicast --userIds USER_ID1,USER_ID2,USER_ID3 --message "Hello everyone"
# or using aliases
effect-line multicast -U USER_ID1,USER_ID2,USER_ID3 -m "Hello everyone"
```

## Options

| Option    | Alias | Description                                     |
|-----------|-------|-------------------------------------------------|
| --userId  | -u    | Single user ID for push message                 |
| --userIds | -U    | Comma-separated list of user IDs for multicast  |
| --message | -m    | Message text (can be used multiple times)       |

## License

MIT
