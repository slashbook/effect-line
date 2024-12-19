# @effect-line/core 0.1.0 Specification

## Overview

Core utilities and configurations for Effect Line. This package provides the foundation for building LINE Messaging API applications using the Effect ecosystem.

## Features

### Configuration Management

```typescript
interface Config {
  channelAccessToken: string
  channelSecret: string
}
```

### Core Types

- Common type definitions shared across packages
- Type-safe configuration interfaces

### Error Types

Standard error types for LINE API interactions:

- Network errors
- Authentication errors

## Architecture

### Design Principles

1. **Type Safety**: Comprehensive TypeScript types
2. **Effect Integration**: Native Effect ecosystem support

### Dependencies

- `effect`: Core Effect functionality
- `@effect/platform`: Platform abstractions
- `@effect/platform-node`: Node.js runtime support

## Usage Examples

### Configuration

```typescript
import { Config } from "@effect-line/core"

const config = Config.make({
  channelAccessToken: "your-token",
  channelSecret: "your-secret"
})
```
