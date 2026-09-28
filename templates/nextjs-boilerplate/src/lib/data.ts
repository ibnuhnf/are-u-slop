/**
 * Dataset operasional yang realistis untuk demo.
 * Deterministik (seeded PRNG) supaya render server dan klien identik.
 */

export type TxStatus = "settled" | "pending" | "review" | "failed" | "refunded";
export type TxChannel = "card" | "bank_transfer" | "ewallet" | "qris";

export interface Transaction {
  id: string;
  createdAt: string;
  merchant: string;
  channel: TxChannel;
  region: string;
  amount: number;
  fee: number;
  status: TxStatus;
  riskScore: number;
  latencyMs: number;
}

function mulberry32(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MERCHANTS = [
  "Nusantara Coffee Co",
  "Selatan Logistics",
  "Kirana Beauty",
  "Bakmi Raya Group",
  "Volt Electronics",
  "Aria Fashion House",
  "Delta Pharmacy",
  "Pandan Mart",
  "Sinar Optik",
  "Meridian Books",
  "Tirta Water Co",
  "Kopi Kenangan Dua",
];

const CHANNELS: TxChannel[] = ["card", "bank_transfer", "ewallet", "qris"];
const REGIONS = ["JKT-1", "JKT-2", "SBY-1", "BDG-1", "MDN-1", "MKS-1", "DPS-1"];
const STATUSES: TxStatus[] = [
  "settled",
  "settled",
  "settled",
  "settled",
  "pending",
  "pending",
  "review",
  "failed",
  "refunded",
];

function buildTransactions(count: number): Transaction[] {
  const rnd = mulberry32(20260928);
  const rows: Transaction[] = [];

  for (let i = 0; i < count; i += 1) {
    const amount = Math.round((rnd() * 4_800_000 + 45_000) / 500) * 500;
    const status = STATUSES[Math.floor(rnd() * STATUSES.length)];
    const hour = 9 + Math.floor(rnd() * 11);
    const minute = Math.floor(rnd() * 60);
    const second = Math.floor(rnd() * 60);

    rows.push({
      id: `TRX-${(918_402 + i).toString()}`,
      createdAt: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`,
      merchant: MERCHANTS[Math.floor(rnd() * MERCHANTS.length)],
      channel: CHANNELS[Math.floor(rnd() * CHANNELS.length)],
      region: REGIONS[Math.floor(rnd() * REGIONS.length)],
      amount,
      fee: Math.round(amount * 0.029),
      status,
      riskScore: Math.round(rnd() * 100),
      latencyMs: Math.round((rnd() * 380 + 42) * 10) / 10,
    });
  }

  return rows;
}

export const TRANSACTIONS: Transaction[] = buildTransactions(64);

/** 24 titik volume per jam, dipakai oleh area chart. */
export const HOURLY_VOLUME: number[] = (() => {
  const rnd = mulberry32(770_231);
  const base = [18, 14, 11, 9, 8, 12, 26, 48, 72, 88, 94, 86, 79, 83, 91, 97, 92, 84, 76, 68, 59, 47, 34, 25];
  return base.map((v) => Math.round(v * (0.86 + rnd() * 0.28) * 1000));
})();

export interface MetricSummary {
  key: string;
  label: string;
  value: string;
  unit: string;
  delta: number;
  trend: "up" | "down" | "neutral";
  caption: string;
  sparkline: number[];
}

function compactIDR(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)} rb`;
  return value.toString();
}

export function buildMetrics(rows: Transaction[]): MetricSummary[] {
  const settled = rows.filter((r) => r.status === "settled");
  const volume = settled.reduce((sum, r) => sum + r.amount, 0);
  const fees = settled.reduce((sum, r) => sum + r.fee, 0);
  const failed = rows.filter((r) => r.status === "failed").length;
  const review = rows.filter((r) => r.status === "review").length;
  const approvalRate = rows.length === 0 ? 0 : (settled.length / rows.length) * 100;
  const avgLatency =
    rows.length === 0 ? 0 : rows.reduce((sum, r) => sum + r.latencyMs, 0) / rows.length;

  return [
    {
      key: "volume",
      label: "Gross Volume",
      value: compactIDR(volume),
      unit: "IDR",
      delta: 12.4,
      trend: "up",
      caption: `${settled.length} transaksi settled`,
      sparkline: HOURLY_VOLUME.slice(12, 24).map((v) => v / 1000),
    },
    {
      key: "fees",
      label: "Fee Revenue",
      value: compactIDR(fees),
      unit: "IDR",
      delta: 8.1,
      trend: "up",
      caption: "rata-rata 2,9% per transaksi",
      sparkline: HOURLY_VOLUME.slice(8, 20).map((v) => v / 1100),
    },
    {
      key: "approval",
      label: "Approval Rate",
      value: approvalRate.toFixed(1),
      unit: "%",
      delta: -0.6,
      trend: "down",
      caption: `${failed} gagal, ${review} perlu review`,
      sparkline: HOURLY_VOLUME.slice(4, 16).map((v) => 60 + v / 8),
    },
    {
      key: "latency",
      label: "Avg Latency",
      value: avgLatency.toFixed(1),
      unit: "ms",
      delta: -4.2,
      trend: "down",
      caption: "p95 312 ms, p99 588 ms",
      sparkline: HOURLY_VOLUME.slice(0, 12).map((v) => 340 - v / 2),
    },
  ];
}

export const STATUS_LABEL: Record<TxStatus, string> = {
  settled: "Settled",
  pending: "Pending",
  review: "Review",
  failed: "Failed",
  refunded: "Refunded",
};

export const STATUS_TONE: Record<TxStatus, "success" | "warning" | "danger" | "neutral"> = {
  settled: "success",
  pending: "warning",
  review: "warning",
  failed: "danger",
  refunded: "neutral",
};

export const CHANNEL_LABEL: Record<TxChannel, string> = {
  card: "Kartu",
  bank_transfer: "Transfer Bank",
  ewallet: "E-Wallet",
  qris: "QRIS",
};
