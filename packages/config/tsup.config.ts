import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    compilerOptions: {
      composite: false,
      incremental: false
    }
  },
  splitting: false,
  sourcemap: true,
  clean: true
})
