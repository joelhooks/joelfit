---
status: proposed
date: 2026-02-18
decision-makers: Joel Hooks
---

# ADR-0001: Modernize joelfit Stack and Refresh Design

## Context and Problem Statement

joelfit (joel.fit) is a personal health and fitness site running Next.js 15.1.6, React 19, Tailwind CSS 3, and shadcn/ui. The build has been broken on Vercel since January 2025 due to dead features (scrape, articles) depending on missing Upstash Redis config. The site uses Geist fonts, a "cyberpunk" CSS theme, and a mix of patterns from different eras of Next.js development.

**Trigger:** The site is actively being used again (shoulder PT program with embedded YouTube videos). Time to modernize the stack, drop dead weight, and give it a design refresh that matches its purpose — a personal fitness tool, not a generic dashboard.

## Decision Drivers

- **Next.js 15 → latest**: current version is 15.1.6, latest stable has significant improvements including native Turbopack, improved caching model, and React Server Components improvements
- **Tailwind CSS 3 → 4**: Tailwind v4 ships a new engine, CSS-first config, and automatic content detection — simpler setup, faster builds
- **shadcn/ui refresh**: current install is outdated (`@shadcn/ui: 0.0.4`, `shadcn-ui: 0.9.4`), needs migration to latest CLI and component versions
- **Design refresh**: current aesthetic is generic — Geist fonts + cyberpunk.css + default shadcn. A fitness/PT site should feel physical, functional, trustworthy
- **Dead code removal**: scrape, articles, Upstash Redis, PlanetScale DB, next-auth — all partially broken or unused. Strip to what's actually needed
- **Composition patterns**: current components use prop-heavy patterns (Exercise component has 6+ destructured props). Migrate to compound components and composition per Vercel patterns skill

## Considered Options

### Option A: Incremental — upgrade dependencies, keep structure
Bump Next.js, Tailwind, shadcn. Fix what breaks. Minimal design changes.

**Pro:** Low risk, fast.
**Con:** Doesn't address the composition issues or design staleness. Carries forward dead code.

### Option B: Clean sweep — strip to core, rebuild forward (recommended)
Remove all dead features. Upgrade to latest Next.js + Tailwind v4. Redesign the UI with a distinctive fitness aesthetic. Refactor components to use composition patterns.

**Pro:** Clean foundation, distinctive design, modern patterns.
**Con:** More work, but the site is small (~15 active pages).

### Option C: Rewrite in a different framework
Start over with Astro, Remix, etc.

**Pro:** Could pick best tool for content-heavy fitness site.
**Con:** Unnecessary — Next.js is fine for this, and the content model (exercises, meals) is already built.

## Decision

**Option B — Clean sweep.** The site is small enough that a focused modernization is cheaper than carrying tech debt forward.

## Implementation Plan

### Phase 1: Strip Dead Code
**Files to remove:**
- `src/app/chat/` — AI chat (unused)
- `src/lib/repositories/article/` — article repo (orphaned after scrape removal)
- `src/db/` — Drizzle/PlanetScale schema, seed, connection (no database needed)
- `src/server/auth.ts` — NextAuth config (no auth needed for personal site)
- `src/app/api/auth/` — auth API routes
- `src/app/api/` — all API routes (evaluate each, likely all dead)
- `src/app/profile/` — profile page (auth-dependent)
- `src/styles/cyberpunk.css` — drop in favor of new design system

**Dependencies to remove:**
- `@upstash/redis`, `@upstash/ratelimit` — no Redis
- `mysql2`, `drizzle-orm`, `drizzle-kit` — no database
- `next-auth`, `@auth/core`, `@auth/drizzle-adapter` — no auth
- `openai`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, `ai`, `@vercel/ai-utils` — no AI features
- `playwright`, `llm-scraper`, `jsdom`, `@mozilla/readability`, `cheerio` — scraping gone
- `@shadcn/ui` (old package) — replaced by latest shadcn CLI

