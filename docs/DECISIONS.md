# Architecture Decisions Record (ADR)

This document records the key architectural decisions, rationale, context, and consequences for the Internet Entrepreneurs Hub project.

---

## ADR-001: Adoption of Next.js 16 App Router & React 19

### Context
The application requires high SEO visibility, high performance (Core Web Vitals), dynamic server-side rendering, and scalable frontend modularity.

### Decision
Adopt **Next.js 16.4.6** App Router paired with **React 19.3.0** and **Turbopack**.

### Consequences
- **Positive:** Exceptional build performance, native React 19 actions (`useActionState`, `useOptimistic`), fine-grained streaming with Suspense, and automatic route typing (`LayoutProps`, `PageProps`).
- **Considerations:** Breaking changes from Next.js 14/15 require awaiting `params` and `searchParams` as Promises, and avoiding legacy segment configs.

---

## ADR-002: Cache Components & Partial Prefetching (PPR)

### Context
Traditional static generation (`export const dynamic = 'force-static'`, `export const revalidate = 60`) locks routes into monolithic static or dynamic decisions.

### Decision
Enable `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`.

### Consequences
- **Positive:** Instant client-side navigation. Static shells are prefetched and cached automatically at CDN edges, while dynamic data holes stream in via React Suspense. Function-level caching via `'use cache'`, `cacheLife()`, and `cacheTag()`.
- **Considerations:** Uncached dynamic reads must be explicitly wrapped in `<Suspense>`. Route segment configs like `dynamic` and `revalidate` trigger build errors if used.

---

## ADR-003: Feature-Driven Modular Architecture (`src/features/*`)

### Context
Placing all domain logic into a flat `src/components/` and `src/hooks/` causes coupling, code bloat, and difficulty navigating complex domains.

### Decision
Adopt a feature-sliced architecture under `src/features/<feature>/` (e.g. `auth/`, `directory/`, `resources/`, `dashboard/`), while maintaining atomic UI primitives in `src/components/ui/` and global frameworks in `src/components/layout/`.

### Consequences
- **Positive:** High cohesion, low coupling, clear boundaries, and easy onboarding for AI agents and human developers alike.

---

## ADR-004: 4-Layer API Pipeline with Normalized Error Handling

### Context
Direct `fetch()` calls in UI components lead to code duplication, inconsistent error handling, lack of request deduplication, and difficulty refactoring backends.

### Decision
Enforce a 4-layer unidirectional pipeline:
1. UI / View Layer
2. Feature Logic / Hook Layer
3. API Service Layer
4. HTTP Client Wrapper (`src/lib/api/client.ts`)

### Consequences
- **Positive:** Type-safe API contracts, unified `ApiError` handling, clean separation of concerns, and testability.

---

## ADR-005: SEO-First Server Component Paradigm with JSON-LD

### Context
Internet entrepreneurs and founders rely heavily on organic search discovery and social sharing.

### Decision
Default all pages to Server Components with comprehensive Next.js Metadata API declarations, canonical tags, OpenGraph previews, and XSS-sanitized JSON-LD structured data.

### Consequences
- **Positive:** Search engines and AI scrapers receive rich semantic HTML and structured data without waiting for client-side JavaScript execution. Near-zero client bundle footprint.

---

## ADR-006: Tailwind CSS v4 with Inline Theme & CSS Variables

### Context
Styling needs to be maintainable, light, dark-mode ready, and fast in Turbopack.

### Decision
Use **Tailwind CSS 4.3.3** using `@import "tailwindcss";` and `@theme inline` with CSS variables in `src/app/globals.css`.

### Consequences
- **Positive:** Eliminates legacy `tailwind.config.js`. Uses native CSS variables for dynamic dark/light mode toggles. Compiles instantly via Turbopack.

---

## ADR-007: Token-Efficient Agent Navigation Hierarchy

### Context
AI coding agents often spend excessive tokens re-reading entire repositories from scratch, leading to context pollution and inconsistent edits.

### Decision
Institute `.agents/rules/` and `docs/PROJECT_STATUS.md` as mandatory entrypoints for all AI sessions.

### Consequences
- **Positive:** Agents target only relevant files, preserve token budgets, prevent regression, and keep project state perpetually up to date.
