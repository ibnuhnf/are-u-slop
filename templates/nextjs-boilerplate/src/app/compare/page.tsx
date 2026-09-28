"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  SlopButton,
  SlopCanvas,
  SlopEmptyState,
  SlopMetricCard,
  SlopNestedCard,
  SlopTable,
} from "@/components/slop-reference";
import { TRANSACTIONS, buildMetrics } from "@/lib/data";

interface DiffRow {
  aspect: string;
  slop: string;
  anti: string;
  rule: string;
}

const DIFFS: DiffRow[] = [
  {
    aspect: "Warna",
    slop: "gradient ungu-cyan, emoji dekoratif",
    anti: "OKLCH monokrom + satu accent, 90/10",
    rule: "rules/01 §3",
  },
  {
    aspect: "Radius",
    slop: "24px di semua elemen",
    anti: "4px badge, 6px kontrol, 8px card, 12px modal",
    rule: "rules/01 §1",
  },
  {
    aspect: "Shadow",
    slop: "blur 40px+, glow berwarna",
    anti: "shadow-xs, blur 2px, opacity 4%",
    rule: "rules/01 §4",
  },
  {
    aspect: "Blur",
    slop: "blur di semua lapisan",
    anti: "tanpa blur, atau khusus overlay + fallback",
    rule: "rules/01 §4",
  },
  {
    aspect: "Nesting",
    slop: "card di dalam card di dalam card",
    anti: "maksimum 1 level, sisanya surface shift",
    rule: "rules/01 §1",
  },
  {
    aspect: "Angka",
    slop: "proporsional, rata kiri, tidak sejajar",
    anti: "tabular-nums, rata kanan, kolom tetap",
    rule: "rules/01 §5",
  },
  {
    aspect: "Kepadatan",
    slop: "py-6 px-8, satu baris per layar",
    anti: "baris 40px, px-3, 12 baris per layar",
    rule: "rules/01 §2",
  },
  {
    aspect: "Empty state",
    slop: "hero terpusat, emoji 7xl, copy ceria",
    anti: "satu baris teks muted di dalam tabel",
    rule: "rules/03",
  },
];

/**
 * Data identik untuk kedua kolom. Angka diambil dari dataset dashboard
 * (src/lib/data.ts) supaya perbandingan benar-benar setara, bukan dua contoh
 * berbeda yang kebetulan mirip.
 */
const SAMPLE = TRANSACTIONS.slice(0, 3);

const IDR = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const ROWS = SAMPLE.map((tx) => ({
  id: tx.id,
  merchant: tx.merchant,
  amount: IDR.format(tx.amount),
}));

const [VOLUME_METRIC] = buildMetrics(TRANSACTIONS);

function SlopLabel() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-danger-bg">
        <X className="h-3 w-3 text-danger" aria-hidden="true" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-danger">
        AI-Slop
      </span>
    </div>
  );
}

