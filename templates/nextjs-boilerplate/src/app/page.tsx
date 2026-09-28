"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeftRight,
  CreditCard,
  Database,
  Download,
  GitCompareArrows,
  Landmark,
  QrCode,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Wallet,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { AreaChart } from "@/components/ui/area-chart";
import { StatBreakdown, type BreakdownRow } from "@/components/ui/stat-breakdown";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DataTable, type Column, type SortState } from "@/components/ui/data-table";
import {
  buildMetrics,
  CHANNEL_LABEL,
  HOURLY_VOLUME,
  STATUS_LABEL,
  STATUS_TONE,
  TRANSACTIONS,
  type Transaction,
  type TxChannel,
  type TxStatus,
} from "@/lib/data";

const NAV = [
  { id: "overview", label: "Ringkasan", icon: Activity },
  { id: "transactions", label: "Transaksi", icon: ArrowLeftRight },
  { id: "settlement", label: "Settlement", icon: Landmark },
  { id: "risk", label: "Risk & Fraud", icon: ShieldCheck },
  { id: "ledger", label: "Ledger", icon: Database },
];

type StatusFilter = TxStatus | "all";
type ChannelFilter = TxChannel | "all";

const CHANNEL_ICON: Record<TxChannel, React.ElementType> = {
  card: CreditCard,
  bank_transfer: Landmark,
  ewallet: Wallet,
  qris: QrCode,
};

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("overview");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [sort, setSort] = useState<SortState | null>({ key: "amount", direction: "desc" });
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [lastSync, setLastSync] = useState("04:02:18");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let rows = TRANSACTIONS.filter((tx) => {
      const matchQuery =
        q.length === 0 ||
        tx.id.toLowerCase().includes(q) ||
        tx.merchant.toLowerCase().includes(q) ||
        tx.region.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || tx.status === statusFilter;
      const matchChannel = channelFilter === "all" || tx.channel === channelFilter;
      return matchQuery && matchStatus && matchChannel;
    });

    if (sort) {
      const key = sort.key as keyof Transaction;
      rows = [...rows].sort((a, b) => {
        const left = a[key];
        const right = b[key];
        const cmp =
          typeof left === "number" && typeof right === "number"
            ? left - right
            : String(left).localeCompare(String(right));
        return sort.direction === "asc" ? cmp : -cmp;
      });
    }

    return rows;
  }, [query, statusFilter, channelFilter, sort]);

  const metrics = useMemo(() => buildMetrics(filtered), [filtered]);

  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = {
      all: TRANSACTIONS.length,
      settled: 0,
      pending: 0,
      review: 0,
      failed: 0,
      refunded: 0,
    };
    for (const tx of TRANSACTIONS) counts[tx.status] += 1;
    return counts;
  }, []);

  const channelRows = useMemo<BreakdownRow[]>(() => {
    const total = filtered.reduce((sum, tx) => sum + tx.amount, 0) || 1;
    const byChannel = new Map<TxChannel, { amount: number; count: number }>();

    for (const tx of filtered) {
      const entry = byChannel.get(tx.channel) ?? { amount: 0, count: 0 };
      entry.amount += tx.amount;
      entry.count += 1;
      byChannel.set(tx.channel, entry);
    }

    return (Object.keys(CHANNEL_LABEL) as TxChannel[])
      .map((channel) => {
        const entry = byChannel.get(channel) ?? { amount: 0, count: 0 };
        return {
          label: CHANNEL_LABEL[channel],
          value: formatIDR(entry.amount),
          share: (entry.amount / total) * 100,
          hint: `${entry.count} transaksi`,
        };
      })
      .sort((a, b) => b.share - a.share);
  }, [filtered]);

  const regionRows = useMemo<BreakdownRow[]>(() => {
    const counts = new Map<string, number>();
    for (const tx of filtered) {
      counts.set(tx.region, (counts.get(tx.region) ?? 0) + 1);
    }
    const total = filtered.length || 1;
    return [...counts.entries()]
      .map(([region, count]) => ({
        label: region,
        value: `${count}`,
        share: (count / total) * 100,
      }))
      .sort((a, b) => b.share - a.share)
      .slice(0, 6);
  }, [filtered]);

  const columns = useMemo<Column<Transaction>[]>(
    () => [
      {
        header: "Trace ID",
        accessorKey: "id",
        sortable: true,
        cell: (row) => (
          <span className="font-mono text-xs font-medium text-primary">
            {row.id}
          </span>
        ),
      },
      {
        header: "Waktu",
        accessorKey: "createdAt",
        sortable: true,
        cell: (row) => (
          <span className="font-mono text-xs tabular-nums text-ink-muted">
            {row.createdAt}
          </span>
        ),
      },
      {
        header: "Merchant",
        accessorKey: "merchant",
        sortable: true,
        cell: (row) => (
          <div className="flex items-center gap-2">
            {React.createElement(CHANNEL_ICON[row.channel], {
              className: "h-3.5 w-3.5 shrink-0 text-ink-muted",
              "aria-hidden": true,
            })}
            <span className="truncate">{row.merchant}</span>
          </div>
        ),
      },
      {
        header: "Region",
        accessorKey: "region",
        sortable: true,
        cell: (row) => (
          <span className="font-mono text-xs text-ink-secondary">{row.region}</span>
        ),
      },
      {
        header: "Risk",
        accessorKey: "riskScore",
        sortable: true,
        align: "right",
        cell: (row) => (
          <span
            className={
              row.riskScore >= 75
                ? "text-danger"
                : row.riskScore >= 45
                  ? "text-warning"
                  : "text-ink-muted"
            }
          >
            {row.riskScore}
          </span>
        ),
      },
      {
        header: "Nominal",
        accessorKey: "amount",
        sortable: true,
        align: "right",
        cell: (row) => formatIDR(row.amount),
      },
      {
        header: "Status",
        accessorKey: "status",
        sortable: true,
        cell: (row) => (
          <Badge variant={STATUS_TONE[row.status]}>
            {STATUS_LABEL[row.status]}
          </Badge>
        ),
      },
      {
        header: "Latency",
        accessorKey: "latencyMs",
        sortable: true,
        align: "right",
        cell: (row) => `${row.latencyMs.toFixed(1)} ms`,
      },
    ],
    []
  );

  const activeFilterCount =
    (statusFilter === "all" ? 0 : 1) + (channelFilter === "all" ? 0 : 1) + (query ? 1 : 0);

  return (
    <div className="flex min-h-[100dvh] bg-background text-ink">
      <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-surface-border bg-surface lg:flex">
        <div>
          <div className="flex h-14 items-center justify-between border-b border-surface-border px-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-contrast">
                V
              </span>
              <span className="text-sm font-semibold tracking-tight">
                VORTEX PAY
              </span>
            </div>
            <Badge variant="neutral">v2.5</Badge>
          </div>

          <nav className="space-y-0.5 p-2" aria-label="Navigasi utama">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center justify-between rounded-md border px-2.5 py-2 text-xs font-medium interactive-subtle ${
                    isActive
                      ? "border-surface-border bg-surface-hover font-semibold text-ink"
                      : "border-transparent text-ink-secondary hover:bg-surface-hover hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.label}
                  </span>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-3 border-t border-surface-border px-2 pt-3">
            <Link
              href="/compare"
              className="flex items-center justify-between rounded-md border border-transparent px-2.5 py-2 text-xs font-medium text-ink-secondary interactive-subtle hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="flex items-center gap-2.5">
                <GitCompareArrows className="h-3.5 w-3.5" aria-hidden="true" />
                Slop vs Anti-Slop
              </span>
              <span className="font-mono text-[11px] text-ink-muted">/compare</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-surface-border bg-surface-hover p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              Uptime 30d
            </span>
            <span className="font-mono text-[11px] tabular-nums text-success">
              99.982%
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-active">
            <div className="h-full w-[99.9%] bg-success" />
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            Semua sistem normal
          </p>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-surface-border bg-surface px-4 lg:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden font-mono text-[11px] uppercase tracking-wider text-ink-muted md:inline">
              Gateway // JKT-1
            </span>
            <span className="hidden text-xs text-ink-muted md:inline" aria-hidden="true">
              /
            </span>
            <h1 className="truncate text-xs font-medium">
              Rekonsiliasi pembayaran real-time
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="relative hidden md:block">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari trace id, merchant, region"
                aria-label="Cari transaksi"
                className="h-8 w-56 rounded-md border border-surface-border bg-surface-hover pl-7 pr-7 text-xs text-ink placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:w-64"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <ThemeToggle />

            <Link
              href="/compare"
              aria-label="Buka perbandingan slop vs anti-slop"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-surface-border bg-surface px-2.5 text-xs font-medium text-ink-secondary interactive-subtle hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
            >
              <GitCompareArrows className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Compare</span>
            </Link>

            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                setLastSync(
                  new Date().toLocaleTimeString("id-ID", { hour12: false })
                )
              }
            >
              <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Sync</span>
            </Button>

            <Button size="sm" variant="primary">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 lg:p-5">
          <section aria-label="Metrik utama">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.key}
                  label={metric.label}
                  value={metric.value}
                  unit={metric.unit}
                  delta={metric.delta}
                  trend={metric.trend}
                  positive={metric.trend === "up"}
                  caption={metric.caption}
                  sparkline={metric.sparkline}
                />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
                <div>
                  <h2 className="text-xs font-semibold">
                    Volume transaksi per jam
                  </h2>
                  <p className="mt-0.5 font-mono text-[11px] tabular-nums text-ink-muted">
                    24 jam terakhir, sinkron terakhir {lastSync}
                  </p>
                </div>
                <Badge variant="neutral">Live</Badge>
              </div>
              <div className="p-4">
                <AreaChart data={HOURLY_VOLUME} label="Volume transaksi 24 jam" />
              </div>
            </Card>

            <Card className="p-4">
              <StatBreakdown title="Volume per channel" rows={channelRows} />
            </Card>
          </div>

          <Card className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border bg-surface-hover px-4 py-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  className="h-3.5 w-3.5 text-ink-muted"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold">Ledger transaksi</span>
                <Badge variant="neutral">
                  {filtered.length} / {TRANSACTIONS.length}
                </Badge>
                {activeFilterCount > 0 && (
                  <Badge variant="warning">{activeFilterCount} filter</Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <SegmentedControl<ChannelFilter>
                  ariaLabel="Filter channel pembayaran"
                  value={channelFilter}
                  onValueChange={setChannelFilter}
                  options={[
                    { value: "all", label: "Semua" },
                    { value: "card", label: "Kartu" },
                    { value: "bank_transfer", label: "Transfer" },
                    { value: "ewallet", label: "E-Wallet" },
                    { value: "qris", label: "QRIS" },
                  ]}
                />

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setQuery("");
                    setStatusFilter("all");
                    setChannelFilter("all");
                    setSort({ key: "amount", direction: "desc" });
                  }}
                  disabled={activeFilterCount === 0}
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="border-b border-surface-border px-4 py-2.5">
              <SegmentedControl<StatusFilter>
                ariaLabel="Filter status transaksi"
                value={statusFilter}
                onValueChange={setStatusFilter}
                options={[
                  { value: "all", label: "Semua status", count: statusCounts.all },
                  { value: "settled", label: "Settled", count: statusCounts.settled },
                  { value: "pending", label: "Pending", count: statusCounts.pending },
                  { value: "review", label: "Review", count: statusCounts.review },
                  { value: "failed", label: "Failed", count: statusCounts.failed },
                  {
                    value: "refunded",
                    label: "Refunded",
                    count: statusCounts.refunded,
                  },
                ]}
              />
            </div>

            <DataTable
              columns={columns}
              data={filtered}
              sort={sort}
              onSortChange={setSort}
              onRowClick={setSelected}
              selectedRow={selected}
              emptyMessage="Tidak ada transaksi yang cocok dengan filter ini."
            />

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-border bg-surface-hover px-4 py-2.5 font-mono text-[11px] tabular-nums text-ink-muted">
              <span>
                Menampilkan {filtered.length} dari {TRANSACTIONS.length} transaksi
              </span>
              <span>
                Total{" "}
                {formatIDR(filtered.reduce((sum, tx) => sum + tx.amount, 0))}
              </span>
            </div>
          </Card>

          <Card className="p-4">
            <StatBreakdown title="Sebaran region" rows={regionRows} />
          </Card>
        </div>
      </main>

      {selected && (
        <aside
          aria-label="Detail transaksi"
          className="fixed inset-y-0 right-0 z-40 flex w-full max-w-sm flex-col border-l border-surface-border bg-surface shadow-md"
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
            <div className="flex items-center gap-2">
              <Server className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold">{selected.id}</span>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Tutup detail"
              className="flex h-7 w-7 items-center justify-center rounded-md text-ink-muted interactive-subtle hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
                {formatIDR(selected.amount)}
              </span>
              <Badge variant={STATUS_TONE[selected.status]}>
                {STATUS_LABEL[selected.status]}
              </Badge>
            </div>

            <dl className="mt-4 divide-y divide-surface-border-subtle border-y border-surface-border-subtle">
              {[
                ["Merchant", selected.merchant],
                ["Channel", CHANNEL_LABEL[selected.channel]],
                ["Region", selected.region],
                ["Waktu", selected.createdAt],
                ["Fee", formatIDR(selected.fee)],
                ["Risk score", `${selected.riskScore} / 100`],
                ["Latency", `${selected.latencyMs.toFixed(1)} ms`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 py-2.5"
                >
                  <dt className="text-xs text-ink-muted">{label}</dt>
                  <dd className="truncate font-mono text-xs tabular-nums text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
              Jejak audit
            </h3>
            <ol className="mt-3 space-y-3 border-l border-surface-border pl-4">
              {[
                ["Diterima gateway", "auth-gateway", "8.4 ms"],
                ["Risk scoring", "risk-daemon", "4.8 ms"],
                ["Diteruskan ke acquirer", "acquirer-bridge", "62.1 ms"],
                ["Callback diterima", "webhook-dispatcher", "31.7 ms"],
              ].map(([step, service, latency]) => (
                <li key={step} className="relative">
                  <span
                    className="absolute -left-[21px] top-1.5 h-1.5 w-1.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-ink">{step}</p>
                  <p className="mt-0.5 font-mono text-[11px] tabular-nums text-ink-muted">
                    {service} · {latency}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex shrink-0 gap-2 border-t border-surface-border p-4">
            <Button size="sm" variant="secondary" className="flex-1">
              Lihat di ledger
            </Button>
            <Button size="sm" variant="primary" className="flex-1">
              Rekonsiliasi ulang
            </Button>
          </div>
        </aside>
      )}
    </div>
  );
}
