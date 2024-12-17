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
        yield* api.pushMessage({
          to: mockUserId,
          messages: [mockMessage]
        })

        const calls = testApi.getPushMessageCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual({
          to: mockUserId,
          messages: [mockMessage]
        })
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )
    })

    it("should handle optional xLineRetryKey", async () => {
      const retryKey = "retry-key-123"
      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.pushMessage(
          {
            to: mockUserId,
            messages: [mockMessage]
          },
          retryKey
        )

        const calls = testApi.getPushMessageCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toStrictEqual({
          to: mockUserId,
          messages: [mockMessage]
        })
        expect(calls[0].retryKey).toEqual(retryKey)
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )
    })

    it("should validate message parameters", async () => {
      const invalidMessage = {
        type: "text" as const,
        text: "" // Empty text should be invalid
      }

      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.pushMessage({
          to: mockUserId,
          messages: [invalidMessage]
        })

        const calls = testApi.getPushMessageCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request.messages[0]).toEqual(invalidMessage)
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )
    })
  })

  describe("multicast", () => {
    const mockUserIds = ["user-1", "user-2", "user-3"]

    it("should successfully send a message to multiple users", async () => {
      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.multicast({
          to: mockUserIds,
          messages: [mockMessage]
        })

        const calls = testApi.getMulticastCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual({
          to: mockUserIds,
          messages: [mockMessage]
        })
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )
    })

    it("should handle retry key for multicast", async () => {
      const retryKey = "test-retry-key"
      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.multicast({
          to: mockUserIds,
          messages: [mockMessage]
        }, retryKey)

        const calls = testApi.getMulticastCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].retryKey).toBe(retryKey)
      })

      await Effect.runPromise(
        program.pipe(
          Effect.provide(Layer.merge(createTestLayer, createMockConfigLayer()))
        )
      )
    })
  })

  describe("Default Layer", () => {
    const testApi = new TestMessagingApi()
    const TestLayer = Layer.succeed(MessagingApi, testApi)

    beforeEach(() => {
      testApi.reset()
    })

    it("should successfully send a push message", async () => {
      const mockMessage = {
        to: "USER_ID",
        messages: [{ type: "text", text: "Hello!" }]
      }

      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.pushMessage(mockMessage)

        const calls = testApi.getPushMessageCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual(mockMessage)
      })

      await program.pipe(
        Effect.provide(TestLayer),
        Effect.runPromise
      )
    })

    it("should successfully send a multicast message", async () => {
      const mockMulticastMessage = {
        to: ["USER_ID1", "USER_ID2"],
        messages: [{ type: "text", text: "Hello!" }]
      }

      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.multicast(mockMulticastMessage)

        const calls = testApi.getMulticastCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual(mockMulticastMessage)
      })

      await program.pipe(
        Effect.provide(TestLayer),
        Effect.runPromise
      )
    })
  })

  describe("Custom Layer", () => {
    const testApi = new TestMessagingApi()
    const TestLayer = Layer.succeed(MessagingApi, testApi)

    beforeEach(() => {
      testApi.reset()
    })

    it("should successfully send a push message with custom token", async () => {
      const mockMessage = {
        to: "USER_ID",
        messages: [{ type: "text", text: "Hello!" }]
      }

      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.pushMessage(mockMessage)

        const calls = testApi.getPushMessageCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual(mockMessage)
      })

      await program.pipe(
        Effect.provide(TestLayer),
        Effect.runPromise
      )
    })

    it("should successfully send a multicast message with custom token", async () => {
      const mockMulticastMessage = {
        to: ["USER_ID1", "USER_ID2"],
        messages: [{ type: "text", text: "Hello!" }]
      }

      const program = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.multicast(mockMulticastMessage)

        const calls = testApi.getMulticastCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual(mockMulticastMessage)
      })

      await program.pipe(
        Effect.provide(TestLayer),
        Effect.runPromise
      )
    })
  })

  describe("Multiple Layers", () => {
    const testApi1 = new TestMessagingApi()
    const testApi2 = new TestMessagingApi()
    const TestLayer1 = Layer.succeed(MessagingApi, testApi1)
    const TestLayer2 = Layer.succeed(MessagingApi, testApi2)

    beforeEach(() => {
      testApi1.reset()
      testApi2.reset()
    })

    it("should handle multiple bots independently", async () => {
      const mockMessage = {
        to: "USER_ID",
        messages: [{ type: "text", text: "Hello!" }]
      }

      const program1 = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.pushMessage(mockMessage)

        const calls = testApi1.getPushMessageCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual(mockMessage)
      })

      const program2 = Effect.gen(function*() {
        const api = yield* MessagingApi
        yield* api.pushMessage(mockMessage)

        const calls = testApi2.getPushMessageCalls()
        expect(calls).toHaveLength(1)
        expect(calls[0].request).toEqual(mockMessage)
      })

      await Promise.all([
        program1.pipe(
          Effect.provide(TestLayer1),
          Effect.runPromise
        ),
        program2.pipe(
          Effect.provide(TestLayer2),
          Effect.runPromise
        )
      ])
    })
  })
})
