import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  platform: "node",
  sourcemap: true,
  clean: true,
  dts: true,
  treeshake: true,
  minify: false,
  bundle: true,
  outDir: "dist",
  shims: true,
  banner: {
    js: "#!/usr/bin/env node"
  }
})
