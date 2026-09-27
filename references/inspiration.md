# Inspiration Catalog — Anti-Slop UI Engine
> Referensi visual direction, palette preset, dan typography pairing untuk AI agent dan design engineer.
> **Catatan**: Ini adalah inspirasi, bukan aturan. Pilih yang sesuai konteks proyek. Jangan paksakan mirip.

---

## 1. SaaS Design Archetypes (Steal the Grammar, Not the Pixels)

| Produk | Inti Filosofi | Yang Bisa Diambil |
|---|---|---|
| **Linear** | Quiet chrome, near-monochrome, keyboard-first | 1px panel dividers, satu level detail sekaligus, shortcut keyboard |
| **Stripe** | Data table sebagai antarmuka utama | Tabular numerals, inline sparkline, drill-down drawer |
| **Vercel** | Monochrome murni — weight + spacing + border | Warna HANYA untuk status badge, zero decorative color wash |
| **Attio** | AI output sebagai UI component kelas satu | LLM response → structured Bento card + action trigger |
| **Mercury** | Laporan keuangan bergaya publikasi editorial | Typography crisp, card padding `px-8 py-6`, dark surface calm |
| **PostHog** | Analytics padat dengan personalitas brand | Card title = satu pertanyaan, satu insight per card |
| **Supabase** | Multi-tool console dengan scaffolding terpadu | Satu brand color membawa seluruh identitas dark console |
| **Plausible** | Single-page restraint — zero config fatigue | 1 hero metric, maks 4 metrik sekunder, 1 trend chart di atas |

---

## 2. Visual Direction Presets

Pilih satu sesuai konteks proyek. Jangan campur.

### Direction A — Cold Luxury / Precision Industrial
**Cocok untuk**: Dev tools, infra platform, hardware, high-end SaaS.
```
Palette:    background oklch(0.16 0.01 250), surface oklch(0.22 0.015 250)
Accent:     electric cyan atau emerald
Typography: Geist Mono (heading) + Plus Jakarta Sans (body)
Layout:     asymmetric split-screen, 1px sharp border, zero hairline dekoratif
```

### Direction B — Editorial Kinetic
**Cocok untuk**: Creative portfolio, agency landing, publishing, AI research lab.
```
Palette:    off-white oklch(0.98 0.005 80), deep ink oklch(0.18 0.02 80)
Accent:     burnt orange atau terracotta
Typography: Cabinet Grotesk / Space Grotesk (display) + Geist Sans (body)
Layout:     whitespace vertikal generous, headline besar (text-5xl+), 2-col staggered
```

### Direction C — Bento Box Modular
**Cocok untuk**: Feature showcase, product marketing, multi-capability landing.
```
Palette:    tinted neutral oklch(0.96 0.008 250), pure white surface
Accent:     subtle brand tint border
Typography: Satoshi (heading) + Inter Tight (body)
Layout:     asymmetric grid cell (2-col atas, 3-col bawah), variasi konten per cell
```

### Direction D — Terminal / Low-Light NOC
**Cocok untuk**: Cybersecurity, DevOps monitoring, real-time logging, trading desk.
```
Palette:    deep charcoal oklch(0.12 0.01 220), terminal surface oklch(0.18 0.015 220)
Accent:     phosphor green atau amber
Typography: JetBrains Mono (heading + metric) + Geist Sans (body)
Layout:     VISUAL_DENSITY: 8, 1px grid line, tabular data, zero drop shadow
```

### Direction E — Translucent Glass (Glassmorphism Done Right)
**Cocok untuk**: Media player, spatial computing, modal overlay, weather/finance overlay.
**BUKAN untuk UI produktivitas umum.**
```css
background: oklch(0.20 0.015 250 / 0.6);
border: 1px solid oklch(1 0 0 / 0.15);
backdrop-filter: blur(16px) saturate(180%);
/* WAJIB fallback: */
@media (prefers-reduced-transparency: reduce) {
  background: oklch(0.20 0.015 250); /* solid fill */
  backdrop-filter: none;
}
```

---

## 3. OKLCH Color Palette Presets

Preset di bawah hanya menimpa **Layer 2 semantic role** dari token kanonik (`templates/nextjs-boilerplate/src/app/globals.css`). Nama token tidak berubah, hanya nilai OKLCH-nya. Pakai SATU preset saja per proyek.

### Preset 1 — Linear Slate & Electric Indigo (Dark)
```css
@theme {
  --color-background:       oklch(0.15 0.015 250);
  --color-surface:          oklch(0.22 0.018 250);
  --color-surface-border:   oklch(0.32 0.020 250);
  --color-ink:              oklch(0.96 0.005 250);
  --color-ink-muted:        oklch(0.68 0.012 250);
  --color-primary:          oklch(0.62 0.220 260); /* Electric Indigo */
  --color-primary-contrast: oklch(0.98 0 0);
}
```

