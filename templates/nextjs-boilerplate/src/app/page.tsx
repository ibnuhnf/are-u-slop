"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface MetricData {
  label: string;
  value: string;
  delta: string;
  isPositive: boolean;
  unit?: string;
  sparkline: number[];
}

const METRICS: MetricData[] = [
  {
    label: "THROUGHPUT",
    value: "142,890",
    unit: "req/s",
    delta: "+12.4%",
    isPositive: true,
    sparkline: [45, 52, 49, 60, 58, 65, 72, 68, 74, 82, 90, 88],
  },
  {
    label: "P99 LATENCY",
    value: "14.2",
    unit: "ms",
    delta: "-3.1%",
    isPositive: true,
    sparkline: [22, 20, 19, 18, 17, 16, 15, 15, 14, 14.5, 14.2, 14.2],
  },
  {
    label: "ERROR RATE",
    value: "0.002",
    unit: "%",
    delta: "-0.001%",
    isPositive: true,
    sparkline: [0.008, 0.006, 0.005, 0.004, 0.003, 0.002, 0.003, 0.002],
  },
  {
    label: "ACTIVE NODES",
    value: "1,024",
    unit: "cl",
    delta: "100%",
    isPositive: true,
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex min-h-[100dvh] bg-[var(--color-bg-app)] text-[var(--color-ink-primary)]">
      {/* Sidebar Navigation */}
      <aside className="w-60 border-r border-[var(--color-border-hairline)] bg-[var(--color-bg-surface)] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="h-14 px-5 border-b border-[var(--color-border-hairline)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded bg-[var(--color-accent)] flex items-center justify-center font-mono font-bold text-xs text-white">
                V
              </div>
              <span className="font-semibold text-sm tracking-tight text-[var(--color-ink-primary)]">
                VORTEX // ENGINE
              </span>
            </div>
            <Badge variant="accent">v2.4</Badge>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "nodes", label: "Cluster Nodes", icon: Server },
              { id: "pipelines", label: "Data Pipelines", icon: Layers },
              { id: "database", label: "Storage & Cache", icon: Database },
              { id: "terminal", label: "CLI Console", icon: Terminal },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--color-bg-subtle)] text-[var(--color-ink-primary)] font-semibold border border-[var(--color-border-hairline)]"
                      : "text-[var(--color-ink-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-ink-primary)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* System Health Status */}
        <div className="p-4 border-t border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)]/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[var(--color-ink-muted)]">
              SYSTEM INTEGRITY
            </span>
            <span className="text-[11px] font-mono text-[var(--color-signal-up)]">
              99.998%
            </span>
          </div>
          <div className="w-full bg-[var(--color-bg-hover)] h-1 rounded-full overflow-hidden">
            <div className="bg-[var(--color-signal-up)] h-full w-[99.9%]" />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--color-ink-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-signal-up)] animate-pulse" />
              All Systems Nominal
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar header */}
        <header className="h-14 border-b border-[var(--color-border-hairline)] px-6 flex items-center justify-between bg-[var(--color-bg-surface)] shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-[var(--color-ink-muted)] uppercase tracking-wider">
              CLUSTER // US-EAST-1A
            </span>
            <span className="text-xs text-[var(--color-border-hairline)]">/</span>
            <span className="text-xs font-medium text-[var(--color-ink-primary)]">
              Production Execution Engine
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]" />
              <input
                type="text"
                placeholder="Search trace or telemetry id..."
                className="h-8 pl-8 pr-3 text-xs bg-[var(--color-bg-subtle)] border border-[var(--color-border-hairline)] rounded-md text-[var(--color-ink-primary)] placeholder-[var(--color-ink-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] w-64"
              />
            </div>
            <Button size="sm" variant="secondary">
              <RefreshCw className="w-3.5 h-3.5" />
              Sync
            </Button>
            <Button size="sm" variant="primary">
              Deploy
            </Button>
          </div>
        </header>

        {/* Dashboard Workspace View */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Top Metric Cards (High Density 4-Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {METRICS.map((m, idx) => (
              <Card key={idx} className="p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[var(--color-ink-muted)] font-mono">
                  <span>{m.label}</span>
                  <span className="flex items-center gap-0.5 text-[var(--color-signal-up)] font-mono">
                    <ArrowUpRight className="w-3 h-3" />
                    {m.delta}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl font-mono font-bold tracking-tight text-[var(--color-ink-primary)] tabular-nums">
                    {m.value}
                  </span>
                  {m.unit && (
                    <span className="text-xs font-mono text-[var(--color-ink-muted)]">
                      {m.unit}
                    </span>
                  )}
                </div>
                {/* Micro sparkline visualization */}
                <div className="mt-3 flex items-end gap-1 h-6 pt-1 border-t border-[var(--color-border-hairline)]">
                  {m.sparkline.map((val, i) => {
                    const max = Math.max(...m.sparkline);
                    const min = Math.min(...m.sparkline);
                    const pct = max === min ? 50 : ((val - min) / (max - min)) * 80 + 20;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-[var(--color-accent)]/30 hover:bg-[var(--color-accent)] rounded-xs transition-all duration-100"
                        style={{ height: `${pct}%` }}
                      />
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>

          {/* Core Data Table Container */}
          <Card className="overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[var(--color-border-hairline)] flex items-center justify-between bg-[var(--color-bg-subtle)]/30">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--color-ink-primary)]">
                  LIVE EXECUTION TRACE STREAM
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

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)]/60 text-[var(--color-ink-muted)]">
                    <th className="px-4 py-2.5 font-medium">TRACE ID</th>
                    <th className="px-4 py-2.5 font-medium">TIMESTAMP</th>
                    <th className="px-4 py-2.5 font-medium">SERVICE</th>
                    <th className="px-4 py-2.5 font-medium">STATUS</th>
                    <th className="px-4 py-2.5 font-medium text-right">LATENCY</th>
                    <th className="px-4 py-2.5 font-medium">MESSAGE DETAIL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-hairline)]">
                  {LOGS.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-[var(--color-bg-hover)]/60 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-2.5 text-[var(--color-accent)] font-semibold">
                        {row.id}
                      </td>
                      <td className="px-4 py-2.5 text-[var(--color-ink-muted)] tabular-nums">
                        {row.timestamp}
                      </td>
                      <td className="px-4 py-2.5 text-[var(--color-ink-secondary)]">
                        {row.service}
                      </td>
                      <td className="px-4 py-2.5">
                        {row.status === "healthy" && (
                          <Badge variant="success">OK 200</Badge>
                        )}
                        {row.status === "warning" && (
                          <Badge variant="warning">WARN 429</Badge>
                        )}
                        {row.status === "error" && (
                          <Badge variant="danger">FAIL 500</Badge>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono tabular-nums text-[var(--color-ink-primary)]">
                        {row.latency} ms
                      </td>
                      <td className="px-4 py-2.5 text-[var(--color-ink-secondary)] truncate max-w-md">
                        {row.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="px-4 py-2.5 border-t border-[var(--color-border-hairline)] bg-[var(--color-bg-subtle)]/20 flex items-center justify-between text-xs text-[var(--color-ink-muted)] font-mono">
              <span>Showing 5 of 14,290 active events</span>
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
