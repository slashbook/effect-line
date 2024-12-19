import { Schema as S } from "effect"

/**
 * Schema for Message Type
 * @since 0.1.0
 */
export const MessageTypeSchema = S.Literal(
  "text",
  "image",
  "video",
  "audio",
  "file",
  "location",
  "sticker",
  "template",
  "flex"
)

/**
 * Schema for QuickReply Button Action
 * @since 0.1.0
 */
export const QuickReplyButtonActionSchema = S.Struct({
  type: S.Literal("action"),
  imageUrl: S.optional(S.String),
  action: S.Union(
    S.Struct({
      type: S.Literal("message"),
      label: S.String,
      text: S.String
    }),
    S.Struct({
      type: S.Literal("postback"),
      label: S.String,
      data: S.String,
      text: S.optional(S.String),
      displayText: S.optional(S.String)
    })
  )
})

/**
 * Schema for QuickReply
 * @since 0.1.0
 */
export const QuickReplySchema = S.Struct({
  items: S.Array(QuickReplyButtonActionSchema)
})

/**
 * Schema for Sender
 * @since 0.1.0
 */
export const SenderSchema = S.Struct({
  name: S.optional(S.String),
  iconUrl: S.optional(S.String)
})

/**
 * Base schema for all messages
 * @since 0.1.0
 */
export const BaseMessageSchema = S.Struct({
  type: MessageTypeSchema,
  quickReply: S.optional(QuickReplySchema),
  sender: S.optional(SenderSchema)
})

/**
 * Schema for Text Message
 * @since 0.1.0
 */
export const TextMessageSchema = BaseMessageSchema.pipe(
  S.extend(S.Struct({
    type: S.Literal("text"),
    text: S.String
  }))
)

/**
 * Schema for Image Message
 * @since 0.1.0
 */
export const ImageMessageSchema = BaseMessageSchema.pipe(
  S.extend(S.Struct({
    type: S.Literal("image"),
    originalContentUrl: S.String,
    previewImageUrl: S.String
  }))
)

/**
 * Schema for Video Message
 * @since 0.1.0
 */
export const VideoMessageSchema = BaseMessageSchema.pipe(
  S.extend(S.Struct({
    type: S.Literal("video"),
    originalContentUrl: S.String,
    previewImageUrl: S.String,
    trackingId: S.optional(S.String)
  }))
)
