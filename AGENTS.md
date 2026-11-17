<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Internet Entrepreneurs Hub: Agent Instructions & Quick Navigation

Welcome to the **Internet Entrepreneurs Hub** codebase. To ensure token efficiency, consistency, and zero regressions, follow the mandatory navigation protocol below:

## 1. Fast Onboarding Protocol
Before planning or editing code, ALWAYS check in this order:
1. **Current Status & Priorities:** [docs/PROJECT_STATUS.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/PROJECT_STATUS.md)
2. **Context Overview:** [docs/PROJECT_CONTEXT.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/PROJECT_CONTEXT.md)
3. **Task-Specific Operational Rules in `.agents/rules/`:**
   - **Agent Workflow & Protocol:** [.agents/rules/01-agent-workflow.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/01-agent-workflow.md)
   - **Next.js 16 & React 19 Conventions:** [.agents/rules/02-nextjs-16-conventions.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/02-nextjs-16-conventions.md)
   - **Routing & Rendering Strategy:** [.agents/rules/03-routing-rendering.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/03-routing-rendering.md)
   - **API & Data Fetching (4-layer):** [.agents/rules/04-api-and-data-fetching.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/04-api-and-data-fetching.md)
   - **SEO, Metadata & JSON-LD:** [.agents/rules/05-seo-and-metadata.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/05-seo-and-metadata.md)
   - **Components, Tailwind v4 & a11y:** [.agents/rules/06-components-and-styling.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/06-components-and-styling.md)
   - **Security, Auth & Environment:** [.agents/rules/07-security-and-auth.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/07-security-and-auth.md)
   - **TypeScript & Type Safety:** [.agents/rules/08-typescript-standards.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/08-typescript-standards.md)
4. **Targeted Files:** Read ONLY the specific files involved in your active task. DO NOT scan the entire repository.

## 2. Key Technology Constraints
- **Next.js 16.4.6 (App Router) + React 19.3.0 + Turbopack**
- **Async Route Props:** `params` and `searchParams` are Promises (`const { slug } = await params;`).
- **Cache Components:** Legacy `export const dynamic/revalidate` configs are forbidden. Use `'use cache'`, `cacheLife()`, and `cacheTag()`.
- **Partial Prefetching (PPR):** Uncached dynamic reads must be enclosed in `<Suspense>`.
- **Zero Raw Fetch in UI:** UI components must call feature services or actions, never `fetch()` directly.
- **Styling:** Tailwind CSS 4.3.3 using `@import "tailwindcss";` and `@theme inline` with CSS variables in `globals.css`.

## 3. Keep Documentation Synchronized
Whenever you finish meaningful feature work or fix an issue, update [docs/PROJECT_STATUS.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/PROJECT_STATUS.md) and any relevant architecture docs.

