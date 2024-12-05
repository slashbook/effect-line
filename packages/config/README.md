# @effect-line/config

Type-safe configuration for Effect Line packages.

## Installation

```bash
npm install @effect-line/config
# or
yarn add @effect-line/config
# or
pnpm add @effect-line/config
```

## Usage

```typescript
import { config } from "@effect-line/config"
import { Config, Effect } from "effect"

const program = Effect.gen(function* ($) {
  const lineConfig = yield* $(Config.unwrap(config))
  
  console.log(lineConfig.channelId) // string
  console.log(lineConfig.channelSecret) // Redacted<string>
  console.log(lineConfig.channelAccessToken) // Redacted<string>
})
```

## Environment Variables

The following environment variables are required:

```bash
# LINE Channel ID from LINE Developers Console
LINE_CHANNEL_ID=your-channel-id

# LINE Channel Secret from LINE Developers Console (sensitive)
LINE_CHANNEL_SECRET=your-channel-secret

# LINE Channel Access Token from LINE Developers Console (sensitive)
LINE_CHANNEL_ACCESS_TOKEN=your-channel-access-token
```

Note: `channelSecret` and `channelAccessToken` are marked as sensitive and will be redacted in logs and error messages.
