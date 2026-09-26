# UI and Visual Design Tokens (Anti-Slop Standard)
> Sintesis: UI-Craft, Apple HIG, Base UI, Linear, Vibe Playbook, OKLCH Architecture

---

## 1. Zero-Slop Visual Baseline
- Dilarang: Gradient ungu-biru ("AI startup gradient", #8B5CF6 ke #6366F1) di background, card, atau button.
- Dilarang: Background putih datar pasif (#FFFFFF murni tanpa depth) atau krem/parchment berlebihan.
- Dilarang: Hero section terpusat simetris membosankan atau deretan 3 kartu identik tanpa variasi hierarki.
- Dilarang: Border-radius berlebihan (>=16px, rounded-3xl, pill shape pada container fungsional). Maksimal radius card: 8px-12px.
- Dilarang: Drop shadow tebal (blur > 16px atau opacity > 0.15).
- Dilarang: Card nesting > 1 level (card di dalam card dengan shadow bertumpuk). Gunakan hairline border atau background shift token.
- Dilarang: Emoji sebagai pengganti icon teknis/fungsional. Gunakan Lucide, Radix, atau Heroicons berukuran seragam (16px / 20px).

---

## 2. Spatial and Layout Grid (4px Multiple Standard)
- Skala Spacing: Wajib kelipatan 4px (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96). Dilarang nilai acak (13px, 19px, 27px).
- Asymmetric Padding: Padding horizontal 1.25x-1.5x padding vertikal (px-4 py-2.5, px-6 py-4). Dilarang padding bujur sangkar kembung (px-4 py-4).
- Bento Grid Layout: Komposisi asimetris, grid-breaking elements, dan pemanfaatan ruang negatif fungsional.
- Data Table Density: Row height 36-40px, horizontal cell padding 12px.
- Metric Cards: Tinggi maksimal 96px pada layout multi-metric.
- Viewport Stability: Wajib gunakan min-h-[100dvh] alih-alih h-screen untuk mencegah layout jump di browser mobile.

---

## 3. OKLCH Precision Color System (Tailwind CSS v4 Standard)
Definisikan warna melalui token @theme. Dilarang inline arbitrary hex (#6366f1) di class komponen.

```css
@theme {
  /* Primitive Grays */
  --color-neutral-base: oklch(0.14 0.01 250);
  --color-neutral-surface: oklch(0.20 0.015 250);
  --color-neutral-subtle: oklch(0.26 0.018 250);
  --color-neutral-border: oklch(0.32 0.020 250);
  
  /* Text / Ink */
  --color-ink: oklch(0.96 0.005 250);       /* AAA Contrast (>=7:1) */
  --color-ink-muted: oklch(0.70 0.012 250); /* AA Contrast (>=4.5:1) */
  --color-ink-subtle: oklch(0.52 0.015 250);

  /* Single Semantic Brand Accent (90/10 Rule: 90% monochrome, 10% accent) */
  --color-primary: oklch(0.62 0.22 260);
  --color-primary-contrast: oklch(0.98 0 0);

  /* Semantic Status: HANYA untuk status riil, dilarang dekoratif */
  --color-success: oklch(0.65 0.18 145);
  --color-warning: oklch(0.75 0.16 75);
  --color-danger: oklch(0.58 0.22 25);
}
```

---

## 4. Surfaces, Hairline Borders and Restrained Glass
- Hairline Border: 1px solid.
  - Dark mode: rgba(255, 255, 255, 0.08) default, rgba(255, 255, 255, 0.14) hover/focus.
  - Light mode: rgba(0, 0, 0, 0.06) default, rgba(0, 0, 0, 0.12) hover/focus.
- Layered Micro-Shadow:
  ```css
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 1px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.06);
  ```
- Restrained Translucent Glass (Liquid Glass Standard):
  Hanya gunakan untuk floating header, modal overlay, atau media panel. Dilarang pasang di semua card biasa.
  ```css
  background: oklch(0.18 0.015 250 / 0.65);
  border: 1px solid oklch(1 0 0 / 0.12);
  backdrop-filter: blur(16px) saturate(180%);

  /* Wajib Fallback Reduced Transparency */
  @media (prefers-reduced-transparency: reduce) {
    background: oklch(0.18 0.015 250);
    backdrop-filter: none;
  }
  ```

---

## 5. Typography and Micro-Hierarchy
- Type Pairing: 
  - Display Font: Playfair Display, Bebas Neue, Cabinet Grotesk, Space Grotesk, Geist Mono.
  - Body Font: Plus Jakarta Sans, Satoshi, Inter Tight, Geist Sans.
- Dilarang: Inter atau Roboto sendirian tanpa pairing karakter brand.
- Mono/Data: Geist Mono, SF Mono, JetBrains Mono. Wajib `font-variant-numeric: tabular-nums` untuk angka keuangan, jam, delta, dan tabel.
- Tracking Headings (>=24px): -0.02em sampai -0.04em, line-height 1.05-1.15.
- Micro Uppercase Labels (11-12px): tracking +0.04em sampai +0.08em, font-weight 500 / 600.
- Dilarang: Font-weight 300 (terlalu tipis) atau All-Caps pada teks >16px.

---

## 6. Modern Component Libraries and MCP Integration
- Gunakan pustaka komponen copy-paste berbasis Tailwind CSS:
  - shadcn/ui, Kibo UI, Base UI, Fragments UI, Untitled UI, DaisyUI.
- Integrasi MCP (Model Context Protocol):
  - Hubungkan agen AI ke MCP server komponen untuk validasi props, variants, dan sintaks JSX secara real-time.
