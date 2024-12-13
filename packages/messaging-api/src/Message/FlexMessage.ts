import { Schema as S } from "effect"
import { BaseMessage } from "./Message.js"

/**
 * @since 0.0.1
 */
export const FlexLayoutType = S.Literal(
  "horizontal",
  "vertical",
  "baseline"
)

/**
 * @since 0.0.1
 */
export const FlexComponentBase = S.Struct({
  flex: S.optional(S.Number),
  margin: S.optional(S.String),
  position: S.optional(S.String),
  offsetTop: S.optional(S.String),
  offsetBottom: S.optional(S.String),
  offsetStart: S.optional(S.String),
  offsetEnd: S.optional(S.String),
  action: S.optional(S.Any) // TODO: Define Action schema
})

/**
 * @since 0.0.1
 */
export const FlexBox = FlexComponentBase.pipe(
  S.extend(S.Struct({
    type: S.Literal("box"),
    layout: FlexLayoutType,
    contents: S.Array(S.Any),
    backgroundColor: S.optional(S.String),
    borderColor: S.optional(S.String),
    borderWidth: S.optional(S.String),
    cornerRadius: S.optional(S.String),
    width: S.optional(S.String),
    height: S.optional(S.String),
    paddingAll: S.optional(S.String),
    paddingTop: S.optional(S.String),
    paddingBottom: S.optional(S.String),
    paddingStart: S.optional(S.String),
    paddingEnd: S.optional(S.String)
  }))
)

/**
 * @since 0.0.1
 */
export const FlexText = FlexComponentBase.pipe(
  S.extend(S.Struct({
    type: S.Literal("text"),
    text: S.String,
    size: S.optional(S.String),
    color: S.optional(S.String),
    weight: S.optional(S.String),
    style: S.optional(S.String),
    decoration: S.optional(S.String),
    align: S.optional(S.String),
    gravity: S.optional(S.String),
    wrap: S.optional(S.Boolean),
    maxLines: S.optional(S.Number),
    adjustMode: S.optional(S.String),
    lineSpacing: S.optional(S.String)
  }))
)

/**
 * @since 0.0.1
 */
export const FlexImage = FlexComponentBase.pipe(
  S.extend(S.Struct({
    type: S.Literal("image"),
    url: S.String,
    size: S.optional(S.String),
    aspectRatio: S.optional(S.String),
    aspectMode: S.optional(S.String),
    backgroundColor: S.optional(S.String),
    animated: S.optional(S.Boolean)
  }))
)

/**
 * @since 0.0.1
 */
export const FlexComponent = S.Union(
  FlexBox,
  FlexText,
  FlexImage
)

/**
 * @since 0.0.1
 */
export const FlexBubble = S.Struct({
  type: S.Literal("bubble"),
  size: S.optional(S.String),
  direction: S.optional(S.String),
  header: S.optional(FlexBox),
  hero: S.optional(FlexBox),
  body: S.optional(FlexBox),
  footer: S.optional(FlexBox),
  styles: S.optional(S.Any) // TODO: Define styles schema
})

/**
 * @since 0.0.1
 */
export const FlexCarousel = S.Struct({
  type: S.Literal("carousel"),
  contents: S.Array(FlexBubble)
})

/**
 * @since 0.0.1
 */
export const FlexContainer = S.Union(
  FlexBubble,
  FlexCarousel
)

/**
 * @since 0.0.1
 */
export const FlexMessage = BaseMessage.pipe(
  S.extend(S.Struct({
    type: S.Literal("flex"),
    altText: S.String,
    contents: FlexContainer
  }))
)
