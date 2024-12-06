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
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
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
export class LineBotSDKError extends Data.TaggedError("LineBotSDKError") {
}
/**
 * Converts a promise-returning function into an Effect-based function.
 * Automatically handles errors by wrapping them in LineBotSDKError.
 *
 * @since 1.0.0
 * @category utils
 * @internal
 */
const effectify = (f) => (...args) => Effect.tryPromise({
    try: () => f(...args),
    catch: (error) => new LineBotSDKError({ error })
});
/**
 * Creates a new MessagingApi instance with the provided channel access token.
 *
 * @since 1.0.0
 * @category constructors
 * @internal
 */
const makeMessagingApi = (channelAccessToken) => Effect.try({
    try: () => {
        const client = new messagingApi.MessagingApiClient({ channelAccessToken });
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
        };
    },
    catch: (error) => new LineBotSDKError({ error })
});
/**
 * Creates a live MessagingApi instance with the provided channel access token.
 *
 * @since 1.0.0
 * @category constructors
 * @internal
 */
const makeLive = (channelAccessToken) => Effect.gen(function* (_) {
    return yield* _(makeMessagingApi(channelAccessToken));
});
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
export class MessagingApi extends Context.Tag("@effect-line/MessagingApi")() {
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
    static live = (channelAccessToken) => Layer.effect(MessagingApi, makeLive(channelAccessToken));
}
//# sourceMappingURL=index.js.map