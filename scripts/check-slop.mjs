import fs from "node:fs";
import path from "node:path";

const BANNED_PATTERNS = [
  {
    name: "AI Purple / Indigo Gradient Cliché",
    regex: /(bg-gradient-to-[a-z]+.*from-(purple|indigo)-[0-9]+|#[89a-fA-F]{2}5[cC]F6|#[6789a-fA-F]{2}66F1)/g,
    reason: "Purple/indigo gradients are AI slop. Use deliberate single-hue OKLCH accent tokens."
  },
  {
    name: "Oversized Border Radius on Functional Elements (>=16px)",
    regex: /\b(rounded-2xl|rounded-3xl|rounded-\[1[6-9]px\]|rounded-\[[2-9][0-9]px\])\b/g,
    reason: "Border radius >=16px gives a toy/mockup look. Restrict to 4-8px (inputs/buttons) or 8-12px (cards)."
  },
  {
    name: "Deep Drop Shadow Slop (blur >16px)",
    regex: /\b(shadow-xl|shadow-2xl|shadow-\[0_([2-9][0-9]|[1-9][0-9]{2})px)\b/g,
    reason: "Heavy blurry shadows are skeuomorphic slop. Use layered micro-shadows (blur <= 16px)."
  },
  {
    name: "Inline Hex / RGB Color Hardcoding",
    regex: /className=["'][^"']*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))[^"']*["']/g,
    reason: "Hardcoded colors bypass design tokens. Use OKLCH CSS variables from globals.css."
  },
  {
    name: "Em-dash / En-dash Design Slop",
    regex: /([—–])/g,
    reason: "Em-dashes and en-dashes as design flourishes are AI clichés. Use hyphens (-), periods, or line breaks."
  },
  {
    name: "Generic Backdrop Blur Indiscriminate Use",
    regex: /\b(backdrop-blur-md|backdrop-blur-lg|backdrop-blur-xl)\b/g,
    reason: "Glassmorphism should only be used on specific overlays with strict reduced-transparency fallbacks."
  },
  {
    name: "Viewport Layout Jump (h-screen instead of dvh)",
    regex: /\bh-screen\b/g,
    reason: "Use min-h-[100dvh] instead of h-screen to avoid mobile browser address bar layout jumps."
  },
  {
    name: "Raw CSS Variable Used As Tailwind Utility",
    regex: /\b(bg|text|border|ring|fill|stroke|divide|placeholder|ring-offset)-\[var\(--color-/g,
    reason: "@theme already generates utilities from the canonical tokens. Write bg-surface / text-ink-muted / border-surface-border instead of bg-[var(--color-surface)]."
  }
];

/* templates/ adalah implementasi kanonik, jadi ikut diaudit. */
const SCAN_DIRS = ["src", "components", "app", "templates"];
const EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".css"];

let hasErrors = false;
let totalFilesScanned = 0;

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next") {
        scanDirectory(fullPath);
      }
    } else if (EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
      totalFilesScanned++;
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    for (const rule of BANNED_PATTERNS) {
      if (rule.regex.test(line)) {
        console.error(`\x1b[31m[SLOP DETECTED]\x1b[0m ${path.relative(process.cwd(), filePath)}:${index + 1}`);
        console.error(`  \x1b[33mRule:\x1b[0m ${rule.name}`);
        console.error(`  \x1b[90mLine:\x1b[0m ${line.trim()}`);
        console.error(`  \x1b[36mFix:\x1b[0m  ${rule.reason}\n`);
        hasErrors = true;
      }
    }
  });
}

console.log("\x1b[34m--- Scanning codebase for Anti-Slop Violations ---\x1b[0m");
for (const dir of SCAN_DIRS) {
  scanDirectory(path.join(process.cwd(), dir));
}

if (hasErrors) {
  console.error(`\x1b[31mFAILED: Anti-Slop violations found. Fix the issues above before shipping.\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32mPASSED: Clean craftsmanship! Scanned ${totalFilesScanned} files with 0 slop violations.\x1b[0m`);
  process.exit(0);
}
