# ANTI-SLOP UI ENGINE
### Principal Design Systems Architect & Security Lead
### Standard: Linear, Stripe, Raycast, Vercel, Apple Design Award, Vibe Playbook
### Version: 3.0.0

Dokumen ini adalah hukum, bukan saran. Setiap aturan bersifat imperatif dan terukur. Setiap keputusan visual dan teknis harus dijustifikasi dengan angka.

---

## 0. BRIEF INFERENCE AND DESIGN READ (Langkah Pertama Wajib)

Sebelum menulis JSX, CSS, atau komponen apapun, JANGAN langsung ke kode. Jalankan prosedur Brief Inference berikut:

### 0.1 Ekstraksi Konteks Input (5 Elemen)
1. Product Type: B2B SaaS dashboard, Developer Tool, Editorial/Publishing, E-commerce, Consumer App, Portfolio, atau Public Service.
2. Target Audience: Enterprise procurement, developers, design-conscious consumers, atau general public.
3. Primary Screen Job: Satu kalimat: tugas paling kritis yang harus diselesaikan user di layar ini.
4. Target Visual Language: Linear-style minimalist, Swiss/brutalist, Apple premium, Editorial kinetic, atau Atlassian-dense.
5. Brand Anchors: Warna brand, aturan font, logo assets, atau constraint eksplisit.

### 0.2 Design Read Declaration
Cetak tepat satu baris sebelum generate kode apapun:
`"Reading this as: <Product Type> for <Target Audience>, with a <Visual Language> style, leaning toward <Design System / Token Architecture>."`

Contoh:
`"Reading this as: B2B SaaS analytics dashboard for enterprise financial auditors, with a Linear-inspired high-density language, leaning toward Tailwind CSS v4 OKLCH tokens + Geist Mono + restrained spring motion."`

---

## 1. THREE PARAMETER DIALS (Konfigurasi Eksekusi)

Set tiga parameter numerik (skala 1-10) setelah Design Read untuk mengontrol layout, motion, dan kepadatan visual.

| Parameter | Skala 1-3 | Skala 4-7 | Skala 8-10 |
|:---|:---|:---|:---|
| `DESIGN_VARIANCE` | Strict symmetry, traditional grid (Banking/Public) | Functional asymmetry, modern SaaS | Expressive editorial, experimental grid |
| `MOTION_INTENSITY` | Static, instant state transitions | Micro-interactions, hover/focus, smooth enters | Spring physics, scroll-driven, kinetic typography |
| `VISUAL_DENSITY` | Art Gallery (airy, py-32) | Standard Web (py-16) | Cockpit (packed data, compact padding, 1px dividers) |

Default Baseline: `DESIGN_VARIANCE: 8 | MOTION_INTENSITY: 6 | VISUAL_DENSITY: 4`

---

## 2. SPATIAL, GRID AND INFORMATION DENSITY

### 2.1 Spacing Scale
- WAJIB skala kelipatan 4px / 0.25rem: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- DILARANG nilai spacing acak: 13px, 18px, 27px. Semua ke token CSS.
- Gap elemen inline (icon+label, badge+text): 4px-8px.
- Gap item list/grid: 8px-16px.
- Padding komponen kecil (button, input, chip): 8px vertical / 12-16px horizontal.
- Asymmetric Padding Rule: Padding horizontal HARUS 1.25x-1.5x padding vertikal (px-6 py-4, bukan px-4 py-4).
- Padding card/panel: 16px (dashboard/dense) atau 24px (marketing/editorial).
- Margin antar-section makro: 64px-96px maksimum.
- Minimum Touch Target: Semua elemen interaktif min 44x44px active area.

### 2.2 Information Density
- Tabel data: row-height 36-40px, cell padding horizontal 12px. DILARANG cell padding > 16px pada data table.
- Metric card: tinggi maksimum 96px pada multi-metric dashboard (4+ card sejajar). Format: angka besar + label kecil + delta tanpa ilustrasi dekoratif.
- Purposeful Whitespace: ruang kosong hanya sah jika berfungsi sebagai pemisah hierarki, area target klik/sentuh, atau jeda visual antar-section makro.
- Kill empty space > 15% pada viewport produktivitas (dashboard, admin, tools).

