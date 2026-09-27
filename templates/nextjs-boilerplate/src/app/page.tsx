"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Database,
  Layers,
  RefreshCw,
  Search,
  Server,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { DataTable, type Column } from "@/components/ui/data-table";

interface Metric {
  label: string;
  value: string;
  unit: string;
  delta: string;
  trend: "up" | "down" | "neutral";
  sparkline: number[];
}

const METRICS: Metric[] = [
  {
    label: "Throughput",
    value: "142,890",
    unit: "req/s",
    delta: "12.4%",
    trend: "up",
    sparkline: [45, 52, 49, 60, 58, 65, 72, 68, 74, 82, 90, 88],
  },
  {
    label: "P99 Latency",
    value: "14.2",
    unit: "ms",
    delta: "3.1%",
    trend: "down",
    sparkline: [22, 20, 19, 18, 17, 16, 15, 15, 14, 14.5, 14.2, 14.2],
  },
  {
    label: "Error Rate",
    value: "0.002",
    unit: "%",
    delta: "0.001%",
    trend: "down",
    sparkline: [0.008, 0.006, 0.005, 0.004, 0.003, 0.002, 0.003, 0.002],
  },
  {
    label: "Active Nodes",
    value: "1,024",
    unit: "cl",
    delta: "0.0%",
    trend: "neutral",
    sparkline: [1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024],
  },
];

interface LogEntry {
  id: string;
  timestamp: string;
  service: string;
  status: "healthy" | "warning" | "error";
  latency: number;
  message: string;
}

const LOGS: LogEntry[] = [
  {
    id: "tx-9941",
    timestamp: "04:02:18.421",
    service: "auth-gateway",
    status: "healthy",
    latency: 8.4,
    message: "POST /v1/auth/token - Handshake 200 OK [mTLS verified]",
  },
  {
    id: "tx-9942",
    timestamp: "04:02:19.102",
    service: "order-engine",
    status: "healthy",
    latency: 12.1,
    message: "MATCH_LIMIT BTC-USDT size=4.52 fill_rate=100%",
  },
  {
    id: "tx-9943",
    timestamp: "04:02:19.450",
    service: "risk-daemon",
    status: "healthy",
    latency: 4.8,
    message: "MARGIN_EVAL client_id=c_901x status=CLEARED",
  },
  {
    id: "tx-9944",
    timestamp: "04:02:20.002",
    service: "telemetry-agg",
    status: "warning",
    latency: 42.6,
    message: "QUEUE_BACKPRESSURE threshold 80% reached on stream_3",
  },
  {
    id: "tx-9945",
    timestamp: "04:02:20.512",
    service: "settlement",
    status: "healthy",
    latency: 16.9,
    message: "BATCH_FINALIZED block_height=894102 hash=0x41f9..02d",
  },
];

const NAV = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "nodes", label: "Cluster Nodes", icon: Server },
  { id: "pipelines", label: "Data Pipelines", icon: Layers },
  { id: "database", label: "Storage & Cache", icon: Database },
  { id: "terminal", label: "CLI Console", icon: Terminal },
];

const STATUS_BADGE = {
  healthy: { variant: "success" as const, label: "OK 200" },
  warning: { variant: "warning" as const, label: "WARN 429" },
  error: { variant: "danger" as const, label: "FAIL 500" },
};

const COLUMNS: Column<LogEntry>[] = [
  {
    header: "Trace ID",
    accessorKey: "id",
    cell: (row) => <span className="font-semibold text-primary">{row.id}</span>,
  },
  {
    header: "Timestamp",
    accessorKey: "timestamp",
    cell: (row) => <span className="tabular-nums text-ink-muted">{row.timestamp}</span>,
  },
  { header: "Service", accessorKey: "service" },
  {
    header: "Status",
    cell: (row) => (
      <Badge variant={STATUS_BADGE[row.status].variant}>
        {STATUS_BADGE[row.status].label}
      </Badge>
    ),
  },
  {
    header: "Latency",
    align: "right",
    cell: (row) => `${row.latency} ms`,
  },
  { header: "Message Detail", accessorKey: "message" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-[100dvh] bg-background text-ink">
      <aside className="flex w-60 shrink-0 flex-col justify-between border-r border-surface-border bg-surface">
        <div>
          <div className="flex h-14 items-center justify-between border-b border-surface-border px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-contrast">
                V
              </div>
              <span className="text-sm font-semibold tracking-tight">
                VORTEX // ENGINE
              </span>
            </div>
            <Badge variant="neutral">v2.5</Badge>
          </div>

          <nav className="space-y-1 p-3">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-xs font-medium interactive-subtle ${
                    isActive
                      ? "border-surface-border bg-surface-hover font-semibold text-ink"
                      : "border-transparent text-ink-secondary hover:bg-surface-hover hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-surface-border bg-surface-hover p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
              System Integrity
            </span>
            <span className="font-mono text-[11px] tabular-nums text-success">
              99.998%
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-active">
            <div className="h-full w-[99.9%] bg-success" />
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="h-2 w-2 rounded-full bg-success" />
            All Systems Nominal
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border bg-surface px-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              Cluster // US-EAST-1A
            </span>
            <span className="text-xs text-ink-muted">/</span>
            <span className="text-xs font-medium">
              Production Execution Engine
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                placeholder="Search trace or telemetry id"
                aria-label="Search trace or telemetry id"
                className="h-8 w-64 rounded-md border border-surface-border bg-surface-hover pl-8 pr-3 text-xs text-ink placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <Button size="sm" variant="secondary">
              <RefreshCw className="h-3.5 w-3.5" />
              Sync
            </Button>
            <Button size="sm" variant="primary">
              Deploy
            </Button>
          </div>
        </header>

        <div className="space-y-6 overflow-y-auto p-6">
          <section
            aria-label="Key metrics"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {METRICS.map((m) => (
              <MetricCard
                key={m.label}
                label={m.label}
                value={m.value}
                unit={m.unit}
                delta={{ value: m.delta, trend: m.trend }}
                sparkline={m.sparkline}
              />
            ))}
          </section>

          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-border bg-surface-hover px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Live Execution Trace Stream
                </span>
                <Badge variant="neutral">Auto-Refreshing</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  Filter
                </Button>
                <Button size="sm" variant="ghost">
                  Export CSV
                </Button>
              </div>
            </div>

            <DataTable
              columns={COLUMNS}
              data={LOGS}
              className="rounded-none border-0"
            />

            <div className="flex items-center justify-between border-t border-surface-border bg-surface-hover px-4 py-2.5 font-mono text-xs text-ink-muted">
              <span className="tabular-nums">
                Showing 5 of 14,290 active events
              </span>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" disabled>
                  Prev
                </Button>
                <Button size="sm" variant="ghost">
                  Next
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
