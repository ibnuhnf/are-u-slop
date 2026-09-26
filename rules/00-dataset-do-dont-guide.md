# SINTESIS DATASET 111 GAMBAR: RULES DO & DON'T ANTI-SLOP UI

> Berdasarkan ekstraksi dan analisis komprehensif 111 screenshot UI (`extraction/raw-analysis.json` & `extraction/grouped-archetypes.json`).

---

## I. HASIL PENGELOMPOKAN 5 ARKE TIPE UI (111 GAMBAR)

| Arketipe UI | Jumlah Sampel | Tema Dominan | Tingkat Densitas | Komponen Kunci |
| :--- | :---: | :---: | :---: | :--- |
| **1. Financial Trading & Crypto Terminal** | 32 (28.8%) | Dark (100%) | Ultra-High | Order book, ticker stream, monospace numeric right-aligned, sparklines |
| **2. Enterprise Data Matrix & Audit Grid** | 32 (28.8%) | Light (87.5%) | High | Multi-column table, 1px row separators, status badge pills, compact pagination |
| **3. Minimalist SaaS & Task Workbench** | 31 (27.9%) | Light (100%) | Compact | Collapsible sidebar, segmented control tabs, breadcrumbs, inline action toolbar |
| **4. Executive KPI & Performance Summary** | 11 (9.9%) | Light (100%) | Medium | Quad metric hero cards, delta indicators (+/-), bar distributions |
| **5. Developer Observability & Telemetry** | 5 (4.5%) | High-Contrast | Ultra-High | Real-time trace logs, latency P99 badges, node status matrix |

---

## II. ATURAN DO & DON'T ANTI-SLOP (BERBASIS BUKTI DATASET)

### 1. Border, Surfaces & Depth (Permukaan & Kedalaman)

| Kategori | ❌ DON'T (AI-Slop Cliché) | ✅ DO (Anti-Slop Craftsmanship) |
| :--- | :--- | :--- |
| **Borders** | Border solid tebal (2px-3px), border berwarna-warni tanpa fungsi status, atau border hilang total diganti drop shadow tebal. | **Gunakan hairline border 1px solid**. Light mode: `rgba(0,0,0,0.06-0.08)`. Dark mode: `rgba(255,255,255,0.08-0.12)`. |
| **Shadows** | Drop shadow blur besar (`blur > 20px`, `opacity > 0.25`) yang membuat kartu melayang kembung seperti gelembung. | **Layered micro-shadows tipis** (`--shadow-xs`, `--shadow-sm`, blur max 4px-8px, opacity 4-8%). |
| **Corner Radius** | Sudut terlalu bulat (`rounded-2xl`, `rounded-3xl`, pill shape pada container/card fungsional). | **Radius terukur kaku**: `6px-8px` untuk tombol/input/badge, `8px-12px` untuk card. Jangan melebihi `12px` pada dashboard. |
| **Card Nesting** | Card di dalam card di dalam card dengan shadow bertumpuk 3 level. | **Maksimal 1 level card**. Hirarki turunan gunakan pembatas garis hairline 1px atau background shift subtil (2-4%). |
| **Glow / Glass** | Efek neon glow ungu/cyan di sekeliling border card dan backdrop blur berlebihan pada semua elemen. | **Permukaan netral solid/matte**. Efek blur hanya untuk header melayang atau modal backdrop overlay. |

---

### 2. Palet Warna & Token (Color Architecture)

| Kategori | ❌ DON'T (AI-Slop Cliché) | ✅ DO (Anti-Slop Craftsmanship) |
| :--- | :--- | :--- |
| **Gradients** | Gradien ungu-ke-cyan (*purple-blue AI startup gradient*) pada background body, header, atau tombol utama. | **90% Monokromatik Netral + 10% Satu Warna Aksen**. Background solid netral gelap/terang. |
| **Warna Semantik** | Warna merah, hijau, kuning digunakan sembarangan hanya untuk pemanis estetika dekoratif. | **Warna semantik HANYA untuk status riil**: Hijau = online/profit, Merah = error/loss, Kuning = warning/pending. |
| **Kontras Teks** | Teks abu-abu pudar tak terbaca (*contrast ratio < 3:1*) atau teks pure `#000000` di atas `#FFFFFF` yang menyilaukan. | **Gunakan token OKLCH**: Primary text kontras `≥ 7:1 (AAA)`, Secondary/muted text kontras `≥ 4.5:1 (AA)`. |

---

### 3. Tipografi & Data Numeric (Typography & Data Precision)

