# Brilo Gutenberg Toolkit

A comprehensive toolkit for developing WordPress Gutenberg blocks with React and TypeScript. This package provides reusable components, hooks, and utilities to streamline the development of custom Gutenberg blocks.

## Installation

```bash
npm install @brilo/gutenberg-toolkit
```

or

```bash
yarn add @brilo/gutenberg-toolkit
```

## Features

- 🎨 **Pre-built Components** - Ready-to-use controls for common Gutenberg block patterns
- 🔧 **Utility Hooks** - Custom hooks for block content manipulation and media handling
- 📝 **TypeScript Support** - Full TypeScript definitions included
- ⚡ **WordPress Integration** - Seamless integration with WordPress block editor APIs
- 🎯 **Type-Safe** - Comprehensive type definitions for all components and utilities

## Components

### ButtonControl

A control for managing button attributes within your Gutenberg blocks.

```typescript
import { ButtonControl, buttonDefault } from '@brilo/gutenberg-toolkit';

// Usage in your block
<ButtonControl
  button={attributes.button}
  setAttributes={setAttributes}
/>
```

### ButtonGroupControl

Manage groups of buttons with drag-and-drop sorting support.

```typescript
import { ButtonGroupControl, buttonGroupDefault } from '@brilo/gutenberg-toolkit';
```

### HeaderControl / HeaderControlEdit

Components for managing header content with customizable styles and heading levels.

```typescript
import {
  HeaderControl,
  HeaderControlEdit,
  headerDefault,
  HEADING_STYLES,
  VARIANTS
} from '@brilo/gutenberg-toolkit';
```

### HeadingLevelControl

A control for selecting heading levels (H1-H6).

```typescript
import {
  HeadingLevelControl,
  HEADING_LEVELS,
  headingLevelDefault
} from '@brilo/gutenberg-toolkit';
```

### MediaControl / MediaControlEdit

Components for handling media uploads and selection.

```typescript
import {
  MediaControl,
  MediaControlEdit,
  imageDefault
} from '@brilo/gutenberg-toolkit';
```

### PriceControl / PriceControlEdit

Specialized components for managing pricing information.

```typescript
import {
  PriceControl,
  PriceControlEdit,
  priceDefault
} from '@brilo/gutenberg-toolkit';
```

### SelectPostsControl

A control for selecting and managing WordPress posts within blocks.

```typescript
import { SelectPostsControl } from '@brilo/gutenberg-toolkit';
```

### ContentWrapper

A wrapper component for block content with consistent styling.

```typescript
import { ContentWrapper } from '@brilo/gutenberg-toolkit';
```

## Hooks

### getMediaHandlers

Custom hook for handling media uploads and changes.

```typescript
import { getMediaHandlers } from '@brilo/gutenberg-toolkit';

const mediaHandlers = getMediaHandlers(/* ... */);
```

### getBlockContentSerialized

Utility hook for serializing block content.

```typescript
import { getBlockContentSerialized } from '@brilo/gutenberg-toolkit';

const serializedContent = getBlockContentSerialized(/* ... */);
```

### getChildBlockAttributes

Hook for accessing and managing child block attributes.

```typescript
import { getChildBlockAttributes } from '@brilo/gutenberg-toolkit';

const childAttributes = getChildBlockAttributes(/* ... */);
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All components and hooks are fully typed for the best development experience.

### Available Types

```typescript
import type {
  Button,
  Header,
  HeaderHeadingLevel,
  HeadingLevel,
  HeadingHigherLevel,
  HeadingStyle,
  Heading,
  Variant,
  Media,
  Image,
  HeadingLevelControlProps,
} from '@brilo/gutenberg-toolkit';
```

### Default Values

The package exports default values for various components:

```typescript
import {
  buttonDefault,
  buttonGroupDefault,
  headerDefault,
  headingLevelDefault,
  imageDefault,
  priceDefault,
} from '@brilo/gutenberg-toolkit';
```

### Constants

```typescript
import {
  HEADING_STYLES,
  HEADING_LEVELS,
  HEADING_HIGHER_LEVELS,
  HEADER_HEADING_LEVELS,
  VARIANTS,
} from '@brilo/gutenberg-toolkit';
```

## Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint:js
npm run lint:css
```

### Format

```bash
npm run format
```

## Requirements

- WordPress 5.0+
- React 18.3+
- Node.js 14+

## Dependencies

This package relies on:
- `@wordpress/api-fetch` - For API interactions
- `@dnd-kit/core` & `@dnd-kit/sortable` - For drag-and-drop functionality

## License

See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/ImKubass/brilo-gutenberg-toolkit](https://github.com/ImKubass/brilo-gutenberg-toolkit)

## Author

Created and maintained by Brilo team.
