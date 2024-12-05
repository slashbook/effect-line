/**
 * @since 1.0.0
 *
 * Effect-based wrapper for LINE Bot SDK's Messaging API
 *
 * @example
 * ```typescript
 * import { MessagingApi } from "@effect-line/messaging-api"
 * import { Effect } from "effect"
 *
 * const program = Effect.gen(function*($) {
 *   const api = yield* $(MessagingApi)
 *   const response = yield* $(api.pushMessage({
 *     to: "userId",
 *     messages: [{
 *       type: "text",
 *       text: "Hello, world!"
 *     }]
 *   }))
 *   return response
 * })
 *
 * const layer = MessagingApi.live("your-channel-access-token")
 * const result = yield* $(program.pipe(Effect.provide(layer)))
 * ```
 *
 * @packageDocumentation
 */

import { messagingApi } from "@line/bot-sdk"
import type {
  BroadcastRequest,
  IssueLinkTokenResponse,
  MulticastRequest,
  NarrowcastRequest,
  PushMessageRequest,
  PushMessageResponse,
  ReplyMessageRequest,
  ReplyMessageResponse
  // RichMenuAliasListResponse,
  // RichMenuAliasResponse,
  // RichMenuListResponse,
  // RichMenuRequest,
  // UpdateRichMenuAliasRequest
} from "@line/bot-sdk/dist/messaging-api/api.js"
import * as Context from "effect/Context"
import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"

// Type aliases for missing LINE Bot SDK types
type MulticastResponse = any
type BroadcastResponse = any
type NarrowcastResponse = any
type ProfileResponse = messagingApi.UserProfileResponse
type GroupMemberProfileResponse = messagingApi.GroupUserProfileResponse
type RoomMemberProfileResponse = messagingApi.RoomUserProfileResponse
// type CreateRichMenuRequest = messagingApi.RichMenuRequest
// type CreateRichMenuResponse = messagingApi.RichMenuIdResponse
// type DeleteRichMenuResponse = void
// type CreateRichMenuAliasResponse = void
// type UpdateRichMenuAliasResponse = void
// type DeleteRichMenuAliasResponse = void
// type RichMenuIdOfUserResponse = messagingApi.RichMenuIdResponse
type DefaultRichMenuIdResponse = messagingApi.RichMenuIdResponse
type SetDefaultRichMenuResponse = void
type CancelDefaultRichMenuResponse = void
type NumberOfSentReplyMessagesResponse = messagingApi.NumberOfMessagesResponse
type NumberOfSentPushMessagesResponse = messagingApi.NumberOfMessagesResponse
type NumberOfSentMulticastMessagesResponse = messagingApi.NumberOfMessagesResponse
type NumberOfSentBroadcastMessagesResponse = messagingApi.NumberOfMessagesResponse

/**
 * Represents errors that occur when interacting with the LINE Bot SDK.
 *
 * @since 1.0.0
 * @category errors
 *
 * @example
 * ```typescript
 * try {
 *   const response = yield* $(api.pushMessage({
 *     to: "userId",
 *     messages: [{
 *       type: "text",
 *       text: "Hello, world!"
 *     }]
 *   }))
 * } catch (error) {
 *   if (error instanceof LineBotSDKError) {
 *     console.error('LINE Bot SDK Error:', error.error)
 *   }
 *   throw error
 * }
 * ```
 */
export class LineBotSDKError extends Data.TaggedError("LineBotSDKError")<{
  readonly error: unknown
}> {}

/**
 * Converts a promise-returning function into an Effect-based function.
 * Automatically handles errors by wrapping them in LineBotSDKError.
 *
 * @since 1.0.0
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
 * @since 1.0.0
 * @category constructors
 * @internal
 */
