"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Toggle tema. Menulis ke localStorage dan mengganti class .dark di <html>.
 * Mode gelap di-override lewat token, bukan class warna per elemen.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem("anti-slop-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextDark = stored ? stored === "dark" : prefersDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("anti-slop-theme", next ? "dark" : "light");
  };

  const Icon = isDark ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      aria-pressed={isDark}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-surface-border text-ink-secondary interactive-subtle hover:bg-surface-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {mounted ? <Icon className="h-3.5 w-3.5" /> : <span className="h-3.5 w-3.5" />}
    </button>
  );
}
