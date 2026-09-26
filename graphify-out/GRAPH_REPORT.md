# Graph Report - .  (2026-09-27)

## Corpus Check
- Large corpus: 137 files · ~581,956 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 131 nodes · 127 edges · 19 communities (11 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.5)
- Token cost: 43,702 input · 3,000 output

## Community Hubs (Navigation)
- TypeScript Compiler Config
- Anti-Slop Hard Bans and Tokens
- Dashboard Page and Logs UI
- Tailwind CSS and PostCSS Tooling
- React and Next Core Dependencies
- Design Engine and OKLCH Architecture
- Package Manifest and Scripts
- Next.js Environment Declarations
- Interaction States and Accessibility
- Layout Presets and Glass Tokens
- Root Layout and Metadata
- Spatial Scale and Padding
- State Edge Cases and CLS
- Spec Workflow and Triad
- Database and Query Optimization
- Next Config Options
- Layered Micro-Shadow Tokens
- Form Label Standards

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Anti-Slop 20 Hard Bans` - 8 edges
3. `Anti-Slop UI Engine` - 7 edges
4. `cn()` - 6 edges
5. `scripts` - 5 edges
6. `include` - 5 edges
7. `lib` - 4 edges
8. `Badge()` - 3 edges
9. `Card()` - 3 edges
10. `OKLCH Color Architecture` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Linear Design Archetype` --COMPATIBLE_WITH--> `Anti-Slop UI Engine`  [INFERRED]
  references/inspiration.md → SKILL.md
- `Anti-Slop UI Engine` --USES--> `Tailwind CSS v4`  [EXTRACTED]
  SKILL.md → rules/05-performance-and-stack.md
- `Anti-Slop 20 Hard Bans` --ENFORCES--> `Hairline Border Token`  [EXTRACTED]
  SKILL.md → rules/01-ui-design-tokens.md
- `Anti-Slop 20 Hard Bans` --ENFORCES--> `Proportional Border-Radius`  [EXTRACTED]
  SKILL.md → rules/01-ui-design-tokens.md
- `Anti-Slop 20 Hard Bans` --ENFORCES--> `Mandatory Search Debounce`  [EXTRACTED]
  SKILL.md → rules/05-performance-and-stack.md

## Import Cycles
- None detected.

## Communities (19 total, 8 thin omitted)

### Community 0 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 1 - "Anti-Slop Hard Bans and Tokens"
Cohesion: 0.11
Nodes (18): Anti-Slop 20 Hard Bans, Hairline Border Token, Lucide Icons, Mandatory Search Debounce, Next.js 15 App Router, No Em-Dash / En-Dash Rule, Ponytail Comment Convention, Proportional Border-Radius (+10 more)

### Community 2 - "Dashboard Page and Logs UI"
Cohesion: 0.19
Nodes (11): LogEntry, LOGS, MetricData, METRICS, Badge(), BadgeProps, Button, ButtonProps (+3 more)

### Community 3 - "Tailwind CSS and PostCSS Tooling"
Cohesion: 0.13
Nodes (15): postcss, tailwindcss, @tailwindcss/postcss, devDependencies, postcss, tailwindcss, @tailwindcss/postcss, @types/node (+7 more)

### Community 4 - "React and Next Core Dependencies"
Cohesion: 0.15
Nodes (13): clsx, lucide-react, next, react, react-dom, tailwind-merge, dependencies, clsx (+5 more)

### Community 5 - "Design Engine and OKLCH Architecture"
Cohesion: 0.25
Nodes (9): Anti-Slop UI Engine, Brief Inference and Design Read, Linear Design Archetype, OKLCH Color Architecture, 90/10 Palette Ratio Rule, Pre-Flight Audit Checklist, Tailwind CSS v4, Three Parameter Dials (+1 more)

### Community 6 - "Package Manifest and Scripts"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 7 - "Next.js Environment Declarations"
Cohesion: 0.25
Nodes (7): next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude, include

### Community 8 - "Interaction States and Accessibility"
Cohesion: 0.50
Nodes (4): Five Interactive States Requirement, Minimum Touch Target (44x44px), Restrained Motion and Snappy Easing, Prefers Reduced Motion Fallback

### Community 9 - "Layout Presets and Glass Tokens"
Cohesion: 0.67
Nodes (3): Bento Grid Layout, Restrained Translucent Glass Token, Visual Direction Presets

## Knowledge Gaps
- **78 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Tailwind CSS and PostCSS Tooling` to `Package Manifest and Scripts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `dependencies` connect `React and Next Core Dependencies` to `Package Manifest and Scripts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `TypeScript Compiler Config` to `Next.js Environment Declarations`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Config` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Anti-Slop Hard Bans and Tokens` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Tailwind CSS and PostCSS Tooling` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._