# Accessibility and Interaction Completeness (Anti-Slop Standard)
> Sintesis: Apple HIG, Base UI / Radix, WAI-ARIA 1.2, PyWinAssistant Symbolic Standards, Vibe Playbook

---

## 1. Complete 5-State Interactive Requirement
Setiap elemen interaktif (button, input field, switch, row table, card link) WAJIB memiliki implementasi eksplisit untuk 5 state:

1. Default: Kontras warna label >= 4.5:1 (AA) untuk muted dan >= 7:1 (AAA) untuk primary body text.
2. Hover: Background shift 4% to 8% (lebih terang pada dark mode, lebih gelap pada light mode). Dilarang layout-shifting.
3. Active (Pressed): transform scale(0.97) sampai scale(0.99).
4. Focus-Visible: Border 2px atau ring outline dengan offset 2px. DILARANG KERAS menghapus outline: none tanpa pengganti :focus-visible.
5. Disabled: Opacity 0.4 to 0.5, pointer-events: none atau cursor: not-allowed, aria-disabled="true".

---

## 2. Touch Target and Accessibility Standards
- Minimum Touch Target: 44px x 44px area interaktif pada mobile maupun desktop (sesuai Apple HIG dan WCAG 2.5.5).
- Persistent Form Labels: Dilarang menggunakan placeholder input sebagai pengganti `<label>`. Placeholder bisa hilang saat diketik, merusak konteks pengguna.
- Accessible Names: Setiap icon button (seperti tombol close, search, copy) WAJIB memiliki aria-label atau `<span className="sr-only">`.

---

## 3. Motion, Staggered Reveals and Animation Restraint
- Durasi Transisi: 100ms to 180ms untuk micro-interaction (hover/active), 150ms to 250ms untuk komponen makro (drawer, modal, dropdown).
- Staggered Page Reveals: Gunakan alur pemuatan bertingkat berbasis CSS murni (staggered fade-up) untuk konten hero/grid.
- Easing Curve:
  - Enter: cubic-bezier(0.16, 1, 0.3, 1) (snappy spring decelerate).
  - Exit: cubic-bezier(0.4, 0, 1, 1) (accelerate out).
  - Dilarang ease-in-out lambat dan membal tanpa alasan.
- Wajib Reduced Motion:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 4. Edge Cases: Zero Unhandled States
Komponen data dan asynchronous WAJIB menangani:
1. Loading State: Skeleton loading dengan ukuran statis yang stabil (mencegah CLS / Cumulative Layout Shift).
2. Empty State: Icon konteks, pesan deskriptif 1 kalimat, dan 1 CTA pemulihan.
3. Error State: Pesan error spesifik (bukan generic "Something went wrong") dan tombol retry.
