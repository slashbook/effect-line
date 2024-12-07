#!/usr/bin/env node

import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all arguments passed to the script
const args = process.argv.slice(2);

// Construct the command to run the CLI through pnpm
const pnpmArgs = ['--filter', '@effect-line/cli', 'exec', 'node', '--enable-source-maps', './dist/index.js', ...args];

// Spawn pnpm process
const proc = spawn('pnpm', pnpmArgs, {
  stdio: 'inherit',
  cwd: resolve(__dirname, '..')
});

// Handle process exit
proc.on('exit', (code) => {
  process.exit(code);
});
