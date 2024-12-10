import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  platform: "node",
  sourcemap: true,
  clean: true,
  dts: false,
  treeshake: true,
  minify: false,
  bundle: true,
  external: [
    // Keep Effect packages external to avoid duplication
    "@effect/cli",
    "@effect/platform-node",
    "effect"
  ],
  outDir: "dist",
  shims: true,
  banner: {
    js: "#!/usr/bin/env node"
  }
})
