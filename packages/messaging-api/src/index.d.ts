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
import { messagingApi } from "@line/bot-sdk";
import type { BroadcastRequest, IssueLinkTokenResponse, MulticastRequest, NarrowcastRequest, PushMessageRequest, PushMessageResponse, ReplyMessageRequest, ReplyMessageResponse } from "@line/bot-sdk/dist/messaging-api/api.js";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
type MulticastResponse = any;
type BroadcastResponse = any;
type NarrowcastResponse = any;
type ProfileResponse = messagingApi.UserProfileResponse;
type GroupMemberProfileResponse = messagingApi.GroupUserProfileResponse;
type RoomMemberProfileResponse = messagingApi.RoomUserProfileResponse;
type DefaultRichMenuIdResponse = messagingApi.RichMenuIdResponse;
type SetDefaultRichMenuResponse = void;
type CancelDefaultRichMenuResponse = void;
type NumberOfSentReplyMessagesResponse = messagingApi.NumberOfMessagesResponse;
type NumberOfSentPushMessagesResponse = messagingApi.NumberOfMessagesResponse;
type NumberOfSentMulticastMessagesResponse = messagingApi.NumberOfMessagesResponse;
type NumberOfSentBroadcastMessagesResponse = messagingApi.NumberOfMessagesResponse;
declare const LineBotSDKError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => import("effect/Cause").YieldableError & {
    readonly _tag: "LineBotSDKError";
} & Readonly<A>;
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
export declare class LineBotSDKError extends LineBotSDKError_base<{
    readonly error: unknown;
}> {
}
/**
 * The interface that defines all available LINE Bot SDK methods.
 * Each method is wrapped in an Effect for better error handling and composability.
 *
 * @since 1.0.0
 * @category models
 */
export interface MessagingApiInterface {
    pushMessage: (pushMessageRequest: PushMessageRequest, xLineRetryKey?: string) => Effect.Effect<PushMessageResponse, LineBotSDKError, never>;
    replyMessage: (replyMessageRequest: ReplyMessageRequest, xLineRetryKey?: string) => Effect.Effect<ReplyMessageResponse, LineBotSDKError, never>;
    multicast: (multicastRequest: MulticastRequest, xLineRetryKey?: string) => Effect.Effect<MulticastResponse, LineBotSDKError, never>;
    broadcast: (broadcastRequest: BroadcastRequest, xLineRetryKey?: string) => Effect.Effect<BroadcastResponse, LineBotSDKError, never>;
    narrowcast: (narrowcastRequest: NarrowcastRequest, xLineRetryKey?: string) => Effect.Effect<NarrowcastResponse, LineBotSDKError, never>;
    getProfile: (userId: string) => Effect.Effect<ProfileResponse, LineBotSDKError, never>;
    getGroupMemberProfile: (groupId: string, userId: string) => Effect.Effect<GroupMemberProfileResponse, LineBotSDKError, never>;
    getRoomMemberProfile: (roomId: string, userId: string) => Effect.Effect<RoomMemberProfileResponse, LineBotSDKError, never>;
    leaveGroup: (groupId: string) => Effect.Effect<void, LineBotSDKError, never>;
    leaveRoom: (roomId: string) => Effect.Effect<void, LineBotSDKError, never>;
    getDefaultRichMenuId: () => Effect.Effect<DefaultRichMenuIdResponse, LineBotSDKError, never>;
    setDefaultRichMenu: (richMenuId: string) => Effect.Effect<SetDefaultRichMenuResponse, LineBotSDKError, never>;
    cancelDefaultRichMenu: () => Effect.Effect<CancelDefaultRichMenuResponse, LineBotSDKError, never>;
    issueLinkToken: (userId: string) => Effect.Effect<IssueLinkTokenResponse, LineBotSDKError, never>;
    getNumberOfSentReplyMessages: (date: string) => Effect.Effect<NumberOfSentReplyMessagesResponse, LineBotSDKError, never>;
    getNumberOfSentPushMessages: (date: string) => Effect.Effect<NumberOfSentPushMessagesResponse, LineBotSDKError, never>;
    getNumberOfSentMulticastMessages: (date: string) => Effect.Effect<NumberOfSentMulticastMessagesResponse, LineBotSDKError, never>;
    getNumberOfSentBroadcastMessages: (date: string) => Effect.Effect<NumberOfSentBroadcastMessagesResponse, LineBotSDKError, never>;
}
declare const MessagingApi_base: Context.TagClass<MessagingApi, "@effect-line/MessagingApi", MessagingApiInterface>;
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
export declare class MessagingApi extends MessagingApi_base {
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
    static readonly live: (channelAccessToken: string) => Layer.Layer<MessagingApi, LineBotSDKError, never>;
}
export {};
//# sourceMappingURL=index.d.ts.map