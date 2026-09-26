# Code Quality and Clean Architecture (Anti-Slop Standard)
> Sintesis: eslint-plugin-slop, paperthin, YAGNI, Minimal Effective Diff

---

## 1. Zero Code Slop Principles
- No Em-Dash (U+2014): Dilarang menyisipkan karakter em-dash atau en-dash sebagai pemisah teks dekoratif di kode, UI, dan komentar. Penggunaan hyphen ganda pada CLI flag (--flag) tetap diperbolehkan.
- No Trivial Forwarding Functions: Hapus wrapper function 1-line yang hanya memanggil function lain tanpa transformasi logis.
- No Trivial Type Aliases: Dilarang membuat alias tipe yang hanya me-rename tipe primitif (`type MyString = string;`).
- No Static-Only Classes: Gunakan modul JavaScript/TypeScript standar (`export function ...`) alih-alih `class Utility { static doThing() {} }`.
- No Chained Type Assertions: Dilarang `as unknown as MyType`. Tulis runtime type guard atau validator (Zod/Valibot).

---

## 2. Minimalist Code and Comments
- Self-Documenting Code: Jangan tulis komentar yang hanya mengulang nama fungsi atau konstanta.
  ```typescript
  // SALAH: Slop comment
  // This constant sets the timeout duration
  const TIMEOUT_DURATION = 5000;

  // BENAR: Clean, no commentary needed
  const TIMEOUT_DURATION_MS = 5000;
  ```
- JSDoc over Line Noise: Gunakan format `/** ... */` hanya pada API public atau interface kompleks.
- YAGNI and Deletion Before Addition: 
  - Tidak membuat generic factory jika hanya ada 1 implementasi.
  - Gunakan platform primitives (CSS over JS, HTML form validation over heavy runtime libs).
  - Tulis `ponytail: <limit and upgrade path>` jika menyederhanakan kode secara sengaja.

---

## 3. Framework Implementation Idioms

### React / Next.js / Tailwind CSS / Base UI / DaisyUI / Chakra UI
- Gunakan native interactive tags (`<button>`, `<a href>`, `<dialog>`) dengan keyboard navigation bawaan.
- Hindari inline styling style objek acak (`style={{ margin: 13 }}`).
- Pastikan state loading, error, dan empty ditangani secara eksplisit.
- Gunakan `clsx` / `tailwind-merge` untuk dynamic class handling.

### State and Component Boundaries
- Pisahkan presentational component dari data-fetching container.
- Batasi re-render dengan atomicity props.
