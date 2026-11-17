# SEO Architecture: Internet Entrepreneurs Hub

This document defines the SEO architecture, metadata strategy, structured data standards, and crawlability rules for the application.

---

## 1. Metadata Generation Strategy

Next.js App Router provides built-in Metadata APIs. We enforce static and dynamic typing across all public routes.

### 1.1 Base Configuration (`src/app/layout.tsx`)
The root layout defines the base URL and default title template:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hub.example.com'),
  title: {
    default: 'Internet Entrepreneurs Hub | Resources, Community & Directory',
    template: '%s | Internet Entrepreneurs Hub',
  },
  description: 'The premier community, directory, and resource platform for internet entrepreneurs, founders, and creators.',
  keywords: [
    'internet entrepreneurs',
    'indie hackers',
    'startup directory',
    'founder resources',
    'digital business',
    'saas founders',
  ],
  authors: [{ name: 'Internet Entrepreneurs Hub' }],
  creator: 'Internet Entrepreneurs Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Internet Entrepreneurs Hub',
    title: 'Internet Entrepreneurs Hub',
    description: 'The premier platform for founders, indie creators, and internet entrepreneurs.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Internet Entrepreneurs Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internet Entrepreneurs Hub',
    description: 'The premier platform for founders, indie creators, and internet entrepreneurs.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### 1.2 Dynamic Metadata (`generateMetadata`)
Used for dynamic routes such as `/directory/[slug]` or `/resources/[slug]`:

```tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItemBySlug(slug);

  if (!item) {
    return {
      title: 'Resource Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: item.title,
    description: item.summary,
    alternates: {
      canonical: `/resources/${slug}`,
    },
    openGraph: {
      title: `${item.title} | Internet Entrepreneurs Hub`,
      description: item.summary,
      url: `/resources/${slug}`,
      images: [
        {
          url: item.imageUrl || '/og-default.png',
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
  };
}
```

---

## 2. Dynamic Sitemap & Robots Directives

### 2.1 Dynamic Sitemap (`src/app/sitemap.ts`)
Generates `/sitemap.xml` dynamically including static pages and dynamic records:

```ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hub.example.com';

  // Static routes
  const routes = [
    '',
    '/directory',
    '/resources',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic routes (e.g. entrepreneurs, resources)
  // const dynamicItems = await fetchPublishedSlugs();

  return [...routes];
}
```

### 2.2 Robots File (`src/app/robots.ts`)
Generates `/robots.txt` protecting private routes while inviting crawlers to public indexable sections:

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hub.example.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/(dashboard)/*',
          '/(auth)/*',
          '/dashboard/',
          '/settings/',
          '/*?*preview=true',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## 3. Structured Data (JSON-LD)

To boost search appearance, rich snippets, and AI crawler understanding, render validated schema directly in server components:

- **WebSite Schema:** On the homepage, specifying name, URL, and potential SearchAction.
- **Organization Schema:** Describing the brand, social profiles, and logo.
- **Article Schema:** For educational guides, playbooks, and resource articles.
- **ProfilePage / ItemList Schema:** For directory listings and creator profiles.
- **BreadcrumbList Schema:** For nested resource and category pages.

### XSS Prevention in JSON-LD
Never output raw unescaped JSON strings inside `<script type="application/ld+json">`. Replace `<` with `\u003c` to eliminate XSS vectors.

---

## 4. Public vs. Private Route Separation

| Route Scope | Target Crawl Behavior | Robots Meta Tag |
| :--- | :--- | :--- |
| **Landing & Marketing (`(marketing)`)** | Indexed, Followed, Canonicalized | `index: true, follow: true` |
| **Directory & Resources** | Indexed, Followed, Canonicalized | `index: true, follow: true` |
| **User Dashboard (`(dashboard)`)** | Strictly Blocked from Search | `index: false, follow: false` |
| **Auth Flows (`(auth)`)** | Strictly Blocked from Search | `index: false, follow: false` |
| **API Endpoints (`/api/*`)** | Disallowed via robots.txt | N/A |

---

## 5. Core Web Vitals (CWV) & Performance SEO
- **LCP (Largest Contentful Paint):** Preload font files with `next/font/google`, mark hero images with `priority`, and serve pre-rendered static shells using Next.js 16 Partial Prerendering (PPR).
- **CLS (Cumulative Layout Shift):** All dynamic lists render skeleton placeholders with fixed dimensional constraints matching the final data items.
- **INP (Interaction to Next Paint):** Keep client JavaScript minimal. Push state handling to URL query parameters and React 19 concurrent transitions (`useTransition`).
