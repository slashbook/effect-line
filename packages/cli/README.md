# @effect-line/cli

Command line interface for LINE Platform operations, built with [Effect](https://effect.website).

## Features

- Type-safe LINE API operations
- Automatic error handling and retries
- Environment configuration validation
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
export LINE_CHANNEL_ID="your_channel_id"
export LINE_CHANNEL_SECRET="your_channel_secret"
export LINE_CHANNEL_ACCESS_TOKEN="your_channel_access_token"
```

You can also create a `.env` file in your project root:

```env
LINE_CHANNEL_ID=your_channel_id
LINE_CHANNEL_SECRET=your_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
```

## Usage

### Commands

```bash
# Show help
effect-line --help

# Send a message to a single user
effect-line messaging-api push-message --user-id USER_ID --message "Hello, world!" --message "Second message"

# Send messages to multiple users
effect-line messaging-api multicast --user-ids "USER_ID1,USER_ID2" --message "Hello, everyone!"
```

Command options:
- `push-message`
  - `-u, --user-id`: The user ID to send the message to
  - `-m, --message`: The message(s) to send (can be specified multiple times)

- `multicast`
  - `-U, --user-ids`: Comma-separated list of user IDs
  - `-m, --message`: The message(s) to send (can be specified multiple times)

### Programmatic Usage

You can also use the CLI programmatically in your Node.js applications:

```typescript
import { cli } from "@effect-line/cli"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { MessagingApi } from "@effect-line/messaging-api"

// Create the layer
const MainLive = MessagingApi.layer.pipe(
  Layer.merge(NodeContext.layer)
)

// Run the program
const program = cli(process.argv).pipe(
  Effect.provide(MainLive)
)

NodeRuntime.runMain(program)
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

MIT License - see the [LICENSE](LICENSE) file for details