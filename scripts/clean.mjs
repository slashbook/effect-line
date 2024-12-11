import * as Glob from "glob"
import * as Fs from "node:fs"

const dirs = [".", ...Glob.sync("packages/*/")]
dirs.forEach((pkg) => {
  // Clean build artifacts
  const buildDirs = [".tsbuildinfo", "build", "dist", "coverage"]
  buildDirs.forEach((dir) => {
    Fs.rmSync(`${pkg}/${dir}`, { recursive: true, force: true })
  })

  // Clean any stray declaration files in src
  const declarationFiles = Glob.sync(`${pkg}/src/**/*.{d.ts,d.ts.map}`)
  declarationFiles.forEach((file) => {
    Fs.rmSync(file, { force: true })
  })
})
