import type { PushMessageRequest, PushMessageResponse } from "@line/bot-sdk/dist/messaging-api/api.js"
import { Effect } from "effect"
import type { MessagingApiInterface } from "../src/index.js"

export class TestMessagingApi implements MessagingApiInterface {
  private pushMessageCalls: Array<{ id: string; request: PushMessageRequest; retryKey?: string }> = []

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

  getPushMessageCalls() {
    return this.pushMessageCalls
  }

  reset() {
    this.pushMessageCalls = []
  }
}
