/**
 * Effect-based wrapper for LINE Bot SDK's Messaging API
 * Provides a type-safe and functional way to interact with LINE's Messaging API
 * 
 * @since 0.1.0
 */

import { messagingApi } from "@line/bot-sdk"
import type { MulticastRequest, PushMessageRequest, PushMessageResponse } from "@line/bot-sdk/dist/messaging-api/api.js"
import * as Context from "effect/Context"
import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"

import { config } from "@effect-line/core"
import { Redacted } from "effect"

type MulticastResponse = any

/**
 * Represents errors that occur when interacting with the LINE Bot SDK.
 * Wraps any underlying errors from the SDK for better error handling.
 * 
 * @since 0.1.0
 * @category errors
 * @example
 * ```ts
 * const error = new LineBotSDKError({ error: new Error("Network error") })
 * ```
 */
export class LineBotSDKError extends Data.TaggedError("LineBotSDKError")<{
  readonly error: unknown
}> {}

/**
 * The interface that defines all available LINE Bot SDK methods.
 * Each method is wrapped in an Effect for better error handling and composability.
 * Supports all major LINE Messaging API operations like push messages and multicast.
 *
 * @since 0.1.0
 * @category models
 * @example
 * ```ts
 * const program = Effect.gen(function*($) {
 *   const api = yield* $(MessagingApi)
 *   yield* $(api.pushMessage({
 *     to: "USER_ID",
 *     messages: [{ type: "text", text: "Hello!" }]
 *   }))
 * })
 * ```
 */
export interface MessagingApiInterface {
  /**
   * Sends a push message to a user or a group.
   * Returns the response from the LINE Bot SDK.
   * 
   * @since 0.1.0
   * @category methods
   * @example
   * ```ts
   * const program = Effect.gen(function*($) {
   *   const api = yield* $(MessagingApi)
   *   yield* $(api.pushMessage({
   *     to: "USER_ID",
   *     messages: [{ type: "text", text: "Hello!" }]
   *   }))
   * })
   * ```
   */
  readonly pushMessage: (
    pushMessageRequest: PushMessageRequest,
    xLineRetryKey?: string | undefined
  ) => Effect.Effect<PushMessageResponse, LineBotSDKError, never>

  /**
   * Sends a multicast message to multiple users or groups.
   * Returns the response from the LINE Bot SDK.
   * 
   * @since 0.1.0
   * @category methods
   * @example
   * ```ts
   * const program = Effect.gen(function*($) {
   *   const api = yield* $(MessagingApi)
   *   yield* $(api.multicast({
   *     to: ["USER_ID1", "USER_ID2"],
   *     messages: [{ type: "text", text: "Hello!" }]
   *   }))
   * })
   * ```
   */
  readonly multicast: (
    multicastRequest: MulticastRequest,
    xLineRetryKey?: string | undefined
  ) => Effect.Effect<MulticastResponse, LineBotSDKError, never>
}

/**
 * Converts a promise-returning function into an Effect-based function.
 * Automatically handles errors by wrapping them in LineBotSDKError.
 * 
 * @since 0.1.0
 * @category utils
 * @internal
 */
const effectify = <Args extends Array<unknown>, B>(f: (...args: Args) => Promise<B>) => (...args: Args) =>
  Effect.tryPromise({
    try: () => f(...args),
    catch: (error) => new LineBotSDKError({ error })
  })

/**
 * Creates a new MessagingApi instance with the provided channel access token.
 * 
 * @since 0.1.0
 * @category constructors
 * @internal
 */
const makeMessagingApi = (channelAccessToken: string) =>
  Effect.try({
    try: () => {
      const client = new messagingApi.MessagingApiClient({ channelAccessToken })
      return {
        pushMessage: effectify(client.pushMessage.bind(client)),
        multicast: effectify(client.multicast.bind(client))
      }
    },
    catch: (error) => new LineBotSDKError({ error })
  })

/**
 * Creates a live MessagingApi layer with the provided channel access token from environment variables.
 * 
 * @since 0.1.0
 * @category constructors
 * @internal
 */
const make = Effect.gen(function*() {
  const cfg = yield* config
  return yield* makeMessagingApi(Redacted.value(cfg.channelAccessToken))
})

/**
 * The main entry point for interacting with the LINE Bot SDK.
 * Provides access to all messaging API methods in an Effect-based way.
 * 
 * @since 0.1.0
 */
export class MessagingApi extends Context.Tag("@effect-line/MessagingApi")<
  MessagingApi,
  MessagingApiInterface
>() {
  /**
   * The default MessagingApi layer that uses the channel access token from environment variables.
   * 
   * @since 0.1.0
   * @category layers
   */
  static readonly Default = Layer.effect(MessagingApi, make)

  /**
   * The MessagingApi layer that uses the provided channel access token.
   * 
   * @since 0.1.0
   * @category layers
   */
  static readonly layer = (accessToken: string) => Layer.effect(MessagingApi, makeMessagingApi(accessToken))
}
