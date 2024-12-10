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

### Push Message

```typescript
import { MessagingApi } from "@effect-line/messaging-api"
import { Effect } from "effect"

// Create a program that uses the MessagingApi
const program = Effect.gen(function*($) {
  const api = yield* $(MessagingApi)
  
  // Send a text message to a single user
  const response = yield* $(api.pushMessage({ 
    to: "userId", 
    messages: [{
      type: "text",
      text: "Hello, world!"
    }]
  }))
  
  return response
})

// Create a layer with your channel access token
const layer = MessagingApi.live("your-channel-access-token")

// Run the program with the layer
const result = yield* $(program.pipe(Effect.provide(layer)))
```

### Multicast Message

```typescript
// Send a message to multiple users
const multicastProgram = Effect.gen(function*($) {
  const api = yield* $(MessagingApi)
  
  // Send a text message to multiple users
  const response = yield* $(api.multicast({ 
    to: ["userId1", "userId2", "userId3"], 
    messages: [{
      type: "text",
      text: "Hello, everyone!"
    }]
  }))
  
  return response
})
```

## Error Handling

All errors from the LINE Bot SDK are wrapped in `LineBotSDKError`:

```typescript
try {
  const response = yield* $(api.pushMessage({ 
    to: "userId", 
    messages: [{
      type: "text",
      text: "Hello, world!"
    }]
  }))
} catch (error) {
  if (error instanceof LineBotSDKError) {
    console.error('LINE Bot SDK Error:', error.error)
  }
  throw error
}
```

## Available Methods

The package provides Effect-based wrappers for LINE Bot SDK methods:

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

- Default Rich Menu Operations
  - `getDefaultRichMenuId`
  - `setDefaultRichMenu`
  - `cancelDefaultRichMenu`

- Other Operations
  - `issueLinkToken`
  - `getNumberOfSentReplyMessages`
  - `getNumberOfSentPushMessages`
  - `getNumberOfSentMulticastMessages`
  - `getNumberOfSentBroadcastMessages`

## Testing

The package includes a `TestMessagingApi` class that can be used for testing:

```typescript
import { TestMessagingApi } from "@effect-line/messaging-api/test"

const testApi = new TestMessagingApi()
const testLayer = Layer.succeed(MessagingApi, testApi)

// Run your program with the test layer
const result = yield* $(program.pipe(Effect.provide(testLayer)))

// Check the calls made to pushMessage
const pushCalls = testApi.getPushMessageCalls()
expect(pushCalls).toHaveLength(1)

// Check the calls made to multicast
const multicastCalls = testApi.getMulticastCalls()
expect(multicastCalls).toHaveLength(1)

// Reset all calls
testApi.reset()
```

## License

MIT
