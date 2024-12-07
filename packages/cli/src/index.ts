// Import necessary modules from the libraries
import { Command } from "@effect/cli"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Console, Effect } from "effect"

// Define the top-level command
const command = Command.make("effect-line", {}, () => Console.log("Hello World"))

// Set up the CLI application
const cli = Command.run(command, {
  name: "Effect Line CLI",
  version: "0.0.1"
})

// Prepare and run the CLI application
cli(process.argv).pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain)
