# SEO & Metadata Standards

This document establishes the SEO-first requirements for all routes in this application.

---

## 1. Metadata API Implementation

Every public page must define explicit metadata using Next.js Metadata API.

### Static Metadata:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internet Entrepreneurs Hub | Resources & Community',
  description: 'The premier community, directory, and resource platform for internet entrepreneurs and builders.',
  alternates: {
    canonical: 'https://hub.example.com',
  },
  openGraph: {
    title: 'Internet Entrepreneurs Hub',
    description: 'The premier platform for founders and indie creators.',
    url: 'https://hub.example.com',
    siteName: 'Internet Entrepreneurs Hub',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internet Entrepreneurs Hub',
    description: 'The premier platform for founders and indie creators.',
  },
};
```

### Dynamic Metadata:
```tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItemBySlug(slug);

  if (!item) return { title: 'Not Found' };

  return {
    title: `${item.title} | Internet Entrepreneurs Hub`,
    description: item.summary,
    alternates: {
      canonical: `https://hub.example.com/resources/${slug}`,
    },
  };
}
```

---

## 2. Public vs. Private Route Indexing

- **Public Routes (Marketing, Resources, Directory):**
  Must be fully indexable with clean canonical URLs.
- **Private & Internal Routes (`(dashboard)`, `(auth)`, `admin`):**
  Must explicitly prevent indexing to safeguard user privacy and prevent duplicate/empty crawl errors:
  ```tsx
  export const metadata: Metadata = {
    robots: {
      index: false,
      follow: false,
    },
  };
  ```

---

## 3. Structured Data (JSON-LD)

- **Sanitization Rule:** Always sanitize `<` characters to prevent XSS injection via user-generated strings in script tags:
  ```tsx
  export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    );
  }
  ```
- **Accuracy Rule:** Only add structured data (Organization, WebSite, Article, BreadcrumbList) when it reflects visible content on the rendered page. Never generate fictitious or spam schema.

---

## 4. Crawlability & Core Web Vitals (CWV)

1. **Semantic Hierarchy:**
   - Exactly one `<h1>` per page.
   - Strictly ordered `<h2>` and `<h3>` tags without skipped heading levels.
   - Use semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) instead of generic `<div>`s.
2. **Next.js Image Alt Attributes:**
   - All `next/image` components must include meaningful `alt` text.
   - Set `priority` on the Largest Contentful Paint (LCP) hero element.
3. **Internal Linking:**
   - Always use `next/link` for internal transitions to support prefetching and crawl discovery.
   - Anchor texts must be descriptive (avoid "click here" or "read more" without context).
