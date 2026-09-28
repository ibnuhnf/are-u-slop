/**
 * Ambil screenshot nyata dari server produksi untuk README.
 *
 * Dijalankan dari root repo, dengan server produksi sudah hidup:
 *   cd templates/nextjs-boilerplate && npm run build && npx next start -p 3111
 *   node templates/nextjs-boilerplate/scripts/capture-screenshots.mjs http://localhost:3111
 *
 * Membutuhkan playwright (devDependency opsional, install dengan --no-save).
 */
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Root repo: naik dari scripts/ -> nextjs-boilerplate/ -> templates/ -> root. */
const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");

const BASE = process.argv[2] ?? "http://localhost:3111";
const OUT = path.join(REPO_ROOT, "assets");

const SHOTS = [
  { name: "dashboard-dark", route: "/", theme: "dark", width: 1440, height: 900 },
  { name: "dashboard-light", route: "/", theme: "light", width: 1440, height: 900 },
  { name: "compare", route: "/compare", theme: "dark", width: 1440, height: 1800 },
  { name: "compare-light", route: "/compare", theme: "light", width: 1440, height: 1800 },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let failures = 0;

for (const shot of SHOTS) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 2,
  });

  await context.addInitScript((theme) => {
    window.localStorage.setItem("anti-slop-theme", theme);
  }, shot.theme);

  const page = await context.newPage();
  const response = await page.goto(`${BASE}${shot.route}`, {
    waitUntil: "networkidle",
  });

  if (!response || !response.ok()) {
    console.error(`[FAIL] ${shot.route} -> HTTP ${response?.status()}`);
    failures += 1;
    await context.close();
    continue;
  }

  // Pastikan class .dark sudah diterapkan sebelum screenshot.
  await page.waitForFunction(
    (theme) =>
      theme === "dark"
        ? document.documentElement.classList.contains("dark")
        : !document.documentElement.classList.contains("dark"),
    shot.theme,
    { timeout: 5000 }
  );

  await page.waitForTimeout(400);

  await page.screenshot({ path: path.join(OUT, `${shot.name}.png`) });
  console.log(`[OK] assets/${shot.name}.png <- ${shot.route} (${shot.theme})`);

  await context.close();
}

await browser.close();

if (failures > 0) {
  console.error(`[FAILED] ${failures} screenshot gagal.`);
  process.exit(1);
}
console.log(`[SUCCESS] ${SHOTS.length} screenshot tersimpan di assets/.`);
