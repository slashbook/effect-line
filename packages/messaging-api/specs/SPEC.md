# @effect-line/messaging-api Specification

## Overview

LINE Messaging API integration layer providing type-safe API client and message builders.

## Project Structure

```
messaging-api/
├── src/
│   ├── Message/
│   │   ├── Schema/         # Message schemas
│   │   │   ├── Flex.ts
│   │   │   ├── Text.ts
│   │   │   ├── Image.ts
│   │   │   └── index.ts
│   │   ├── Flex.ts        # builders and implementations
│   │   ├── Text.ts
│   │   ├── Image.ts
│   │   └── index.ts       # re-exports
│   ├── MessagingApi.ts    # service interface and implementation
│   └── index.ts
```

Each module follows Effect-style organization:

- Uppercase filenames for Effect modules
- Types, schemas, builders and implementations in the same file
- Clear module boundaries and exports

## Core Features (0.1.0)

### MessagingApi Service

```typescript
// MessagingApi.ts
import { Effect } from "effect"
import type { Message } from "./Message"

export interface MessagingApi {
  readonly pushMessage: (
    params: PushMessageParams
  ) => Effect<never, MessagingError, void>
  readonly replyMessage: (
    params: ReplyMessageParams
  ) => Effect<never, MessagingError, void>
  readonly broadcastMessage: (
    params: BroadcastMessageParams
  ) => Effect<never, MessagingError, void>
}

// Usage
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
```

All message types and error types are derived from @line/bot-sdk.

## New Features (0.2.0)

### Type-safe Message Builder

Version 0.2.0 introduces type-safe message builders using Effect Schema and effect-builder:

1. **Schema-based Type Definitions**

   - Use Effect Schema for type definitions
   - Derive runtime validation from schema
   - Ensure type safety at compile time and runtime

2. **Builder Pattern with Defaults**

   - Fluent API for constructing messages
   - Default values for common configurations
   - Immutable operations

3. **Composable Field Updates**
   - Use Builder.compose for multiple field updates
   - Type-safe field access and modification
   - Automatic validation on build

```typescript
// Message/Schema/Flex.ts
import { Schema } from "effect"

export const FlexMessageSchema = Schema.struct({
  type: Schema.Literal("flex"),
  altText: Schema.String,
  contents: FlexContainerSchema
} as const)

export const FlexBubbleSchema = Schema.struct({
  type: Schema.Literal("bubble"),
  size: Schema.Union(
    Schema.Literal("nano"),
    Schema.Literal("micro"),
    Schema.Literal("kilo"),
    Schema.Literal("mega"),
    Schema.Literal("giga")
  ),
  direction: Schema.Union(Schema.Literal("ltr"), Schema.Literal("rtl"))
} as const)

// Message/Flex.ts
import { Builder } from "effect-builder"
import type { FlexMessage, FlexBubble, FlexBox, FlexText } from "@line/bot-sdk"
import { FlexMessageSchema, FlexBubbleSchema } from "./Schema/Flex"

// Builder definitions with defaults
export const FlexMessage = Builder.define<FlexMessage>(FlexMessageSchema)
export const FlexBubble = Builder.define<FlexBubble>(FlexBubbleSchema, {
  size: "mega",
  direction: "ltr"
})
export const FlexBox = Builder.define<FlexBox>(FlexBoxSchema, {
  layout: "vertical"
})
export const FlexText = Builder.define<FlexText>(FlexTextSchema, {
  size: "md",
  weight: "regular",
  color: "#000000"
})

// Usage Example
const message = pipe(
  FlexMessage.field("altText").set("Restaurant Menu"),
  FlexMessage.field("contents").set(
    pipe(
      FlexBubble.field("body").set(
        pipe(
          FlexBox.field("contents").set([
            pipe(
              FlexText.compose(
                FlexText.field("text").set("Brown Cafe"),
                FlexText.field("size").set("xl"),
                FlexText.field("weight").set("bold")
              )
            )
          ])
        )
      )
    )
  ),
  FlexMessage.build()
)
```

## Dependencies

- `effect`: ^3.0.0
- `effect-builder`: ^0.2.0
- `@line/bot-sdk`: Latest version
