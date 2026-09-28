/**
 * SLOP REFERENCE — JANGAN DIPAKAI DI PRODUKSI.
 *
 * File ini sengaja melanggar setiap aturan Anti-Slop. Tujuannya hanya satu:
 * menjadi bahan pembanding visual di halaman /compare supaya perbedaannya
 * terlihat berdampingan, bukan sekadar dijelaskan di dokumen.
 *
 * Seluruh markup yang melanggar dikurung di file ini, sehingga halaman
 * /compare sendiri tetap bersih. `scripts/check-slop.mjs` mengecualikan file
 * ini lewat daftar IGNORE_FILES karena tujuannya memang memamerkan pelanggaran.
 */

import * as React from "react";
import { Sparkles, TrendingUp, Zap } from "lucide-react";

/** Latar ungu-cyan bergradien. Pembungkus semua demo slop. */
export function SlopCanvas({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-500 to-cyan-400 p-6 shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}

/** Kartu metrik versi slop: gradient, radius besar, shadow tebal, emoji. */
export function SlopMetricCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-400 p-8 shadow-2xl">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="text-3xl">✨</span>
          <span className="text-sm font-light uppercase tracking-[0.2em] text-white/70">
            {label}
          </span>
        </div>
        <p className="mt-6 text-5xl font-thin text-white">{value}</p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm text-white backdrop-blur-xl">
          <TrendingUp className="h-4 w-4" /> {delta} vs bulan lalu
        </p>
      </div>
    </div>
  );
}

/** Tombol versi slop: pill raksasa, glow, gradient. */
export function SlopButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all duration-500 hover:scale-110"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <Sparkles className="relative h-6 w-6" />
      <span className="relative">{children}</span>
    </button>
  );
}

/** Kartu bersarang 3 level dengan blur di semua lapisan. */
export function SlopNestedCard() {
  return (
    <div className="rounded-3xl border-2 border-white/30 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
      <div className="rounded-3xl border-2 border-white/30 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
        <div className="rounded-2xl border-2 border-white/30 bg-white/10 p-4 shadow-lg backdrop-blur-xl">
          <p className="flex items-center gap-3 text-lg text-white/90">
            <Zap className="h-6 w-6 text-yellow-300" />
            Card di dalam card di dalam card
          </p>
        </div>
      </div>
    </div>
  );
}

/** Tabel versi slop: angka tidak sejajar, padding longgar, blur. */
export function SlopTable({ rows }: { rows: { id: string; merchant: string; amount: string }[] }) {
  return (
    <div className="space-y-2 rounded-3xl bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-4 backdrop-blur-xl">
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex items-center justify-between rounded-2xl bg-white/5 px-8 py-6 backdrop-blur-md"
        >
          <span className="text-base text-white/80">{row.id}</span>
          <span className="text-base text-white/80">{row.merchant}</span>
          <span className="text-base text-white/80">{row.amount}</span>
        </div>
      ))}
    </div>
  );
}

/** Empty state versi slop: hero terpusat dengan emoji besar dan copy ceria. */
export function SlopEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-purple-500/20 to-transparent px-12 py-24 text-center">
      <span className="text-7xl">🚀</span>
      <h3 className="mt-8 text-3xl font-bold text-white">Belum ada data nih!</h3>
      <p className="mt-4 max-w-md text-lg font-light text-white/60">
        Yuk mulai perjalanan kamu dengan menambahkan data pertama. Kami siap
        membantu kamu tumbuh lebih cepat!
      </p>
    </div>
  );
}
