# Security and Hardening Architecture (Anti-Slop Standard)
> Sintesis: Vibe Coding Playbook, OWASP Top 10, Defense-in-Depth

---

## 1. Secrets and Credentials Isolation
- Dilarang Keras Akses File Sensitif: Agen AI dilarang membaca, memodifikasi, atau melakukan commit pada file `.env`, `.env.local`, `.pem`, `.key`, atau credentials apapun.
- Environment Variables: Selalu rujuk kredensial melalui `process.env.<VAR_NAME>` dengan runtime schema validation (Zod).
- Automated Deny-List: Terapkan deny-list pada `.claude/settings.json` dan `.cursorrules` untuk memblokir I/O otomatis pada file rahasia.

---

## 2. Authentication and Authorization
- Dilarang Custom Auth dari Nol: Jangan biarkan AI membuat sistem autentikasi, hashing token, atau session management sendiri.
- Wajib Library Teruji: Gunakan solusi terstandar industri (NextAuth / Auth.js, Clerk, Supabase Auth, atau Lucia).
- Password and Token Security: Hashing wajib menggunakan Argon2id atau Bcrypt dengan cost factor memadai. Session token wajib `httpOnly`, `secure`, `SameSite=Lax/Strict`.
- Protocol Security: Wajibkan enkripsi TLS 1.3 pada transmisi data produksi.

---

## 3. Input Sanitization and Server Boundaries
- Strict Schema Validation: Semua API route, server actions, dan form handler WAJIB divalidasi di sisi server menggunakan Zod atau Valibot.
- Parameterized Database Queries: Dilarang string concatenation pada SQL queries. Wajib gunakan parameterized queries via ORM/Query Builder (Drizzle, Prisma, Kysely).
- Rate Limiting and Abuse Prevention: Pasang rate limiting (Upstash Redis / in-memory sliding window) pada public endpoints, authentication, dan AI LLM call routes.