### Preset 2 — Supabase Dark Emerald (Dark)
```css
@theme {
  --color-background:       oklch(0.14 0.012 160);
  --color-surface:          oklch(0.20 0.018 160);
  --color-surface-border:   oklch(0.30 0.022 160);
  --color-ink:              oklch(0.97 0.005 160);
  --color-ink-muted:        oklch(0.70 0.015 160);
  --color-primary:          oklch(0.68 0.200 160); /* Emerald */
  --color-primary-contrast: oklch(0.12 0.015 160);
}
```

### Preset 3 — Mercury Cold Slate & Rust (Light)
```css
@theme {
  --color-background:       oklch(0.98 0.005 25);
  --color-surface:          oklch(1.00 0.000 25);
  --color-surface-border:   oklch(0.90 0.010 25);
  --color-ink:              oklch(0.18 0.015 25);
  --color-ink-muted:        oklch(0.48 0.012 25);
  --color-primary:          oklch(0.52 0.180 35); /* Rust / Terracotta */
  --color-primary-contrast: oklch(0.99 0 0);
}
```

---

## 4. Typography Pairings (Karakter-Rich, Bukan Default Inter)

| Display / Heading | Body / Data | Aesthetic | Source |
|---|---|---|---|
| **Geist Mono** | **Plus Jakarta Sans** | Precision Industrial / DevTool | Vercel / Next.js Fonts |
| **Cabinet Grotesk** | **Geist Sans** | High-Craft Editorial / Agency | Fontshare |
| **Space Grotesk** | **Inter Tight** | Futuristic Tech / Web3 | Google Fonts |
| **Satoshi** | **JetBrains Mono** | Modern B2B SaaS | Fontshare |
| **Plus Jakarta Sans** Bold | **IBM Plex Sans** | Corporate Financial / Enterprise | Google Fonts |

---

## 5. Bento Grid — Rules Sel

Bento grid untuk feature showcase. Jangan paksakan pada dashboard data-dense.

**Aturan variasi sel** (untuk 4+ sel):
- **Hero Cell (span 2 col)**: komponen interaktif live atau metrik high-impact.
- **Metric Cell (span 1 col)**: angka besar tabular, background tinted.
- **Code/Visual Cell**: dark/tinted background, code snippet atau ikon kontekstual.
- **Data/Workflow Cell (span 2 col)**: mini data table, workflow diagram, atau toggle interaktif.

**Aturan keras**: Jangan isi 6 sel Bento dengan 6 card teks-putih identik.

```tsx
// Contoh pola Bento minimal (Tailwind CSS v4, token kanonik dari templates/nextjs-boilerplate/src/app/globals.css)
export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 py-12">
      {/* Hero Cell */}
      <div className="md:col-span-2 bg-surface border border-surface-border rounded-lg p-6 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-ink-muted">
            Feature 01
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-ink mt-2">
            Real-Time Event Ingestion
          </h3>
          <p className="text-sm text-ink-muted mt-1 max-w-md">
            Process over 100k events/sec with zero latency overhead.
          </p>
        </div>
        <div className="mt-6 h-32 bg-background rounded-md border border-surface-border p-3 font-mono text-xs text-ink-muted">
          {/* Telemetry stream visualization */}
        </div>
      </div>

      {/* Metric Cell */}
      <div className="bg-surface border border-surface-border rounded-lg p-6 flex flex-col justify-between">
        <span className="text-[11px] font-mono uppercase tracking-[0.04em] text-primary">
          Uptime SLA
        </span>
        <div className="text-5xl font-semibold text-ink tracking-tight font-mono tabular-nums my-4">
          99.99%
        </div>
        <p className="text-xs text-ink-muted">
          Guaranteed availability across 12 regions.
        </p>
      </div>
    </div>
  )
}
```

> Catatan: `bg-surface`, `text-ink-muted`, `border-surface-border` adalah utility yang dihasilkan `@theme` di file token kanonik. Jangan tulis `bg-[--color-surface]` atau `bg-[var(--color-surface)]`.


---

## Catatan Penggunaan

- **Pilih satu Direction**, jangan campur A+C atau B+D dalam satu produk.
- **Pilih satu Preset palette**, swap hue sesuai brand — jangan pakai preset mentah untuk produk nyata.
- **Typography pairing** bukan aturan, tapi titik awal — sesuaikan dengan brand font jika sudah ada.
- Glassmorphism (Direction E) hanya untuk UI overlay spesifik, bukan default produktivitas.
