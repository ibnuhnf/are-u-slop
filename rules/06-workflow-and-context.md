# Context Engineering and Vibe Workflow (Anti-Slop Standard)
> Sintesis: Vibe Coding Playbook, Spec-Driven Workflow, Jackhammer-Chisel-Inspect

---

## 1. Spec Before Code (Human-Guided Control)
Alokasikan 70% energi untuk spesifikasi dan verifikasi, 30% untuk eksekusi kode.
Sebelum meminta AI generate fitur, buat dokumen spesifikasi singkat (15-30 baris):
1. Intent: Problem inti dan ekspektasi fungsional.
2. Constraints: Tech stack, batasan akses data, rule security.
3. Acceptance Criteria: Kondisi lulus uji yang jelas dan terukur.

---

## 2. 4-Stage Execution Cycle
1. Spec: Tentukan kontrak dan batasan eksplisit.
2. Plan Mode: AI membaca codebase secara read-only, menganalisis edge case, dan memetakan struktur file sebelum menulis kode.
3. Execute (Atomic Changes): Terapkan perubahan langkah demi langkah dengan review diff di setiap file.
4. Verify: Uji via automated test, subagent checker, atau browser inspection.

---

## 3. Triad: Jackhammer, Chisel, and Inspection
- Jackhammer (Fast AI Draft): Buat implementasi dasar awal yang berfungsi (make it work).
- Chisel (Anti-Slop Manual Refactor): Pangkas abstraksi berlebihan, hapus fungsi forwarding satu baris, pastikan readability dan kemudahan pemeliharaan (make it right).
- Inspection (CI/CD Automated Gate): Validasi via linter (eslint-plugin-slop), static security scan (TruffleHog), dan unit testing sebelum merge.