function AntiLabel() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-success-bg">
        <Check className="h-3 w-3 text-success" aria-hidden="true" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-success">
        Anti-Slop
      </span>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-[100dvh] bg-background text-ink">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-surface-border bg-surface px-4 lg:px-5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-muted interactive-subtle hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Kembali ke dashboard"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
          <h1 className="text-xs font-semibold">
            AI-Slop vs Anti-Slop, perbandingan langsung
          </h1>
          <Badge variant="neutral">/compare</Badge>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-6xl space-y-8 p-4 lg:p-6">
        <section>
          <h2 className="text-lg font-semibold tracking-tight">
            Bukan sekadar klaim. Lihat sendiri.
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-ink-secondary">
            Kolom kiri adalah gaya default yang dihasilkan AI tanpa aturan.
            Kolom kanan memakai token dan aturan dari repo ini. Keduanya memakai
            data yang sama persis, diambil langsung dari{" "}
            <code className="rounded-sm bg-surface-hover px-1.5 py-0.5 font-mono text-[11px]">
              src/lib/data.ts
            </code>
            , jadi yang berbeda murni keputusan desainnya.
          </p>
        </section>

        <section aria-label="Perbandingan kartu metrik">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              <SlopLabel />
              <SlopCanvas>
                <SlopMetricCard
                  label="Total Revenue"
                  value={`Rp ${VOLUME_METRIC.value}`}
                  delta="+124%"
                />
              </SlopCanvas>
            </div>

            <div className="space-y-3">
              <AntiLabel />
              <MetricCard
                label={VOLUME_METRIC.label}
                value={VOLUME_METRIC.value}
                unit={VOLUME_METRIC.unit}
                delta={VOLUME_METRIC.delta}
                trend={VOLUME_METRIC.trend}
                positive
                caption={VOLUME_METRIC.caption}
                sparkline={VOLUME_METRIC.sparkline}
              />
            </div>
          </div>
        </section>

        <section aria-label="Perbandingan tombol">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SlopCanvas className="flex items-center justify-center py-8">
              <SlopButton>Mulai Sekarang</SlopButton>
            </SlopCanvas>

            <Card className="flex items-center justify-center p-8">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button variant="primary">Export laporan</Button>
                <Button variant="secondary">Filter</Button>
                <Button variant="ghost">Reset</Button>
              </div>
            </Card>
          </div>
        </section>

        <section aria-label="Perbandingan nesting">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SlopCanvas>
              <SlopNestedCard />
            </SlopCanvas>

            <Card className="p-4">
              <div className="rounded-md border border-surface-border-subtle bg-surface-hover p-3">
                <p className="text-xs text-ink-secondary">
                  Satu tingkat nesting. Kedalaman berikutnya memakai surface
                  shift, bukan border dan shadow baru.
                </p>
                <div className="mt-3 rounded-sm bg-surface-active px-2 py-1.5">
                  <span className="font-mono text-[11px] tabular-nums text-ink-muted">
                    depth 2 / surface-active
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section aria-label="Perbandingan tabel">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SlopTable rows={ROWS} />

            <Card className="overflow-hidden">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="h-9 border-b border-surface-border bg-surface-hover">
                    <th className="px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      Trace ID
                    </th>
                    <th className="px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      Merchant
                    </th>
                    <th className="px-3 text-right font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                      Nominal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border-subtle">
                  {ROWS.map((row) => (
                    <tr key={row.id} className="h-10 hover:bg-surface-hover">
                      <td className="px-3 font-mono text-xs text-primary">
                        {row.id}
                      </td>
                      <td className="px-3 text-sm">{row.merchant}</td>
                      <td className="px-3 text-right font-mono text-sm tabular-nums">
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </section>

        <section aria-label="Perbandingan empty state">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <SlopCanvas className="p-4">
              <SlopEmptyState />
            </SlopCanvas>

            <Card className="flex items-center justify-center p-4">
              <p className="py-8 text-sm text-ink-muted">
                Tidak ada transaksi yang cocok dengan filter ini.
              </p>
            </Card>
          </div>
        </section>

        <section aria-label="Tabel keputusan">
          <Card className="overflow-hidden">
            <div className="border-b border-surface-border bg-surface-hover px-4 py-3">
              <h2 className="text-xs font-semibold">
                Delapan keputusan yang membedakannya
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="h-9 border-b border-surface-border">
                    {["Aspek", "AI-Slop", "Anti-Slop", "Aturan"].map((head) => (
                      <th
                        key={head}
                        className="px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border-subtle">
                  {DIFFS.map((row) => (
                    <tr key={row.aspect} className="h-10 hover:bg-surface-hover">
                      <td className="px-3 text-xs font-medium">{row.aspect}</td>
                      <td className="px-3 text-xs text-danger">{row.slop}</td>
                      <td className="px-3 text-xs text-success">{row.anti}</td>
                      <td className="px-3 font-mono text-[11px] text-ink-muted">
                        {row.rule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-surface-border bg-surface p-4">
          <p className="text-sm text-ink-secondary">
            Versi slop ada di{" "}
            <code className="rounded-sm bg-surface-hover px-1.5 py-0.5 font-mono text-[11px]">
              src/components/slop-reference.tsx
            </code>{" "}
            dan sengaja dikecualikan dari linter.
          </p>
          <Link
            href="/"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-contrast interactive-subtle hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Lihat versi anti-slop
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  );
}
