# JoelFit

A personal health & fitness framework monorepo focused on systematic meal prep and exercise tracking.

## Overview

JoelFit is a personal reference implementation for my health and fitness routines. It's built with a focus on systematic organization, clear documentation, and maintainable code. This isn't a marketing site - it's a practical tool for personal use that can be shared when collaboration is needed.

### Core Features

- **High-Protein Meal Prep OS**: A systematic 5-day meal prep framework with 1-2-3 rotation
- **Shoulder Program**: Progressive rehab routine focusing on mobility, stability, and strength
- **Container System**: Standardized storage and portion control
- **Quality Control**: Temperature monitoring and food safety tracking

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: shadcn/ui
- **Package Manager**: pnpm
- **Monorepo Tools**: Turborepo

## Project Structure

```
joelfit/
├── apps/
│   └── web/               # Main Next.js application
│       ├── app/           # App router pages
│       ├── components/    # React components
│       ├── lib/          # Utility functions
│       ├── styles/       # Global styles
│       └── prompts/      # AI prompt templates
├── packages/             # Shared packages
│   ├── ui/              # Component library
│   ├── config/          # Shared configurations
│   └── tsconfig/        # TypeScript configs
└── tooling/             # Build and dev tools
```

## Development Principles

### TypeScript Practices
- Use `type` for composition, `interface` for extension
- Zod for runtime validation
- No enums - use const objects with `as const`
- Explicit return types on exported functions
- Leverage inference for internal implementation

### React & Next.js
- Server Components by default
- `use client` only when needed
- Small, focused components
- React Query for client-side data
- `next-safe-action` for server actions
- `nuqs` for URL state management

### State Management
- Server state > Client state
- URL state > Local state
- Minimize client-side state
- React Query for async state
- URL params for shareable state

### Styling
- Tailwind first
- Mobile first
- Dark mode support
- CSS variables for theming
- Follow existing component patterns

## Getting Started

1. **Prerequisites**
   ```bash
   node >= 18.0.0
   pnpm >= 8.0.0
   ```

2. **Installation**
   ```bash
   pnpm install
   ```

3. **Development**
   ```bash
   pnpm dev
   ```

4. **Build**
   ```bash
   pnpm build
   ```

## Development Workflow

### Branch Strategy
- Main branch is protected
- Feature branches for development
- PRs require review
- Conventional commits required

### Commit Convention
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semi colons, etc
refactor: code change that neither fixes a bug nor adds a feature
test: adding tests
chore: maintain
```

### Code Organization
- Group by feature when possible
- Keep related code close
- One component per file
- Colocate tests with code

## Monorepo Guidelines

### Package Management
- Use workspace protocols (`workspace:*`)
- Hoist common dependencies
- Lock all workspace versions
- Document dependency decisions

### Shared Code
- Keep package boundaries clean
- Share types, not implementations
- Build in dependency order
- No circular dependencies

## Quality Control

### Testing
- Unit test business logic
- Integration test critical paths
- E2E test user flows
- Mock external dependencies

### Performance
- Lighthouse scores > 90
- Core Web Vitals monitoring
- Bundle size budgets
- Image optimization

### Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML
- Keyboard navigation
- Screen reader testing

## Contributing

This is a personal project, but if you find issues:

1. Create an issue describing the problem
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Submit a PR with a clear description

## License

MIT - Feel free to use this for your own personal projects.
