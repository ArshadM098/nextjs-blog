# Shower Thoughts 🚿💭

A mobile-first web app for sharing random shower thoughts, built with Next.js 15 and featuring beautiful, aesthetically-focused themes.

## Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layouts
- **Character-Limited Posts**: Share concise thoughts (280 characters max)
- **Beautiful Themes**: Four aesthetically-focused themes:
  - ☀️ Light - Clean and bright
  - 🌙 Dark - Easy on the eyes
  - 🌅 Sunset - Warm and inviting
  - 🌌 Midnight - Deep and mysterious
- **Cookie-Based Theme Persistence**: Your theme preference is saved across sessions
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Minimal Design**: Focus on proper spacing and typography
- **Local Storage**: Your thoughts persist in the browser
- **Fully Tested**: Comprehensive unit tests with Jest

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Testing**: Jest + React Testing Library
- **State**: React Hooks + Local Storage
- **Theme Persistence**: js-cookie

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
├── app/
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/
│   ├── ThemeSelector.tsx  # Theme switcher component
│   ├── ThoughtCard.tsx    # Individual thought display
│   ├── ThoughtInput.tsx   # Input form for new thoughts
│   └── ThoughtsList.tsx   # List of thoughts
├── hooks/
│   └── useLocalStorage.ts # Local storage hook
├── lib/
│   └── theme-context.tsx  # Theme context provider
├── types/
│   ├── theme.ts           # Theme types and definitions
│   └── thought.ts         # Thought types
└── __tests__/
    ├── components/        # Component tests
    └── hooks/             # Hook tests
```

## Component Design

All components are designed with testability in mind:

- **Pure Components**: Minimal side effects
- **Props-Based**: Easy to test different states
- **Accessibility**: ARIA labels and semantic HTML
- **Type Safety**: Full TypeScript coverage

## Theme System

The app uses a sophisticated theme system with:

- CSS variables for dynamic theming
- Cookie-based persistence (365 days)
- Smooth transitions between themes
- No flash of unstyled content (FOUC)

## Design Principles

1. **Mobile First**: All components are designed for mobile, then enhanced for desktop
2. **Minimal**: Clean interfaces with generous whitespace
3. **Typography**: Careful attention to font sizing and line height
4. **Animation**: Smooth, purposeful animations that enhance UX
5. **Accessibility**: Semantic HTML and ARIA attributes throughout

## License

MIT
