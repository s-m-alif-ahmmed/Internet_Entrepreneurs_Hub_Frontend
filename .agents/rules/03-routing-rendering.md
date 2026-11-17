# Routing & Rendering Strategy

This document defines route organization, rendering boundaries, and state fallbacks for the Next.js App Router.

---

## 1. Route Hierarchy & Route Groups

Organize routes using logical Route Groups to keep layouts clean and prevent layout re-renders:

```
src/app/
├── (marketing)/           # Public-facing, SEO-indexed pages
│   ├── layout.tsx         # Marketing layout (Header, Nav, Footer)
│   ├── page.tsx           # Home landing page
│   ├── directory/         # Entrepreneur directory, profiles
│   ├── resources/         # Guides, articles, playbooks
│   └── about/
├── (dashboard)/           # Authenticated user pages (noindex)
│   ├── layout.tsx         # Dashboard layout (Sidebar, App header)
│   └── overview/
├── (auth)/                # Authentication flows (noindex)
│   ├── layout.tsx         # Centered card layout
│   ├── login/
│   └── register/
├── api/                   # Route handlers (webhooks, external integrations)
├── layout.tsx             # Root html/body layout & global fonts
├── not-found.tsx          # Global 404 page
├── error.tsx              # Global error boundary
├── loading.tsx            # Global loading state
├── robots.ts              # Search engine crawler directives
└── sitemap.ts             # Dynamic XML sitemap generator
```

---

## 2. Rendering Decision Matrix

| Page Type | Rendering Strategy | Caching Rule | Client Components |
| :--- | :--- | :--- | :--- |
| **Landing & Marketing** | Static Prerender + PPR | `'use cache'` with `cacheLife('days')` | Interactive CTAs, toggles only |
| **Directory & Resources** | Cached Server Components | `'use cache'` with `cacheTag('directory')` | Filter inputs, search bars |
| **Detail Pages (`[slug]`)** | Server Components | `'use cache'` + `generateStaticParams` | Share buttons, bookmark toggles |
| **User Dashboard** | Server Component + Suspense | Dynamic, session-validated | Data tables, form editors |
| **Auth Pages** | Static Shell + Client Form | Prerendered shell | Interactive form inputs |

---

## 3. Mandatory Asynchronous Fallbacks

Every major feature route MUST provide:

1. **`loading.tsx`:**
   Render accessible skeleton components that match the geometric structure of the resolved page to prevent Cumulative Layout Shift (CLS).

2. **`error.tsx`:**
   Must be a Client Component (`'use client'`). Provide error details in development, a clean user-facing error message in production, and a `reset()` button.

3. **`not-found.tsx`:**
   Render when `notFound()` is invoked or when an invalid slug is requested. Must return clear navigation back to safety.

4. **`<Suspense>` Boundaries:**
   Wrap all dynamic data fetching components in `<Suspense fallback={<ComponentSkeleton />}>`.