const makeMessagingApi = (channelAccessToken: string) =>
  Effect.try({
    try: () => {
      const client = new messagingApi.MessagingApiClient({ channelAccessToken })
      return {
        pushMessage: effectify(client.pushMessage.bind(client)),
        replyMessage: effectify(client.replyMessage.bind(client)),
        multicast: effectify(client.multicast.bind(client)),
        broadcast: effectify(client.broadcast.bind(client)),
        narrowcast: effectify(client.narrowcast.bind(client)),
        getProfile: effectify(client.getProfile.bind(client)),
        getGroupMemberProfile: effectify(client.getGroupMemberProfile.bind(client)),
        getRoomMemberProfile: effectify(client.getRoomMemberProfile.bind(client)),
        leaveGroup: effectify(client.leaveGroup.bind(client)),
        leaveRoom: effectify(client.leaveRoom.bind(client)),
        // getRichMenu: effectify(client.getRichMenu.bind(client)),
        // createRichMenu: effectify(client.createRichMenu.bind(client)),
        // deleteRichMenu: effectify(client.deleteRichMenu.bind(client)),
        // getRichMenuAliasList: effectify(client.getRichMenuAliasList.bind(client)),
        // getRichMenuAlias: effectify(client.getRichMenuAlias.bind(client)),
        // createRichMenuAlias: effectify(client.createRichMenuAlias.bind(client)),
        // updateRichMenuAlias: effectify(client.updateRichMenuAlias.bind(client)),
        // deleteRichMenuAlias: effectify(client.deleteRichMenuAlias.bind(client)),
        getRichMenuIdOfUser: effectify(client.getRichMenuIdOfUser.bind(client)),
        getRichMenuList: effectify(client.getRichMenuList.bind(client)),
        getDefaultRichMenuId: effectify(client.getDefaultRichMenuId.bind(client)),
        setDefaultRichMenu: effectify(client.setDefaultRichMenu.bind(client)),
        cancelDefaultRichMenu: effectify(client.cancelDefaultRichMenu.bind(client)),
        issueLinkToken: effectify(client.issueLinkToken.bind(client)),
        getNumberOfSentReplyMessages: effectify(client.getNumberOfSentReplyMessages.bind(client)),
        getNumberOfSentPushMessages: effectify(client.getNumberOfSentPushMessages.bind(client)),
        getNumberOfSentMulticastMessages: effectify(client.getNumberOfSentMulticastMessages.bind(client)),
        getNumberOfSentBroadcastMessages: effectify(client.getNumberOfSentBroadcastMessages.bind(client))
      }
    },
    catch: (error) => new LineBotSDKError({ error })
  })

/**
 * Creates a live MessagingApi instance with the provided channel access token.
 *
 * @since 1.0.0
 * @category constructors
 * @internal
 */
const makeLive = (channelAccessToken: string) =>
  Effect.gen(function*(_) {
    return yield* _(makeMessagingApi(channelAccessToken))
  })

/**
 * The interface that defines all available LINE Bot SDK methods.
 * Each method is wrapped in an Effect for better error handling and composability.
 *
 * @since 1.0.0
 * @category models
 */