### Phase 2: Upgrade Stack
1. **Next.js** → latest stable (15.x or 16.x if available)
2. **Tailwind CSS 3 → 4** — migrate from `tailwind.config.ts` to CSS-first `@theme` config, update `postcss.config`. Auto content detection replaces `content: [...]`
3. **TypeScript** → 5.7+ (currently 5.4.5)
4. **shadcn/ui** → latest via `npx shadcn@latest init` — regenerate components in use
5. **React 19** — already on 19, but clean up any `forwardRef` usage per React 19 patterns (use `ref` as prop directly)

### Phase 3: Composition Refactor
**Exercise component** (`src/app/shoulder/exercise.tsx`):
- Currently takes 6+ props, manages its own open/timer/set state
- Refactor to compound component: `<Exercise>`, `<Exercise.Header>`, `<Exercise.Sets>`, `<Exercise.Timer>`, `<Exercise.Video>`
- Extract exercise state into a provider (per `state-context-interface` pattern)
- Make `Section` composable with any content, not just exercise lists

**Eat section components** — same compound pattern for meal plans, recipes, shopping lists

### Phase 4: Design Refresh
**Aesthetic direction:** Physical. Functional. Like a well-designed training log or PT handout.

- **Typography**: Drop Geist. Use a strong sans-serif display font (something with weight and character — not Inter/Roboto) paired with a clean monospace for data (sets, reps, timers)
- **Color**: Muted earth tones or high-contrast dark theme with accent color for active/CTA states. Not neon. Not corporate blue. Think gym chalk, rubber mats, warm wood
- **Layout**: Content-dense where it matters (exercise cards), breathing room between sections. Mobile-first — this gets used at the gym on a phone
- **Motion**: Subtle — expand/collapse animations on exercise cards, timer pulse. No gratuitous page transitions
- **Cards**: Exercise cards should feel tactile — slight depth, clear hierarchy (title → sets/reps → execution → video)
- **Video embeds**: Responsive, rounded, with a play overlay that matches the design system
- **Dark mode**: Primary. Light mode as option

### Phase 5: Deploy Fix
- Update `vercel.json` or Vercel project settings if needed
- Confirm build passes with `pnpm build`
- Verify joel.fit domain routing
- Update OG image generation for new design

## Verification

- [ ] `pnpm build` succeeds with zero errors
- [ ] No imports from removed packages remain
- [ ] Tailwind v4 CSS-first config — no `tailwind.config.ts`
- [ ] Exercise component uses compound pattern (no prop drilling for render variants)
- [ ] Lighthouse performance score ≥ 90 on /shoulder
- [ ] Mobile viewport renders correctly on 375px width
- [ ] Dark mode works as default with light mode toggle
- [ ] All 5 PT video embeds render on /shoulder
- [ ] Design passes the "would I screenshot this" test — distinctive, not generic

## Consequences

### Positive
- Clean, maintainable codebase — no dead dependencies or broken features
- Modern stack reduces friction for future changes
- Distinctive design makes the site worth sharing
- Composition patterns make adding new exercise types/sections trivial

### Negative
- Existing bookmarks to /articles, /scrape, /chat will 404 (acceptable — these were broken anyway)
- Auth removal means no multi-user features (non-goal — this is Joel's personal site)

### Follow-up Tasks
- Update `~/Vault/Projects/10-joelfit/index.md` with new stack details after migration
- Consider adding PWA manifest for gym offline use (future ADR)
- Evaluate if the eat/meal-plan section needs the same composition refactor

## Non-Goals
- Multi-user auth / accounts
- Database-backed content (static data in TypeScript is fine for personal use)
- AI features (chat, summarization) — can revisit later via separate ADR
- CMS integration
- Analytics

## More Information
- [Tailwind CSS v4 migration guide](https://tailwindcss.com/docs/upgrade-guide)
- Vercel composition patterns skill: `~/.agents/skills/vercel-composition-patterns/`
- Frontend design skill: `~/.agents/skills/frontend-design/`
- Current exercise data model: `apps/web/src/lib/repositories/exercise/schema.ts`
