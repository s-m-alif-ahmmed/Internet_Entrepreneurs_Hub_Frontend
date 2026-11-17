# Agent Workflow & Token Efficiency Protocol

This document governs how AI agents (including Antigravity) interact with this codebase. Follow these rules unconditionally to maximize execution precision and token/context efficiency.

---

## 1. Context Loading Hierarchy

Before modifying or creating any code, follow this strict lookup order:

```
1. Relevant Rule in .agents/rules/
       ↓
2. docs/PROJECT_STATUS.md (Current state, priorities, debt)
       ↓
3. Relevant Architecture Document in docs/ (Frontend, SEO, API)
       ↓
4. Relevant Feature / Module / Route Files
       ↓
5. Other files ONLY when strictly necessary
```

### Strictly Prohibited Behaviors:
- **DO NOT** perform a full repository scan or read every file for every task.
- **DO NOT** read all component or API files when working on an isolated feature.
- **DO NOT** re-analyze the entire route tree unnecessarily.
- **DO NOT** re-explain or re-summarize entire architecture documents to the user.

---

## 2. Before Starting Any Task

1. **Check the Current Phase & Status:** Read [PROJECT_STATUS.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/PROJECT_STATUS.md).
2. **Consult Specific Rules:** Read only the rule in `.agents/rules/` applicable to your task:
   - Next.js 16 & React 19: [02-nextjs-16-conventions.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/02-nextjs-16-conventions.md)
   - Routing & Rendering: [03-routing-rendering.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/03-routing-rendering.md)
   - API & Data Fetching: [04-api-and-data-fetching.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/04-api-and-data-fetching.md)
   - SEO & Metadata: [05-seo-and-metadata.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/05-seo-and-metadata.md)
   - Components & Styling: [06-components-and-styling.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/06-components-and-styling.md)
   - Security & Auth: [07-security-and-auth.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/07-security-and-auth.md)
   - TypeScript: [08-typescript-standards.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/.agents/rules/08-typescript-standards.md)
3. **Identify the Scope:** Limit reads and edits to the affected feature, route, or utility.
4. **Source Code is Ground Truth:** If documentation conflicts with implementation:
   `Source Code > Documentation`. Update documentation when a conflict is discovered.

---

## 3. Mandatory Task Checklist

### When Creating or Modifying a Page:
- [ ] Determine rendering strategy (Server Component by default, `'use client'` only for interactive leaves).
- [ ] Resolve route parameters asynchronously (`const { slug } = await params;`).
- [ ] Implement metadata (`generateMetadata` or static `metadata`).
- [ ] Add loading (`loading.tsx`), error boundary (`error.tsx`), and not-found (`not-found.tsx`).
- [ ] Evaluate SEO (canonical, OpenGraph, semantic headings, schema where appropriate).
- [ ] Verify indexability (public pages: index/follow; private/dashboard pages: noindex/nofollow).

### When Integrating an API:
- [ ] Check if client/service already exists in `src/lib/api/` or feature module.
- [ ] Follow 4-layer architecture: UI -> Feature Logic -> API Service -> HTTP Client.
- [ ] Enforce strict TypeScript request and response types.
- [ ] Provide normalized error handling, empty states, and loading states.
- [ ] Determine caching strategy (`'use cache'`, `cacheLife`, or dynamic data wrapped in `<Suspense>`).

### When Building UI:
- [ ] Reuse existing primitives from `src/components/ui/`.
- [ ] Follow Tailwind CSS v4 theme tokens and utility conventions.
- [ ] Ensure full accessibility (semantic HTML, keyboard navigation, ARIA attributes).
- [ ] Maintain responsive design across mobile, tablet, and desktop.

---

## 4. Automatic Documentation Synchronization

After completing any meaningful change:
1. Update [PROJECT_STATUS.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/PROJECT_STATUS.md):
   - Move completed items to "Completed".
   - Update "Currently Working On" or "Next Recommended Tasks".
   - Log any new technical debt or known issues.
2. If architecture changed, update the relevant document:
   - [FRONTEND_ARCHITECTURE.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/FRONTEND_ARCHITECTURE.md)
   - [SEO_ARCHITECTURE.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/SEO_ARCHITECTURE.md)
   - [API_ARCHITECTURE.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/API_ARCHITECTURE.md)
   - [DECISIONS.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/DECISIONS.md)
   - [DEVELOPMENT_HISTORY.md](file:///j:/Herd/Testings/internet-entrepreneurs-hub/docs/DEVELOPMENT_HISTORY.md)
3. Do NOT update documents that were not affected by the change.
