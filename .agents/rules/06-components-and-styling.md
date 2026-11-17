# Components & Styling Architecture

This document governs UI component composition, design systems, Tailwind CSS v4 standards, and accessibility (a11y).

---

## 1. Component Granularity & Boundaries

Components must remain modular, single-responsibility, and composable:

```
src/components/
├── ui/                  # Atom primitives (Button, Input, Badge, Dialog, Dropdown)
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Input.tsx
├── layout/              # Structural wrappers (Navbar, Footer, Sidebar, Container)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Container.tsx
└── shared/              # Reusable composites across multiple features
    ├── EmptyState.tsx
    ├── LoadingSkeleton.tsx
    └── Pagination.tsx
```

### Prohibited Component Patterns:
- **No Monolithic Components:** Break files exceeding 200 lines into sub-components.
- **No Embedded Network Calls in UI Atoms:** `Button`, `Card`, or `Modal` must never import `fetch` or API clients directly.
- **No Prop Drilling Beyond 2 Levels:** Use React composition, component slots, or feature context.

---

## 2. Tailwind CSS v4 Guidelines

This project uses **Tailwind CSS 4.3.3** with the inline `@theme` engine.

1. **Theme Variables:**
   Consume defined design tokens through utility classes mapped to CSS variables (`bg-background`, `text-foreground`, `font-sans`, `font-mono`).
2. **Dynamic Classes:**
   Never construct dynamic class names with string interpolation (e.g. `text-${color}-500`). Use explicit lookup maps or `clsx`/`tailwind-merge` utility (`cn()` helper).
3. **Dark Mode:**
   Use semantic tokens (`bg-background`, `text-foreground`, `border-border`) so styles adapt seamlessly between light and dark themes.

---

## 3. Accessibility (a11y) Standards

1. **Semantic Elements:**
   - Use `<button>` for clickable actions. Never attach click handlers to `<div>` or `<span>`.
   - Use `<Link>` or `<a>` for navigational anchors with valid `href`.
   - Use standard `<form>`, `<input>`, `<label>`, `<fieldset>`, and `<legend>`.
2. **Keyboard Focus & Navigation:**
   - All interactive elements must show a distinct focus ring:
     `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900`
   - Form controls must have associated `<label>` or explicit `aria-label`.
3. **Contrast & Sizing:**
   - Text color combinations must meet WCAG AA contrast ratio (4.5:1 for normal text).
   - Mobile interactive targets must measure at least 44x44px.
