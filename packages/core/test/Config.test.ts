import { Config, Effect, Redacted } from "effect"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { config } from "../src/Config"

describe("LineConfig", () => {
  beforeEach(() => {
    process.env.LINE_CHANNEL_ID = "test-channel-id"
    process.env.LINE_CHANNEL_SECRET = "test-channel-secret"
    process.env.LINE_CHANNEL_ACCESS_TOKEN = "test-channel-access-token"
  })

  afterEach(() => {
    delete process.env.LINE_CHANNEL_ID
    delete process.env.LINE_CHANNEL_SECRET
    delete process.env.LINE_CHANNEL_ACCESS_TOKEN
  })

  it("should load config from environment variables", () => {
    const program = Effect.gen(function*($) {
      const lineConfig = yield* $(Config.unwrap(config))
      expect(lineConfig.channelId).toBe("test-channel-id")
      expect(Redacted.value(lineConfig.channelSecret)).toBe("test-channel-secret")
      expect(Redacted.value(lineConfig.channelAccessToken)).toBe("test-channel-access-token")
    })

    return Effect.runPromise(program)
  })

  it("should fail when required environment variables are missing", () => {
    // Clear environment variables for this test
    delete process.env.LINE_CHANNEL_ID
    delete process.env.LINE_CHANNEL_SECRET
    delete process.env.LINE_CHANNEL_ACCESS_TOKEN

    const program = Effect.gen(function*($) {
      yield* $(Config.unwrap(config))
    })

    // Assert it throws with missing config error
    return expect(Effect.runPromise(program)).rejects.toThrowError(
      "(Missing data at LINE.CHANNEL_ID: \"Expected LINE_CHANNEL_ID to exist in the process context\") and (Missing data at LINE.CHANNEL_SECRET: \"Expected LINE_CHANNEL_SECRET to exist in the process context\") and (Missing data at LINE.CHANNEL_ACCESS_TOKEN: \"Expected LINE_CHANNEL_ACCESS_TOKEN to exist in the process context\")"
    )
  })
})
