# Frontend Architecture: Internet Entrepreneurs Hub

This document details the architectural structure, component model, rendering boundaries, and data flow of the frontend application.

---

## 1. Directory Structure Blueprint

```
internet-entrepreneurs-hub/
├── .agents/                      # Agent instruction rules
│   └── rules/                    # Modular operational guidelines
├── docs/                         # Persistent architectural documentation
├── public/                       # Static public assets (images, icons, favicons)
├── src/
│   ├── app/                      # Next.js App Router (pages, layouts, route handlers)
│   │   ├── (marketing)/          # Public routes: landing, directory, blog, resources
│   │   ├── (dashboard)/          # Protected routes: founder dashboard, analytics
│   │   ├── (auth)/               # Authentication routes: login, signup, forgot-password
│   │   ├── api/                  # Backend route handlers / Webhooks
│   │   ├── layout.tsx            # Global root layout (Geist font, html/body)
│   │   ├── page.tsx              # Index route
│   │   ├── globals.css           # Tailwind v4 theme and global stylesheet
│   │   ├── loading.tsx           # Global fallback skeleton
│   │   ├── error.tsx             # Global error boundary ('use client')
│   │   ├── not-found.tsx         # Global 404 page
│   │   ├── robots.ts             # Robots.txt generator
│   │   └── sitemap.ts            # Dynamic sitemap generator
│   │
│   ├── components/               # Presentation & UI components
│   │   ├── ui/                   # Atomic primitives (Button, Card, Input, Badge, Dialog)
│   │   ├── layout/               # Application-level structural frames (Navbar, Footer, Sidebar)
│   │   └── shared/               # Cross-feature reusable widgets (EmptyState, Pagination)
│   │
│   ├── features/                 # Modular, domain-driven feature packages
│   │   ├── auth/                 # Authentication state, login forms, sessions
│   │   ├── directory/            # Entrepreneur directory listings & profiles
│   │   ├── resources/            # Guides, tools, playbooks, articles
│   │   └── dashboard/            # Founder dashboard metrics & project management
│   │
│   ├── lib/                      # Core infrastructure utilities
│   │   ├── api/                  # Fetch client, error normalization, API base setup
│   │   ├── seo/                  # Metadata helpers, JSON-LD schema generators
│   │   ├── auth/                 # Cookie inspection, session helpers
│   │   ├── utils/                # General helpers (cn() class merging, formatting)
│   │   └── validations/          # Zod schemas for forms and API responses
│   │
│   ├── hooks/                    # Reusable React client hooks
│   ├── types/                    # Global domain interfaces & types
│   ├── constants/                # Global configuration values & navigation links
│   └── providers/                # Client context providers (e.g. ThemeProvider, QueryClient)
│
├── next.config.ts                # Next.js 16 configuration (cacheComponents, PPR, Turbopack)
├── tsconfig.json                 # TypeScript compiler configuration (strict mode, `@/*` alias)
├── eslint.config.mjs             # ESLint 9 flat configuration
└── package.json                  # Dependencies & scripts (pnpm)
```

---

## 2. Feature-Sliced Module Organization

To prevent codebases from becoming unwieldy as new features are added, every major domain capability lives in `src/features/<feature>/`:

```
src/features/directory/
├── api/                          # Domain API calls (e.g. getEntrepreneurs.ts, getProfile.ts)
├── components/                   # Feature-specific UI (e.g. EntrepreneurCard.tsx, FilterBar.tsx)
├── hooks/                        # Feature-specific client hooks (e.g. useDirectoryFilter.ts)
├── actions/                      # Server Actions (e.g. bookmarkEntrepreneur.ts)
├── types.ts                      # Domain types (e.g. EntrepreneurProfile, FilterOptions)
└── utils.ts                      # Domain-specific formatters
```

---

## 3. Server vs. Client Component Boundaries

Next.js 16 emphasizes a **Server-First** paradigm:

```
               [ Server Component: Page / Layout ]
           (Fetches data server-side, caches via 'use cache',
                 generates SEO metadata, zero JS bundle)
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [ Server Component ]             [ Client Component ]
    (Static markup, cards, lists)       ('use client' leaf component:
                                         interactive search, modals, buttons)
```

### Boundary Guidelines:
- **Server Components (Default):** Fetch data, read cookies/headers securely, render heavy markdown/text, avoid shipping JavaScript to the browser.
- **Client Components (`'use client'`):** Mark only interactive components at the boundary leaves (e.g., search input with debounce, mobile menu hamburger toggle, interactive modal dialog).
- **Never mark an entire page with `'use client'`** simply to support a small interactive widget. Pass server-rendered children into client components as slots or `children`.

---

## 4. State Management Strategy

1. **URL State (First Priority):** For search terms, page numbers, sorting, and category filters. Keeps states shareable, bookmarkable, and crawlable.
2. **Server State:** Managed via Server Components and Next.js 16 cache directives (`'use cache'`, `cacheLife()`, `cacheTag()`).
3. **Local Component State:** Standard React 19 `useState`, `useReducer`, or `useActionState` for ephemeral form states and UI toggles.
4. **Global Client State:** Reserved only for cross-page interactive state (e.g., shopping cart, active audio player, or multi-step wizard) using React Context or lightweight stores.

---

## 5. React 19 Integration

- **Form Handling:** Standard HTML forms progressive enhancement with Server Actions and React 19 `useActionState` and `useFormStatus`.
- **Optimistic UI:** `useOptimistic` enables instant feedback (e.g., like buttons, bookmark counters) before the server response completes.
- **Async Transitions:** Leverage `useTransition` for smooth, non-blocking client-side navigation and filtering.
