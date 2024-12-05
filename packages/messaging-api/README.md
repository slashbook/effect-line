# @effect-line/messaging-api

Effect-based wrapper for LINE Bot SDK's Messaging API.

## Installation

```bash
npm install @effect-line/messaging-api
# or
yarn add @effect-line/messaging-api
# or
pnpm add @effect-line/messaging-api
```

## Usage

```typescript
import { MessagingApi } from "@effect-line/messaging-api"
import { Effect } from "effect"

// Create a program that uses the MessagingApi
const program = Effect.gen(function*($) {
  const api = yield* $(MessagingApi)
  
  // Send a text message
  const response = yield* $(api.pushMessage("userId", [{
    type: "text",
    text: "Hello, world!"
  }]))
  
  return response
})

// Create a layer with your channel access token
const layer = MessagingApi.live("your-channel-access-token")

// Run the program with the layer
const result = yield* $(program.pipe(Effect.provide(layer)))
```

## Error Handling

All errors from the LINE Bot SDK are wrapped in `LineBotSDKError`:

```typescript
try {
  const response = yield* $(api.pushMessage("userId", message))
} catch (error) {
  if (error instanceof LineBotSDKError) {
    console.error('LINE Bot SDK Error:', error.error)
  }
  throw error
}
```

## Available Methods

The package provides Effect-based wrappers for all LINE Bot SDK methods:

- Message Operations
  - `pushMessage`
  - `replyMessage`
  - `multicast`
  - `broadcast`
  - `narrowcast`

- Profile Operations
  - `getProfile`
  - `getGroupMemberProfile`
  - `getRoomMemberProfile`

- Group/Room Operations
  - `leaveGroup`
  - `leaveRoom`

- Rich Menu Operations
  - `getRichMenu`
  - `createRichMenu`
  - `deleteRichMenu`
  - `getRichMenuAliasList`
  - `getRichMenuAlias`
  - `createRichMenuAlias`
  - `updateRichMenuAlias`
  - `deleteRichMenuAlias`
  - `getRichMenuIdOfUser`
  - `getRichMenuList`
  - `getDefaultRichMenuId`
  - `setDefaultRichMenu`
  - `cancelDefaultRichMenu`

- Other Operations
  - `issueLinkToken`
  - `getNumberOfSentReplyMessages`
  - `getNumberOfSentPushMessages`
  - `getNumberOfSentMulticastMessages`
  - `getNumberOfSentBroadcastMessages`

## License

MIT
