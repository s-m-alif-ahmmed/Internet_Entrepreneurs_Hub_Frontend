# API & Data Fetching Architecture

This document governs all API communication, data fetching, validation, and error normalization.

---

## 1. The 4-Layer Separation Rule

Never couple UI components directly to raw network calls. All data communication must flow through the 4-layer model:

```
[ Layer 1: UI / View ]
        ↓ (calls feature hook or server component loader)
[ Layer 2: Feature Logic / Hook ]
        ↓ (orchestrates state, validation, params)
[ Layer 3: API Service ]
        ↓ (typed endpoint functions, e.g., getEntrepreneurs())
[ Layer 4: HTTP Client ]
        ↓ (fetch wrapper with timeout, headers, error normalization)
[ Backend API / Database ]
```

---

## 2. Layer Definitions & File Locations

### Layer 1: UI / View
- **Location:** `src/app/...` or `src/components/...`
- **Responsibility:** Pure rendering and presentation. Consumes data, renders loading/empty/error states. Never calls `fetch()`.

### Layer 2: Feature Logic
- **Location:** `src/features/<feature>/hooks/` or `src/features/<feature>/actions/`
- **Responsibility:** Handles local form state, optimistic updates with `useOptimistic`, server action invocations, or URL query param synchronizations.

### Layer 3: API Service
- **Location:** `src/features/<feature>/api/` or `src/lib/api/services/`
- **Responsibility:** Strongly-typed domain requests (e.g. `fetchUserProfile`, `updateListing`). Encapsulates endpoints, query parameter serialization, and response parsing.

### Layer 4: HTTP Client Wrapper
- **Location:** `src/lib/api/client.ts`
- **Responsibility:** Standard fetch wrapper handling:
  - Base URL configuration (`API_BASE_URL`)
  - Request headers (Content-Type, Authorization, CSRF)
  - Timeout enforcement via `AbortController`
  - Normalized error response handling
  - Automatic error unwrapping into `ApiError` instances

---

## 3. Strict Type Safety & Validation

1. **Every Request & Response Must Have a Type:**
   ```ts
   export interface GetEntrepreneursParams {
     page?: number;
     limit?: number;
     category?: string;
     search?: string;
   }

   export interface PaginatedResponse<T> {
     items: T[];
     total: number;
     page: number;
     totalPages: number;
     hasNextPage: boolean;
   }
   ```
2. **Runtime Validation (Zod):**
   When parsing external API payloads or user form submissions, use Zod schemas to ensure runtime contracts match TypeScript definitions.

---

## 4. Error Normalization

All network failures, HTTP 4xx/5xx responses, and timeout aborts must be converted into a standard `ApiError`:

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

UI components must handle 4 standard states:
1. **Loading State:** Skeleton/spinner during in-flight queries.
2. **Success State:** Render data items.
3. **Empty State:** Explicitly render helpful empty UI when arrays are empty (`items.length === 0`).
4. **Error State:** Friendly message with retry button when `ApiError` is caught.
