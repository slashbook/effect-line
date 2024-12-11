import type { MulticastRequest, PushMessageRequest, PushMessageResponse } from "@line/bot-sdk/dist/messaging-api/api.js"
import { Effect } from "effect"
import type { MessagingApiInterface } from "../src/MessagingApi.js"

export class TestMessagingApi implements MessagingApiInterface {
  private pushMessageCalls: Array<{ id: string; request: PushMessageRequest; retryKey?: string }> = []
  private multicastCalls: Array<{ id: string; request: MulticastRequest; retryKey?: string }> = []

  pushMessage(
    pushMessageRequest: PushMessageRequest,
    xLineRetryKey?: string
  ): Effect.Effect<PushMessageResponse, never, never> {
    this.pushMessageCalls.push({
      id: Math.random().toString(),
      request: pushMessageRequest,
      retryKey: xLineRetryKey || ""
    })
    return Effect.succeed({ sentMessages: this.pushMessageCalls })
  }

  multicast(
    multicastRequest: MulticastRequest,
    xLineRetryKey?: string
  ): Effect.Effect<PushMessageResponse, never, never> {
    this.multicastCalls.push({
      id: Math.random().toString(),
      request: multicastRequest,
      retryKey: xLineRetryKey || ""
    })
    return Effect.succeed({ sentMessages: this.multicastCalls })
  }

  getPushMessageCalls() {
    return this.pushMessageCalls
  }

  getMulticastCalls() {
    return this.multicastCalls
  }

  reset() {
    this.pushMessageCalls = []
    this.multicastCalls = []
  }
}
