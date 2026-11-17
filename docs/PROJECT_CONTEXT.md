# Project Context: Internet Entrepreneurs Hub

## 1. Project Purpose & Target Audience
**Internet Entrepreneurs Hub** is a modern web application designed for internet entrepreneurs, founders, indie hackers, creators, and online builders. The platform provides a centralized hub featuring resources, directories, playbooks, community listings, and operational tools designed to assist internet entrepreneurs throughout their ideation, building, launching, and scaling phases.

---

## 2. Technology Stack

| Layer | Technology | Version | Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.4.6 | Turbopack default, React 19 native |
| **Core Library** | React | 19.3.0 | Server Components, Actions, useActionState |
| **Language** | TypeScript | ^5.x | Strict mode, path alias `@/*` -> `./src/*` |
| **Styling** | Tailwind CSS | 4.3.3 | Turbopack loader, `@theme inline`, CSS vars |
| **Package Manager**| pnpm | 11.20.0 | Workspace-ready package management |
| **Linting** | ESLint | ^9.x | Next.js Core Web Vitals & TypeScript flat config |

---

## 3. Core Architectural Flags (`next.config.ts`)

- `cacheComponents: true`: Next.js 16 caching model. Legacy route segment configs (`dynamic`, `revalidate`) are replaced with the `'use cache'`, `cacheLife()`, and `cacheTag()` directives. Navigations undergo instant-navigation validation.
- `partialPrefetching: true`: Enables Partial Prerendering (PPR). Static layouts and shells are prefetched and cached at CDN edge; dynamic data holes stream in through React Suspense boundaries.
- `turbopack`: Fast incremental builds with `@tailwindcss/turbopack` loader.

---

## 4. Architectural Boundaries

### 4.1 Frontend Role & Rendering
- **Server Components by Default:** Maximizes SEO, zero client bundle weight, fast TTFB.
- **Client Components (`'use client'`):** Restricted to leaf-level interactive components (interactive form controls, mobile navigation toggles, client state).
- **Asynchronous Route Props:** `params` and `searchParams` are Promises in Next.js 16 (`const { slug } = await params;`).

### 4.2 API & Data Flow
- **Strict 4-Layer Separation:**
  1. UI View (`src/components/`, `src/app/`)
  2. Feature Logic (`src/features/*/hooks/`, `src/features/*/actions/`)
  3. API Service (`src/features/*/api/`, `src/lib/api/services/`)
  4. HTTP Client (`src/lib/api/client.ts`)
- **Zero Raw Fetch in UI:** UI components never execute direct `fetch()` calls.
- **Normalized Error Handling:** All HTTP errors unwrap into typed `ApiError` structures.

### 4.3 SEO & Discoverability
- **SEO-First Strategy:** Built-in metadata generation on every public route, canonical URLs, OpenGraph images, Twitter cards, and structured JSON-LD schemas.
- **Index Isolation:** Public marketing/directory routes are indexed; authenticated dashboard/account pages are marked `noindex, nofollow`.

### 4.4 Authentication & Security
- **Secure Token Storage:** HTTP-only, Secure, SameSite cookies. Never store sensitive credentials or JWTs in `localStorage`.
- **Environment Isolation:** Public values must use `NEXT_PUBLIC_*`. Server secrets are kept isolated and protected from client component bundles via `server-only`.

---

## 5. Directory Structure Overview

```
src/
├── app/                  # Next.js App Router routes, layouts, and endpoints
│   ├── (marketing)/      # Public pages (landing, directory, resources)
│   ├── (dashboard)/      # Authenticated user dashboard
│   ├── (auth)/           # Authentication flows (login, register)
│   ├── api/              # Route handlers (webhooks, external proxies)
│   ├── layout.tsx        # Global root layout & font definitions
│   ├── page.tsx          # Root landing page
│   ├── globals.css       # Tailwind CSS v4 entrypoint & theme variables
│   ├── not-found.tsx     # 404 handler
│   ├── error.tsx         # Global error boundary
│   └── loading.tsx       # Global loading fallback
├── components/           # Shared & UI components
│   ├── ui/               # Atom primitives (buttons, inputs, cards)
│   ├── layout/           # Shared layouts (header, footer, nav)
│   └── shared/           # Reusable composites (empty state, skeletons)
├── features/             # Scalable domain-driven modules
├── lib/                  # Shared core utilities (api client, seo, auth)
├── types/                # Global TypeScript definitions
├── hooks/                # Global React hooks
└── constants/            # Global application constants
```

---

## 6. Important Conventions & Rules for Future Sessions
1. **Never scan the entire repo blindly:** Check `.agents/rules/` and `docs/PROJECT_STATUS.md` first.
2. **Synchronize documentation:** When completing work, update `docs/PROJECT_STATUS.md` and relevant architecture docs.
3. **Respect Next.js 16 primitives:** Always await `params` and `searchParams`, use `'use cache'` instead of `export const revalidate`, and wrap dynamic holes in `<Suspense>`.
