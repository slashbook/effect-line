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

## Configuration

Create a `.env` file in your project root with your LINE credentials:

```env
LINE_CHANNEL_ID=your-channel-id
LINE_CHANNEL_SECRET=your-channel-secret
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
```

## Usage

### Send a Push Message

Send a message to a specific user:

```bash
effect-line push --userId USER_ID --message "Hello, world!"
```

### Send a Multicast Message

Send a message to multiple users:

```bash
effect-line multicast --userIds USER_ID1,USER_ID2,USER_ID3 --message "Hello, everyone!"
```

## Available Commands

- `push`: Send a push message to a single user
  - Options:
    - `--userId, -t`: User ID to send message to
    - `--message, -m`: Message text to send

- `multicast`: Send a message to multiple users
  - Options:
    - `--userIds, -t`: Comma-separated list of user IDs
    - `--message, -m`: Message text to send

## Development

```bash
# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Run tests
pnpm test
```

## License

MIT
