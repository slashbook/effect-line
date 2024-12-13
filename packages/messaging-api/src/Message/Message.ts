import { Schema as S } from "effect"
import { FlexMessage } from "./FlexMessage.js"

/**
 * @since 0.0.1
 */
export const MessageType = S.Literal(
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
 * @since 0.0.1
 */
export const QuickReplyButtonAction = S.Struct({
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
 * @since 0.0.1
 */
export const QuickReply = S.Struct({
  items: S.Array(QuickReplyButtonAction)
})

/**
 * @since 0.0.1
 */
export const Sender = S.Struct({
  name: S.optional(S.String),
  iconUrl: S.optional(S.String)
})

/**
 * @since 0.0.1
 */
export const BaseMessage = S.Struct({
  type: MessageType,
  quickReply: S.optional(QuickReply),
  sender: S.optional(Sender)
})

/**
 * @since 0.0.1
 */
export const TextMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("text"),
    text: S.String
  }))
)

/**
 * @since 0.0.1
 */
export const ImageMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("image"),
    originalContentUrl: S.String,
    previewImageUrl: S.String
  }))
)

/**
 * @since 0.0.1
 */
export const VideoMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("video"),
    originalContentUrl: S.String,
    previewImageUrl: S.String,
    trackingId: S.optional(S.String)
  }))
)

/**
 * @since 0.0.1
 */
export const AudioMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("audio"),
    originalContentUrl: S.String,
    duration: S.Number
  }))
)

/**
 * @since 0.0.1
 */
export const FileMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("file"),
    fileName: S.String,
    fileSize: S.Number
  }))
)

/**
 * @since 0.0.1
 */
export const LocationMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("location"),
    title: S.String,
    address: S.String,
    latitude: S.Number,
    longitude: S.Number
  }))
)

/**
 * @since 0.0.1
 */
export const StickerMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("sticker"),
    packageId: S.String,
    stickerId: S.String
  }))
)

/**
 * @since 0.0.1
 */
export const TemplateMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("template"),
    altText: S.String,
    template: S.Any // TODO: Define Template schema
  }))
)

/**
 * @since 0.0.1
 */
export const Message = S.Union(
  TextMessage,
  ImageMessage,
  VideoMessage,
  AudioMessage,
  FileMessage,
  LocationMessage,
  StickerMessage,
  TemplateMessage,
  FlexMessage
)

/**
 * @since 0.0.1
 */
export const fromJson = S.decodeUnknown(Message)
