import { Schema as S } from "effect"
import { BaseMessageSchema } from "./Message.js"

/**
 * Schema for Flex Layout Type
 * @since 0.1.0
 */
export const FlexLayoutTypeSchema = S.Literal(
  "horizontal",
  "vertical",
  "baseline"
)

/**
 * Base schema for all Flex components
 * @since 0.1.0
 */
export const FlexComponentBaseSchema = S.Struct({
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
 * Schema for Flex Box component
 * @since 0.1.0
 */
export const FlexBoxSchema = FlexComponentBaseSchema.pipe(
  S.extend(S.Struct({
    type: S.Literal("box"),
    layout: FlexLayoutTypeSchema,
    contents: S.Array(S.Any), // TODO: use Flex component schema
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
 * Schema for Flex Text component
 * @since 0.1.0
 */
export const FlexTextSchema = FlexComponentBaseSchema.pipe(
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
 * Schema for Flex Image component
 * @since 0.1.0
 */
export const FlexImageSchema = FlexComponentBaseSchema.pipe(
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
 * Union of all Flex component schemas
 * @since 0.1.0
 */
export const FlexComponentSchema = S.Union(
  FlexBoxSchema,
  FlexTextSchema,
  FlexImageSchema
)

/**
 * Schema for Flex Bubble container
 * @since 0.1.0
 */
export const FlexBubbleSchema = S.Struct({
  type: S.Literal("bubble"),
  size: S.optional(S.String),
  direction: S.optional(S.String),
  header: S.optional(FlexBoxSchema),
  hero: S.optional(FlexBoxSchema),
  body: S.optional(FlexBoxSchema),
  footer: S.optional(FlexBoxSchema),
  styles: S.optional(S.Any)
})

/**
 * Schema for Flex Carousel container
 * @since 0.1.0
 */
export const FlexCarouselSchema = S.Struct({
  type: S.Literal("carousel"),
  contents: S.Array(FlexBubbleSchema)
})

/**
 * Union of all Flex container schemas
 * @since 0.1.0
 */
export const FlexContainerSchema = S.Union(
  FlexBubbleSchema,
  FlexCarouselSchema
)

/**
 * Schema for Flex Message
 * @since 0.1.0
 */
export const FlexMessageSchema = BaseMessageSchema.pipe(
  S.extend(S.Struct({
    type: S.Literal("flex"),
    altText: S.String,
    contents: FlexContainerSchema
  }))
)
