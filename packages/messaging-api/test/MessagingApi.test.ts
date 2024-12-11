import * as ConfigProvider from "effect/ConfigProvider"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import { beforeEach, describe, expect, it } from "vitest"
import { MessagingApi } from "../src/MessagingApi.js"
import { TestMessagingApi } from "./TestMessagingApi.js"

describe("MessagingApi", () => {
  const mockChannelAccessToken = "mock-channel-access-token"
  const mockUserId = "mock-user-id"
  const mockMessage = {
    type: "text" as const,
    text: "Hello, world!"
  }

  const testApi = new TestMessagingApi()

  beforeEach(() => {
    testApi.reset()
  })

  const createMockConfigLayer = (channelAccessToken: string = mockChannelAccessToken) => {
    const mockConfigProvider = ConfigProvider.fromMap(
      new Map([
        ["LINE_CHANNEL_ID", "mock-channel-id"],
        ["LINE_CHANNEL_SECRET", "mock-channel-secret"],
        ["LINE_CHANNEL_ACCESS_TOKEN", channelAccessToken]
      ])
    )
    return Layer.setConfigProvider(mockConfigProvider)
  }

  const createTestLayer = Layer.succeed(MessagingApi, testApi)

  describe("pushMessage", () => {
    it("should successfully send a message", async () => {
      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        const response = yield* api.pushMessage({
          to: mockUserId,
          messages: [mockMessage]
        })
        return response
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )

      const calls = testApi.getPushMessageCalls()
      expect(calls).toHaveLength(1)
      expect(calls[0].request).toEqual({
        to: mockUserId,
        messages: [mockMessage]
      })
    })

    it("should handle optional xLineRetryKey", async () => {
      const retryKey = "retry-key-123"
      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        const response = yield* api.pushMessage(
          {
            to: mockUserId,
            messages: [mockMessage]
          },
          retryKey
        )
        return response
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )

      const calls = testApi.getPushMessageCalls()
      expect(calls).toHaveLength(1)
      expect(calls[0].request).toStrictEqual({
        to: mockUserId,
        messages: [mockMessage]
      })
      expect(calls[0].retryKey).toEqual(retryKey)
    })

    it("should validate message parameters", async () => {
      const invalidMessage = {
        type: "text" as const,
        text: "" // Empty text should be invalid
      }

      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        return yield* api.pushMessage({
          to: mockUserId,
          messages: [invalidMessage]
        })
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )

      const calls = testApi.getPushMessageCalls()
      expect(calls).toHaveLength(1)
      expect(calls[0].request.messages[0]).toEqual(invalidMessage)
    })
  })

  describe("multicast", () => {
    const mockUserIds = ["user-1", "user-2", "user-3"]

    it("should successfully send a message to multiple users", async () => {
      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        const response = yield* api.multicast({
          to: mockUserIds,
          messages: [mockMessage]
        })
        return response
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )

      const calls = testApi.getMulticastCalls()
      expect(calls).toHaveLength(1)
      expect(calls[0].request).toEqual({
        to: mockUserIds,
        messages: [mockMessage]
      })
    })

    it("should handle retry key for multicast", async () => {
      const retryKey = "test-retry-key"
      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        const response = yield* api.multicast({
          to: mockUserIds,
          messages: [mockMessage]
        }, retryKey)
        return response
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )

      const calls = testApi.getMulticastCalls()
      expect(calls).toHaveLength(1)
      expect(calls[0].retryKey).toBe(retryKey)
    })
  })
})
