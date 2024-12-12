/**
 * @since 0.0.1
 */
import { config } from "@effect-line/core"
import { MessagingApi } from "@effect-line/messaging-api"
import { Command, Options } from "@effect/cli"
import { Console, Effect } from "effect"

/**
 * @since 0.0.1
 * @category options
 */
const userId = Options.text("userId").pipe(
  Options.withDescription("The user ID to send the message to"),
  Options.withAlias("u")
)

/**
 * @since 0.0.1
 * @category options
 */
const userIds = Options.text("userIds").pipe(
  Options.withDescription("The user IDs to send the message to (comma-separated)"),
  Options.withAlias("U")
)

/**
 * @since 0.0.1
 * @category options
 */
const message = Options.text("message").pipe(
  Options.withDescription("The messages to send"),
  Options.withAlias("m"),
  Options.repeated
)

/**
 * @since 0.0.1
 * @category commands
 */
const pushMessageCommand = Command.make("push-message", { userId, message }).pipe(
  Command.withDescription("Send messages to a user"),
  Command.withHandler(({ message, userId }) => {
    return Effect.gen(function*() {
      const api = yield* MessagingApi
      const messages = message.map((m) => ({ type: "text" as const, text: m }))
      const result = yield* api.pushMessage({ to: userId, messages })
      yield* Console.log(`${result.sentMessages.length} messages sent successfully`)
    }).pipe(Effect.catchAll((error) => Console.error("Failed to send message:", error)))
  })
)

/**
 * @since 0.0.1
 * @category commands
 */
const multicastCommand = Command.make("multicast", { userIds, message }).pipe(
  Command.withDescription("Send messages to multiple users"),
  Command.withHandler(({ message, userIds }) => {
    return Effect.gen(function*() {
      const api = yield* MessagingApi
      const messages = message.map((m) => ({ type: "text" as const, text: m }))
      const to = userIds.split(",").map((id) => id.trim())
      yield* api.multicast({ to, messages })
      yield* Console.log(`The message sent successfully to ${to.length} users`)
    }).pipe(Effect.catchAll((error) => Console.error("Failed to send message:", error)))
  })
)

/**
 * @since 0.0.1
 * @category commands
 */
const messagingApiCommands = Command.make("messaging-api").pipe(
  Command.withDescription("LINE Messaging API commands"),
  Command.withSubcommands([pushMessageCommand, multicastCommand])
)

/**
 * @since 0.0.1
 * @category config
 */
const commandName = "effect-line"

/**
 * @since 0.0.1
 * @category config
 */
const commandVersion = "0.0.1"

/**
 * @since 0.0.1
 * @category config
 */
const commandDescription = "A command-line interface for interacting with LINE API."

/**
 * @since 0.0.1
 * @category commands
 */
const command = Command.make(commandName).pipe(
  Command.withHandler(() =>
    Effect.gen(function*() {
      const cfg = yield* config
      yield* Console.log(`Running ${commandName} with Channel ID: ${cfg.channelId}`)
    })
  ),
  Command.withDescription(commandDescription),
  Command.withSubcommands([messagingApiCommands])
)

/**
 * The main CLI program that processes command-line arguments and executes the appropriate command.
 *
 * @since 0.0.1
 * @category main
 */
export const cli = Command.run(command, {
  name: commandName,
  version: commandVersion
})
