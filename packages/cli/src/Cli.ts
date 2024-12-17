/**
 * @since 0.1.0
 */
import { config } from "@effect-line/core"
import { MessagingApi } from "@effect-line/messaging-api"
import { Command, Options } from "@effect/cli"
import { Console, Effect } from "effect"

/**
 * Command-line option for specifying a single user ID
 * 
 * @since 0.1.0
 * @category options
 * @example
 * ```ts
 * --userId "U1234567890" // or
 * -u "U1234567890"
 * ```
 */
const userId = Options.text("userId").pipe(
  Options.withDescription("The user ID to send the message to"),
  Options.withAlias("u")
)

/**
 * Command-line option for specifying multiple user IDs
 * 
 * @since 0.1.0
 * @category options
 * @example
 * ```ts
 * --userIds "U1234567890,U0987654321" // or
 * -U "U1234567890,U0987654321"
 * ```
 */
const userIds = Options.text("userIds").pipe(
  Options.withDescription("The user IDs to send the message to (comma-separated)"),
  Options.withAlias("U")
)

/**
 * Command-line option for specifying message content
 * Can be used multiple times to send multiple messages
 * 
 * @since 0.1.0
 * @category options
 * @example
 * ```ts
 * --message "Hello" --message "World" // or
 * -m "Hello" -m "World"
 * ```
 */
const message = Options.text("message").pipe(
  Options.withDescription("The messages to send"),
  Options.withAlias("m"),
  Options.repeated
)

/**
 * Command for sending messages to a single user
 * 
 * @since 0.1.0
 * @category commands
 * @example
 * ```ts
 * effect-line push-message -u "U1234567890" -m "Hello" -m "World"
 * ```
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
 * Command for sending messages to multiple users
 * 
 * @since 0.1.0
 * @category commands
 * @example
 * ```ts
 * effect-line multicast -U "U1234567890,U0987654321" -m "Hello" -m "World"
 * ```
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
 * Command group for LINE Messaging API commands
 * 
 * @since 0.1.0
 * @category commands
 */
const messagingApiCommands = Command.make("messaging-api").pipe(
  Command.withDescription("LINE Messaging API commands"),
  Command.withSubcommands([pushMessageCommand, multicastCommand])
)

/**
 * The name of the command-line tool
 * 
 * @since 0.1.0
 * @category config
 */
const commandName = "effect-line"

/**
 * The version of the command-line tool
 * 
 * @since 0.1.0
 * @category config
 */
const commandVersion = "0.1.0"

/**
 * The description of the command-line tool
 * 
 * @since 0.1.0
 * @category config
 */
const commandDescription = "A command-line interface for interacting with LINE API."

/**
 * The main command-line command
 * 
 * @since 0.1.0
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
 * @since 0.1.0
 * @category main
 */
export const cli = Command.run(command, {
  name: commandName,
  version: commandVersion
})
