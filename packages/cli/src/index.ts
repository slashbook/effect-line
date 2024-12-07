import { config } from "@effect-line/config"
import { MessagingApi } from "@effect-line/messaging-api"
import { Command, Options } from "@effect/cli"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Console, Effect, Layer } from "effect"

const userId = Options.text("userId").pipe(
  Options.withDescription("The user ID to send the message to"),
  Options.withAlias("u")
)

const message = Options.text("message").pipe(
  Options.withDescription("The messages to send"),
  Options.withAlias("m"),
  Options.repeated
)

const pushMessageCommand = Command.make("push-message", { userId, message }).pipe(
  Command.withDescription("Send messages to a user"),
  Command.withHandler(({ message, userId }) => {
    return Effect.gen(function*($) {
      const api = yield* $(MessagingApi)
      const messages = message.map((m) => ({ type: "text", text: m }))
      const result = yield* $(api.pushMessage({ to: userId, messages }))
      yield* $(Console.log(`${result.sentMessages.length} messages sent successfully`))
    })
  })
)

const commandName = "effect-line"
const commandVersion = "0.0.1"
const commandDescription = "A command-line interface for interacting with LINE API."

// Define the top-level command
const command = Command.make(commandName).pipe(
  Command.withHandler(() =>
    Effect.gen(function*() {
      const cfg = yield* config
      yield* Console.log(`Running ${commandName} with Channel ID: ${cfg.channelId}`)
    })
  ),
  Command.withDescription(commandDescription),
  Command.withSubcommands([pushMessageCommand])
)

// Set up the CLI application
const cli = Command.run(command, {
  name: commandName,
  version: commandVersion
})

// Prepare and run the CLI application
cli(process.argv).pipe(Effect.provide(Layer.merge(NodeContext.layer, MessagingApi.layer)), NodeRuntime.runMain)
