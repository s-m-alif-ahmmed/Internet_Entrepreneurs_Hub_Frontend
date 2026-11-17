# Security & Authentication Standards

This document establishes the security boundaries, credential isolation, and authentication rules for this project.

---

## 1. Environment Variable Isolation

1. **Client-Exposed Variables:**
   - Must be explicitly prefixed with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`).
   - Treat any variable prefixed with `NEXT_PUBLIC_` as public knowledge visible to any site visitor.
2. **Server-Only Secrets:**
   - API secret keys, database credentials, webhook signing secrets, and payment tokens must NEVER have the `NEXT_PUBLIC_` prefix.
   - Server-only variables must NEVER be referenced inside files marked with `'use client'`.
   - Next.js will throw build/runtime errors or compile secrets into client bundles if leaked. Use `import 'server-only'` in server data libraries to strictly enforce this boundary.

---

## 2. Authentication & Token Storage

1. **Cookie-Based Sessions:**
   - Store session identifiers and authentication JWTs in **HTTP-only, Secure, SameSite=Lax** cookies.
   - Do **NOT** store access tokens, refresh tokens, or user secrets in `localStorage` or `sessionStorage` (which are vulnerable to XSS exfiltration).
2. **Route Protection (Middleware & Layouts):**
   - Enforce authentication in Next.js `middleware.ts` or authenticated Server Component layouts (`(dashboard)/layout.tsx`).
   - Unauthenticated access attempts to private routes must redirect cleanly to `/login?callbackUrl=...`.
3. **Session Validation in Server Actions:**
   - Server Actions must always re-verify the active session before performing mutations, independent of UI state. Never trust client-supplied user IDs without session verification.

---

## 3. Secret Hygiene in Documentation & Commits

- **Never** commit `.env` or `.env.local` containing live secrets.
- **Never** paste real tokens, API keys, or private endpoints in Markdown documentation or rule files.
- Maintain a sanitized `.env.example` template with placeholder values for development setup.
