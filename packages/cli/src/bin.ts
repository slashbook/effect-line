#!/usr/bin/env node

import { MessagingApi } from "@effect-line/messaging-api/MessagingApi"
import { NodeContext, NodeRuntime } from "@effect/platform-node"
import { Effect, Layer } from "effect"
import { cli } from "./Cli.js"

const MainLive = MessagingApi.layer.pipe(
  Layer.merge(NodeContext.layer)
)

const program = cli(process.argv).pipe(
  Effect.provide(MainLive)
)

NodeRuntime.runMain(program)
