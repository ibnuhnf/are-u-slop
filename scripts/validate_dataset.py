#!/usr/bin/env python3
"""
Anti-Slop Dataset and Token Validator (Python CLI)
Memvalidasi raw-analysis.json (111 sampel IR) dan konsistensi token OKLCH.
Zero-dependency, kompatibel Python 3.10+.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW_ANALYSIS = ROOT / "extraction" / "raw-analysis.json"
GLOBALS_CSS = ROOT / "templates" / "nextjs-boilerplate" / "src" / "app" / "globals.css"
SKILL_MD = ROOT / "SKILL.md"

SLOP_PATTERNS = [
    (re.compile(r"#[89a-fA-F]{2}5[cC]F6|#[6789a-fA-F]{2}66F1"), "AI Purple/Indigo Gradient Hex"),
    (re.compile(r"\brounded-(2xl|3xl)\b"), "Oversized Border Radius (>=16px)"),
    (re.compile(r"\bshadow-(xl|2xl)\b"), "Deep Blurry Shadow"),
    (re.compile(r"\bh-screen\b"), "Viewport Layout Jump (use min-h-[100dvh])"),
]

"""
Pengecualian yang disengaja, selaras dengan IGNORE_FILES di scripts/check-slop.mjs.
slop-reference.tsx adalah materi pembanding visual untuk halaman /compare: isinya
memang melanggar semua aturan supaya perbedaannya bisa dilihat berdampingan.
File ini tidak pernah dipakai di jalur produksi.
"""
IGNORE_FILES = {"slop-reference.tsx"}


def validate_dataset() -> int:
    """Validasi integritas 111 sampel IR di extraction/raw-analysis.json."""
    if not RAW_ANALYSIS.exists():
        print(f"[FAIL] Dataset tidak ditemukan: {RAW_ANALYSIS}", file=sys.stderr)
        return 1

    try:
        data = json.loads(RAW_ANALYSIS.read_text(encoding="utf-8"))
    except Exception as err:
        print(f"[FAIL] JSON rusak di {RAW_ANALYSIS}: {err}", file=sys.stderr)
        return 1

    if not isinstance(data, list):
        print(f"[FAIL] Root JSON harus list, dapat {type(data)}", file=sys.stderr)
        return 1

    total = len(data)
    print(f"[*] Dataset: {total} sampel terdaftar di extraction/raw-analysis.json")

    required_keys = {"filename", "category", "theme", "dimensions", "patterns", "anti_slop_signals", "quality_score"}
    valid_count = 0
    for idx, entry in enumerate(data):
        missing = required_keys - set(entry.keys())
        if missing:
            print(f"  [WARN] Sampel #{idx} ({entry.get('filename', 'unknown')}): hilang {missing}")
            continue
        valid_count += 1

    print(f"[OK] {valid_count}/{total} sampel valid secara struktural.")
    return 0


def validate_tokens() -> int:
    """Validasi bahwa token di globals.css punya nilai OKLCH valid."""
    if not GLOBALS_CSS.exists():
        print(f"[FAIL] Token kanonik tidak ditemukan: {GLOBALS_CSS}", file=sys.stderr)
        return 1

    css = GLOBALS_CSS.read_text(encoding="utf-8")
    oklch_tokens = re.findall(r"(--color-[a-z0-9-]+):\s*(oklch\([^)]+\)|var\([^)]+\))", css)
    if not oklch_tokens:
        print("[FAIL] Tidak ada token OKLCH yang terdeteksi di globals.css", file=sys.stderr)
        return 1

    print(f"[*] Token Kanonik: {len(oklch_tokens)} token OKLCH/var terdaftar di globals.css")
    # Cek tidak ada inline hex di globals.css
    hex_hits = re.findall(r"#[0-9a-fA-F]{3,8}", css)
    if hex_hits:
        print(f"[WARN] Ditemukan inline hex di globals.css: {hex_hits}")
        return 1

    print("[OK] globals.css 100% bebas hardcoded hex, murni OKLCH.")
    return 0


def scan_templates() -> int:
    """Pindai kode sumber di templates/ terhadap aturan anti-slop dasar."""
    tpl_src = ROOT / "templates" / "nextjs-boilerplate" / "src"
    if not tpl_src.exists():
        return 0

    violations = 0
    skipped = []
    for file in tpl_src.rglob("*"):
        if file.suffix not in {".tsx", ".ts", ".css"}:
            continue
        if file.name in IGNORE_FILES:
            skipped.append(file.name)
            continue
        content = file.read_text(encoding="utf-8", errors="ignore")
        for line_no, line in enumerate(content.splitlines(), start=1):
            for pattern, name in SLOP_PATTERNS:
                if pattern.search(line):
                    print(f"[SLOP] {file.relative_to(ROOT)}:{line_no} -> {name}")
                    violations += 1

    if skipped:
        print(f"[*] Dikecualikan sesuai desain: {', '.join(sorted(skipped))}")

    if violations == 0:
        print("[OK] Kode templates/ lolos uji audit Python (0 pelanggaran).")
        return 0
    return 1


def main() -> int:
    print("=== Anti-Slop Python Engine Validator ===")
    status = 0
    status |= validate_dataset()
    status |= validate_tokens()
    status |= scan_templates()
    if status == 0:
        print("[SUCCESS] Seluruh audit Python lulus dengan bersih.")
    else:
        print("[FAILED] Ada audit yang gagal.", file=sys.stderr)
    return status


if __name__ == "__main__":
    sys.exit(main())