export interface MessagingApiInterface {
  pushMessage: (
    pushMessageRequest: PushMessageRequest,
    xLineRetryKey?: string
  ) => Effect.Effect<PushMessageResponse, LineBotSDKError, never>
  replyMessage: (
    replyMessageRequest: ReplyMessageRequest,
    xLineRetryKey?: string
  ) => Effect.Effect<ReplyMessageResponse, LineBotSDKError, never>
  multicast: (
    multicastRequest: MulticastRequest,
    xLineRetryKey?: string
  ) => Effect.Effect<MulticastResponse, LineBotSDKError, never>
  broadcast: (
    broadcastRequest: BroadcastRequest,
    xLineRetryKey?: string
  ) => Effect.Effect<BroadcastResponse, LineBotSDKError, never>
  narrowcast: (
    narrowcastRequest: NarrowcastRequest,
    xLineRetryKey?: string
  ) => Effect.Effect<NarrowcastResponse, LineBotSDKError, never>
  getProfile: (userId: string) => Effect.Effect<ProfileResponse, LineBotSDKError, never>
  getGroupMemberProfile: (
    groupId: string,
    userId: string
  ) => Effect.Effect<GroupMemberProfileResponse, LineBotSDKError, never>
  getRoomMemberProfile: (
    roomId: string,
    userId: string
  ) => Effect.Effect<RoomMemberProfileResponse, LineBotSDKError, never>
  leaveGroup: (groupId: string) => Effect.Effect<void, LineBotSDKError, never>
  leaveRoom: (roomId: string) => Effect.Effect<void, LineBotSDKError, never>
  //  getRichMenu: (richMenuId: string) => Effect.Effect<RichMenuResponse, LineBotSDKError, never>
  // createRichMenu: (richMenu: CreateRichMenuRequest) => Effect.Effect<CreateRichMenuResponse, LineBotSDKError, never>
  // deleteRichMenu: (richMenuId: string) => Effect.Effect<DeleteRichMenuResponse, LineBotSDKError, never>
  // getRichMenuAliasList: () => Effect.Effect<RichMenuAliasListResponse, LineBotSDKError, never>
  // getRichMenuAlias: (richMenuAliasId: string) => Effect.Effect<RichMenuAliasResponse, LineBotSDKError, never>
  // createRichMenuAlias: (
  //  richMenuId: string,
  //  richMenuAliasId: string
  // ) => Effect.Effect<CreateRichMenuAliasResponse, LineBotSDKError, never>
  // updateRichMenuAlias: (
  //  richMenuAliasId: string,
  //  richMenuId: string
  // ) => Effect.Effect<UpdateRichMenuAliasResponse, LineBotSDKError, never>
  // deleteRichMenuAlias: (richMenuAliasId: string) => Effect.Effect<DeleteRichMenuAliasResponse, LineBotSDKError, never>
  // getRichMenuIdOfUser: (userId: string) => Effect.Effect<RichMenuIdOfUserResponse, LineBotSDKError, never>
  // getRichMenuList: () => Effect.Effect<RichMenuListResponse, LineBotSDKError, never>
  getDefaultRichMenuId: () => Effect.Effect<DefaultRichMenuIdResponse, LineBotSDKError, never>
  setDefaultRichMenu: (richMenuId: string) => Effect.Effect<SetDefaultRichMenuResponse, LineBotSDKError, never>
  cancelDefaultRichMenu: () => Effect.Effect<CancelDefaultRichMenuResponse, LineBotSDKError, never>
  issueLinkToken: (userId: string) => Effect.Effect<IssueLinkTokenResponse, LineBotSDKError, never>
  getNumberOfSentReplyMessages: (
    date: string
  ) => Effect.Effect<NumberOfSentReplyMessagesResponse, LineBotSDKError, never>
  getNumberOfSentPushMessages: (date: string) => Effect.Effect<NumberOfSentPushMessagesResponse, LineBotSDKError, never>
  getNumberOfSentMulticastMessages: (
    date: string
  ) => Effect.Effect<NumberOfSentMulticastMessagesResponse, LineBotSDKError, never>
  getNumberOfSentBroadcastMessages: (
    date: string
  ) => Effect.Effect<NumberOfSentBroadcastMessagesResponse, LineBotSDKError, never>
}

/**
 * The main entry point for interacting with the LINE Bot SDK.
 * Provides access to all messaging API methods in an Effect-based way.
 *
 * @since 1.0.0
 * @category context
 *
 * @example
 * ```typescript
 * const program = Effect.gen(function*($) {
 *   const api = yield* $(MessagingApi)
 *   return yield* $(api.pushMessage({
 *     to: "userId",
 *     messages: [{
 *       type: "text",
 *       text: "Hello, world!"
 *     }]
 *   }))
 * })
 * ```
 */
export class MessagingApi extends Context.Tag("@effect-line/MessagingApi")<
  MessagingApi,
  MessagingApiInterface
>() {
  /**
   * Creates a Layer that provides a MessagingApi instance.
   *
   * @param channelAccessToken - Your LINE channel access token
   * @returns A Layer that can be used to provide MessagingApi to your program
   *
   * @example
   * ```typescript
   * const layer = MessagingApi.live("your-channel-access-token")
   * const result = yield* $(program.pipe(Effect.provide(layer)))
   * ```
   */
  static readonly live = (channelAccessToken: string) => Layer.effect(MessagingApi, makeLive(channelAccessToken))
}