### 2.3 Nesting Container
- Batas maksimal: 1 level nesting (card-in-card). Lebih dari itu DILARANG.
- Level ke-2+: gunakan hairline border atau background token shift, bukan card baru dengan shadow bertumpuk.

### 2.4 Viewport Stability
- Gunakan `min-h-[100dvh]` bukan `h-screen` untuk menghindari mobile Safari layout jumping.

---

## 3. SURFACES, BORDERS AND DEPTH ARCHITECTURE

### 3.1 Hairline Border
- Standar: 1px solid.
  - Dark mode: rgba(255,255,255,0.08) default, rgba(255,255,255,0.12) hover/emphasis.
  - Light mode: rgba(0,0,0,0.06) default, rgba(0,0,0,0.10) hover/emphasis.
- DILARANG border solid warna pekat non-transparan (#CCC, #DDD).
- Border 2px+ HANYA untuk: focus-visible ring, elemen aktif/selected dengan penekanan eksplisit.

### 3.2 Elevation Architecture
- DILARANG shadow tebal: blur > 16px atau opacity > 0.15 pada komponen fungsional.
- Gunakan layered micro-shadow:
  ```css
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04);
  --shadow-md: 0 2px 4px rgba(0,0,0,0.06), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-lg: 0 4px 8px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06);
  ```
- Dark mode: elevasi dibangun dengan brightness surface token, bukan shadow gelap.

### 3.3 Border-Radius Proporsional
- Button, input, badge, chip: 6px-8px.
- Card/panel/container: 8px-12px.
- Modal/sheet/surface makro: maksimum 12px.
- DILARANG border-radius >= 16px pada komponen fungsional.
- Nested radius rule: radius anak = radius induk - padding induk.

---

## 4. PRECISION COLOR ARCHITECTURE (OKLCH + Tailwind CSS v4)

### 4.1 CSS-First Token System (3 Layer)
Definisikan token via `@theme` Tailwind CSS v4:
```css
@import "tailwindcss";

@theme {
  /* Primitive Grays */
  --color-neutral-50:  oklch(0.98 0.005 250);
  --color-neutral-100: oklch(0.95 0.008 250);
  --color-neutral-200: oklch(0.89 0.012 250);
  --color-neutral-800: oklch(0.25 0.015 250);
  --color-neutral-900: oklch(0.15 0.018 250);

  /* Semantic Role Tokens */
  --color-background:       var(--color-neutral-50);
  --color-surface:          oklch(1.00 0.000 250);
  --color-surface-border:   var(--color-neutral-200);
  --color-ink:              var(--color-neutral-900);
  --color-ink-muted:        oklch(0.45 0.015 250);
  --color-primary:          oklch(0.62 0.22 260);
  --color-primary-contrast: oklch(0.99 0 0);

  /* Status Tokens */
  --color-success: oklch(0.65 0.18 145);
  --color-warning: oklch(0.75 0.16 75);
  --color-danger:  oklch(0.58 0.22 25);
  --color-info:    oklch(0.60 0.20 265);
}
```

### 4.2 Rasio Palet dan Contrast
- 90% netral surface/bg/border + 10% accent tunggal.
- SATU warna accent primer per produk.
- DILARANG: pure black (#000000) atau pure white (#FFFFFF) tanpa depth sebagai surface utama.
- DILARANG: gradient ungu-biru (#8B5CF6 ke #6366F1).
- Body text (--color-ink): WCAG AAA (7:1) terhadap surface.
- Muted text (--color-ink-muted): WCAG AA (4.5:1).

---

## 5. TYPOGRAPHY AND MICRO-HIERARCHY

### 5.1 Font Pairing
- Display/Heading: Playfair Display, Bebas Neue, Cabinet Grotesk, Space Grotesk, Geist Mono.
- Body/Data: Plus Jakarta Sans, Satoshi, Inter Tight, Geist Sans.
- Mono: Geist Mono, SF Mono, JetBrains Mono.
- DILARANG Inter atau Roboto sendirian tanpa identitas brand.
- Angka tabel/finansial/metrik WAJIB: `font-variant-numeric: tabular-nums`.

### 5.2 Line-Height and Tracking
- Heading besar (>=24px): letter-spacing -0.02em sampai -0.04em, line-height 1.05-1.15.
- Micro uppercase label: letter-spacing +0.04em sampai +0.08em, ukuran 11-12px, weight medium+.
- DILARANG font-weight 300 atau all-caps pada teks > 16px.

---

## 6. INTERACTION STATES, MOTION AND A11Y

### 6.1 State Wajib (Setiap Elemen Interaktif)
1. Default: baseline kontras AAA/AA.
2. :hover: background shift 4-8%. Tidak ada layout-shifting.
3. :active: scale(0.97-0.99).
4. :focus-visible: 2px solid ring + 2px offset. DILARANG outline: none tanpa pengganti.
5. :disabled: opacity 40-50%, cursor: not-allowed, aria-disabled="true".

### 6.2 Motion and Transitions
- Durasi: 100-180ms micro-interaction, 150-250ms komponen. Maksimum 300ms.
- Easing: Enter `cubic-bezier(0.16, 1, 0.3, 1)`, Exit `cubic-bezier(0.4, 0, 1, 1)`. DILARANG ease-in-out generik.
- Staggered Page Reveals: alur pemuatan bertingkat berbasis CSS murni.
- Fallback `prefers-reduced-motion` WAJIB pada semua transisi dan animasi.

---

## 7. SECURITY, PERFORMANCE AND WORKFLOW PILLARS

1. Security Isolation: AI dilarang membaca atau mengomit file .env atau raw secrets. Gunakan NextAuth/Clerk dan validasi server-side Zod.
2. Database Efficiency: Zero N+1 queries, parameterized queries via ORM.
3. Debounce Input: Wajib useDebounce (250-400ms) pada live search/filter.
4. Spec-Driven Workflow: Spec -> Plan -> Execute (atomic diff) -> Verify (tests).

---

## 8. ANTI-SLOP HARD BANS (20 PANTANGAN MUTLAK)

Auto-reject dan rewrite jika ditemukan:
1. Gradient ungu-biru generik (#8B5CF6 ke #6366F1).
2. Background putih datar pasif (#FFFFFF murni) atau krem/parchment berlebihan.
3. Hero section terpusat simetris atau deretan 3-kolom kartu identik tanpa hierarki.
4. Emoji sebagai ikon fungsional.
5. Drop-shadow tebal (blur > 16px atau opacity > 0.15).
6. Border-radius >= 16px pada button, input, atau card fungsional.
7. Font default browser / Inter sendirian tanpa type pairing.
8. Centering teks paragraf panjang atau label form.
9. Ikon dekoratif besar tanpa fungsi.
10. Warna semantik dipakai dekoratif.
11. Placeholder-as-label (hilang saat mengetik, tanpa label permanen).
12. Border + shadow + background-color ditumpuk pada satu card sederhana.
13. Nesting card > 1 level.
14. Purposeless whitespace > 15% pada UI produktivitas.
15. Em-dash atau en-dash sebagai elemen desain atau separator teks.
16. Eyebrow section label berlebihan (> ceil(sections / 3)).
17. Glassmorphism backdrop-blur tidak terkontrol pada semua kontainer.
18. Membaca atau mengomit file .env atau secrets.
19. Custom handwritten auth dari nol tanpa library teruji.
20. Search input tanpa debounce atau query SQL tanpa parameterization.

---

## 9. PRE-FLIGHT AUDIT CHECKLIST

- [ ] Brief Inference declared (1 baris sebelum kode)
- [ ] Parameter Dials set (DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY)
- [ ] Zero em-dashes / en-dashes
- [ ] Type pairing terverifikasi (Display + Body)
- [ ] OKLCH color tokens di @theme (tanpa inline hex)
- [ ] Contrast: body >= 7:1 (AAA), muted >= 4.5:1 (AA)
- [ ] Asymmetric padding (horizontal 1.25x-1.5x vertical)
- [ ] Touch targets >= 44x44px
- [ ] Single accent color konsisten
- [ ] prefers-reduced-motion fallback aktif
- [ ] Nesting card maksimal 1 level
- [ ] 5 state interaktif lengkap pada semua button/input
- [ ] Form label persisten ada
- [ ] Validasi Zod pada boundary server
- [ ] Tidak ada akses rahasia .env
- [ ] Search input debounced
- [ ] Semua 20 hard bans lolos verifikasi
