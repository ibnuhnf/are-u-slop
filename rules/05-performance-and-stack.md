# Web Performance and Modern Stack Architecture (Anti-Slop Standard)
> Sintesis: Vibe Coding Playbook, Next.js 15, React 19, Tailwind CSS v4

---

## 1. High-Performance Stack Standards
- Next.js 15 (App Router): Utamakan React Server Components (RSC) untuk data fetching langsung di server. Minimalkan Client Components (`'use client'`).
- React 19 Primitives: Gunakan `useActionState`, `useFormStatus`, dan native promise handling alih-alih boilerplate state manual.
- Tailwind CSS v4 Engine: Gunakan `@theme` CSS tokens murni tanpa runtime JavaScript parser untuk performa render instan.

---

## 2. Anti-Patterns and Performance Traps
- No Infinite Re-render Traps:
  - Dilarang menempatkan objek baru atau array literal tanpa memoize di dalam dependency array `useEffect`.
  - Jangan gunakan `useEffect` untuk menyinkronkan data yang bisa dikomputasi langsung saat render atau via Server Components.
- Mandatory Search Debounce:
  - Semua input pencarian interaktif, autocomplete, atau live filter WAJIB menggunakan debounce (`useDebounce`, 250ms-400ms) untuk mencegah flood API request.
- Database Query Efficiency (Zero N+1):
  - Gunakan `select_related`, eager joins, atau batch loaders pada ORM (Drizzle/Prisma).
  - Dilarang melakukan query database di dalam looping `map()` / `forEach()`.
- Layout Shift Prevention (CLS = 0):
  - Berikan fixed aspect-ratio atau width/height eksplisit pada image, video, dan chart container.
  - Gunakan static skeleton placeholder selama initial loading.
