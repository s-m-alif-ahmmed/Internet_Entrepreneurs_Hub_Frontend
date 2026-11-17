# API Architecture: Internet Entrepreneurs Hub

This document defines the API integration layer, communication protocols, caching mechanics, and error handling for the application.

---

## 1. The 4-Layer Communication Pipeline

All data flows through an isolated, unidirectional 4-layer architecture:

```
[ 1. UI Layer ]
  - Server Component (SSR / Static) OR Client Component ('use client')
  - Consumes hooks or async data loaders
        │
        ▼
[ 2. Feature Logic / Hook Layer ]
  - Directory: src/features/<feature>/hooks/ or actions/
  - Orchestrates parameters, optimistic updates (useOptimistic), and form actions
        │
        ▼
[ 3. API Service Layer ]
  - Directory: src/features/<feature>/api/ or src/lib/api/services/
  - Exposes typed functions (e.g., fetchDirectory(query), submitListing(payload))
        │
        ▼
[ 4. HTTP Client Wrapper ]
  - File: src/lib/api/client.ts
  - Configures baseUrl, headers, timeout aborts, and normalizes errors
        │
        ▼
[ Remote Backend / Database / Microservices ]
```

---

## 2. HTTP Client Specifications (`src/lib/api/client.ts`)

The HTTP client wraps standard `fetch` with production-grade safeguards:

### Core Responsibilities:
1. **Configurable Base URL:** Reads `API_BASE_URL` (server-side) or `NEXT_PUBLIC_API_URL` (client-side fallback).
2. **Timeout Enforcement:** Automatically aborts hanging requests via `AbortController` after a configurable threshold (default: 10 seconds).
3. **Normalized Error Parsing:** Non-2xx responses are parsed and thrown as instances of `ApiError`.
4. **Header Management:** Injects `Content-Type: application/json` and credentials/authorization headers safely.

### Type Definition:
```ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```

---

## 3. Next.js 16 Caching & Revalidation Model

With `cacheComponents: true` active in Next.js 16, caching is controlled at the function level:

### 3.1 Caching Server Fetches
```ts
import { cacheLife, cacheTag } from 'next/cache';

export async function getDirectoryListings(category?: string) {
  'use cache';
  cacheLife('hours'); // Revalidates periodically
  cacheTag('directory-listings', category ? `category-${category}` : 'all-categories');

  return await apiClient.get<DirectoryItem[]>('/directory', { params: { category } });
}
```

### 3.2 Cache Lifespans (`cacheLife` profiles)
- `seconds`: High-frequency dynamic data (live active counts).
- `minutes`: Frequently updated content (recent community posts).
- `hours`: Standard content (directory listings, resource articles).
- `days` / `weeks`: Infrequently changing static content (site configuration, platform categories).
- `max`: Immutable static assets and permanent snapshots.

### 3.3 Revalidating Stale Data via Server Actions
When mutations occur, purge target cache tags in Server Actions:

```ts
'use server';

import { revalidateTag } from 'next/cache';

export async function createListingAction(formData: FormData) {
  // 1. Authenticate user session
  // 2. Validate form payload with Zod
  // 3. Post to backend
  // 4. Invalidate relevant cache tags
  revalidateTag('directory-listings');
}
```

---

## 4. Pagination & Query Parameters

All list endpoints standardize on unified pagination contracts:

```ts
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}
```

---

## 5. Security & Secret Protection

- **Zero Client Credential Leakage:** Private API keys, JWT secret keys, and database passwords must NEVER be prefixed with `NEXT_PUBLIC_`.
- **Server Execution Guard:** Database services and privileged API wrappers must use `import 'server-only'` to guarantee compile-time prevention of client-bundle leakage.