| Kategori | ❌ DON'T (AI-Slop Cliché) | ✅ DO (Anti-Slop Craftsmanship) |
| :--- | :--- | :--- |
| **Angka Finansial/Data** | Angka statistik menggunakan font display variabel lebar yang bergetar saat nilainya berganti (*jitter*). | **Wajib `font-mono tabular-nums`** untuk semua data tabel, metrik keuangan, timestamp, dan ID transaksi. |
| **Perataan Angka Tabel** | Angka metrik di tabel di-align rata kiri atau tengah (*left/center aligned*). | **Wajib Rata Kanan (*right-aligned*)** pada kolom numerik tabel agar desimal dan digit sejajar vertikal. |
| **Font Pairing** | Memakai font standar sistem mentah tanpa hierarki atau menggunakan script font dekoratif di dashboard. | **Type Pairing Jelas**: Display/Body (Geist, Inter Tight, Satoshi) dipadukan dengan Monospace teknis (Geist Mono, JetBrains Mono). |
| **Heading & Leading** | Heading tracking lebar renggang dengan leading longgar yang membuang ruang. | **Tight Tracking pada Heading**: Headings `≥ 20px` gunakan `tracking-tight` (-0.02em s/d -0.04em) dan leading ketat (1.1 - 1.2). |

---

### 4. Layout, Spacing & Densitas (Information Density)

| Kategori | ❌ DON'T (AI-Slop Cliché) | ✅ DO (Anti-Slop Craftsmanship) |
| :--- | :--- | :--- |
| **Ruang Kosong (Whitespace)**| Spasi kosong berlebihan (*wasted whitespace > 25%*) di dashboard profesional sehingga pengguna harus banyak scroll. | **High Information Density**: Grid kompak berbasis kelipatan 4px (`4, 8, 12, 16, 20, 24, 32px`). Card metrik padat & to-the-point. |
| **Padding Container** | Padding bujur sangkar kembung (`px-6 py-6`, `p-8` di semua tempat). | **Asymmetric Padding**: Padding horizontal lebih besar dari vertikal (`px-4 py-2.5`, `px-6 py-4`) untuk proporsi visual proporsional. |
| **Struktur Navigasi** | Navigasi melayang-layang tanpa pembatas jelas dari workspace kerja. | **Sidebar Kaku Terstruktur**: Navigasi sidebar kiri yang solid dengan border hairline 1px pemisah jelas ke area konten utama. |
| **Viewport Unit** | Menggunakan `h-screen` yang menyebabkan layout jump / clipping pada peramban mobile. | **Wajib `min-h-[100dvh]`** untuk stabilitas tata letak vertikal di semua peranti. |

---

### 5. Komponen & Interaksi (Component Fidelity)

| Kategori | ❌ DON'T (AI-Slop Cliché) | ✅ DO (Anti-Slop Craftsmanship) |
| :--- | :--- | :--- |
| **Ikonografi** | Menggunakan emoji (`🚀`, `🔥`, `💡`) sebagai ikon tombol/fitur pada dashboard teknis. | **Gunakan Ikon Garis Vektor Seragam**: Lucide / Radix Icons dengan stroke width 1.5px - 1.75px ukuran 14px-18px. |
| **Status Interaktif** | Tombol tanpa state hover/active yang jelas atau focus outline yang dihapus (`outline-none`) tanpa pengganti. | **5 State Lengkap**: Default, Hover (bg shift 4-8%), Active (`scale-[0.98]`), Focus-visible (`ring-2 ring-accent ring-offset-2`), Disabled (`opacity-40 cursor-not-allowed`). |
| **Aksessibilitas Animasi** | Animasi melayang/berputar terus menerus yang mengganggu konsentrasi membaca data. | **Dukungan `prefers-reduced-motion`**: Transisi mikro cepat (100ms-150ms) dan dinonaktifkan jika preferensi gerak rendah aktif. |

---

## III. PRE-FLIGHT CHECKLIST UNTUK AI CODING ASSISTANT

Sebelum AI menghasilkan kode web/dashboard, pastikan seluruh kriteria ini terpenuhi:

- [ ] Tidak ada gradien ungu-biru ala AI startup.
- [ ] Tidak ada drop shadow berlebihan (`blur > 16px`).
- [ ] Border radius kartu maksimal `12px` (tidak ada kartu membulat ekstrem).
- [ ] Angka finansial, metrik KPI, dan tabel data menggunakan `font-mono tabular-nums`.
- [ ] Kolom numerik tabel rata kanan (*right-aligned*).
- [ ] Semua garis pemisah dan border menggunakan hairline 1px solid dengan kontras subtil.
- [ ] Ikon menggunakan set vektor konsisten (Lucide Icons), nol emoji fungsional.
- [ ] Padding asimetris diterapkan (`px > py`).
- [ ] Warna monokrom netral mendominasi 90%, warna aksen maksimal 1 jenis (10%).
- [ ] Dukungan responsif menggunakan `min-h-[100dvh]`.
