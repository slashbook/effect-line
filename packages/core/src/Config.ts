/**
 * @since 0.0.1
 */
import { Config } from "effect"
import type { Redacted } from "effect/Redacted"

/**
 * Configuration for LINE API credentials
 *
 * @since 0.0.1
 * @category models
 */
export class LineConfig {
  constructor(
    readonly channelId: string,
    readonly channelSecret: Redacted<string>,
    readonly channelAccessToken: Redacted<string>
  ) {}
}

/**
 * @since 0.0.1
 * @category config
 */
const lineChannelConfig = Config.all([
  Config.withDescription(Config.string("CHANNEL_ID"), "LINE Channel ID"),
  Config.withDescription(Config.redacted(Config.string("CHANNEL_SECRET")), "LINE Channel Secret"),
  Config.withDescription(Config.redacted(Config.string("CHANNEL_ACCESS_TOKEN")), "LINE Channel Access Token")
])

/**
 * @since 0.0.1
 * @category config
 */
export const config = Config.map(
  Config.nested(lineChannelConfig, "LINE"),
  ([channelId, channelSecret, channelAccessToken]) => new LineConfig(channelId, channelSecret, channelAccessToken)
)
