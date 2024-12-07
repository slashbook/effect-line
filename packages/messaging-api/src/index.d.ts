/**
 * @since 1.0.0
 *
 * Effect-based wrapper for LINE Bot SDK's Messaging API
 */
import type { PushMessageRequest, PushMessageResponse } from "@line/bot-sdk/dist/messaging-api/api.js";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
declare const LineBotSDKError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => import("effect/Cause").YieldableError & {
    readonly _tag: "LineBotSDKError";
} & Readonly<A>;
/**
 * Represents errors that occur when interacting with the LINE Bot SDK.
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
    readonly pushMessage: (pushMessageRequest: PushMessageRequest, xLineRetryKey?: string | undefined) => Effect.Effect<PushMessageResponse, LineBotSDKError, never>;
}
declare const MessagingApi_base: Context.TagClass<MessagingApi, "@effect-line/MessagingApi", MessagingApiInterface>;
/**
 * The main entry point for interacting with the LINE Bot SDK.
 * Provides access to all messaging API methods in an Effect-based way.
 *
 * @since 1.0.0
 */
export declare class MessagingApi extends MessagingApi_base {
    static readonly layer: Layer.Layer<MessagingApi, LineBotSDKError | import("effect/ConfigError").ConfigError, never>;
}
export {};
//# sourceMappingURL=index.d.ts.map