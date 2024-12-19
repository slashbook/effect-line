# @effect-line/messaging-api 0.1.0 Specification

## Overview

LINE Messaging API integration layer providing type-safe message handling and API client.

## Features

### Message Types

1. **Text Messages**
   ```typescript
   interface TextMessage {
     type: "text"
     text: string
   }
   ```

2. **Image Messages**
   ```typescript
   interface ImageMessage {
     type: "image"
     originalContentUrl: string
     previewImageUrl: string
   }
   ```

### API Client

Effect-based API client providing:
- Type-safe request/response handling
- Automatic error handling
- Effect-based composability

## Architecture

### Design Principles

1. **Type Safety**: Complete type coverage for LINE API
2. **Effect Integration**: Native Effect ecosystem support
3. **Error Handling**: Comprehensive error types and handling

### Message Structure

```typescript
interface Message {
  type: MessageType
  // Type-specific fields
}

interface PushMessageParams {
  to: string
  messages: readonly Message[]
}
```

### Error Types

Standard error types for LINE API interactions:
- Network errors
- Authentication errors
- Rate limit errors
- Invalid message format errors

## Usage Examples

### Sending Messages

```typescript
import { MessagingApi } from "@effect-line/messaging-api"
import { Config } from "@effect-line/core"
import { Effect, pipe } from "effect"

const program = pipe(
  MessagingApi.pushMessage({
    to: "USER_ID",
    messages: [
      {
        type: "text",
        text: "Hello, World!"
      }
    ]
  }),
  Effect.provideService(Config, config)
)
