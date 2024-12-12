# @effect-line/domain

> Shared domain types and interfaces for LINE Platform integration

## Overview

This package contains shared domain models, types, and interfaces used across the Effect Line packages. It provides:

- Type definitions for LINE Platform APIs
- Shared interfaces for LINE services
- Common data models and schemas

## Installation

```bash
pnpm add @effect-line/domain
```

## Usage

```typescript
import { Message, WebhookEvent } from "@effect-line/domain"

// Use the types in your application
const message: Message = {
  type: "text",
  text: "Hello, world!"
}
```

## License

MIT License - see the [LICENSE](LICENSE) file for details