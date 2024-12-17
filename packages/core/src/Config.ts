/**
 * Configuration module for LINE API credentials
 * 
 * @since 0.1.0
 */
import { Config } from "effect"
import type { Redacted } from "effect/Redacted"

/**
 * Configuration class for LINE API credentials
 * Contains the necessary authentication details for interacting with LINE APIs
 *
 * @since 0.1.0
 * @category models
 * @example
 * ```ts
 * const config = new LineConfig(
 *   "1234567890",
 *   Redacted.redact("secret"),
 *   Redacted.redact("token")
 * )
 * ```
 */
export class LineConfig {
  constructor(
    readonly channelId: string,
    readonly channelSecret: Redacted<string>,
    readonly channelAccessToken: Redacted<string>
  ) {}
}

/**
 * Configuration for LINE Channel settings
 * Reads channel configuration from environment variables:
 * - LINE_CHANNEL_ID
 * - LINE_CHANNEL_SECRET
 * - LINE_CHANNEL_ACCESS_TOKEN
 *
 * @since 0.1.0
 * @category config
 */
const lineChannelConfig = Config.all([
  Config.withDescription(Config.string("CHANNEL_ID"), "LINE Channel ID"),
  Config.withDescription(Config.redacted(Config.string("CHANNEL_SECRET")), "LINE Channel Secret"),
  Config.withDescription(Config.redacted(Config.string("CHANNEL_ACCESS_TOKEN")), "LINE Channel Access Token")
])

/**
 * Main configuration for LINE API
 * Combines all LINE-related configurations and creates a LineConfig instance
 *
 * @since 0.1.0
 * @category config
 * @example
 * ```ts
 * const program = Effect.gen(function*($) {
 *   const lineConfig = yield* $(Config.unwrap(config))
 *   // Use lineConfig.channelId, lineConfig.channelSecret, etc.
 * })
 * ```
 */
export const config = Config.map(
  Config.nested(lineChannelConfig, "LINE"),
  ([channelId, channelSecret, channelAccessToken]) => new LineConfig(channelId, channelSecret, channelAccessToken)
)
