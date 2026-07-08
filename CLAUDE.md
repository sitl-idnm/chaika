# Верёвочный парк «Чайка» — Project Anchor

> **STOP. Read PROJECT_STATE.md immediately before doing anything.**

PROJECT_STATE.md is the single source of truth for this project. It contains:

- **Source of truth**: this project was built from a design handoff bundle
  (HTML/CSS reference), NOT a live Figma file. Original reference lives in
  `Чайка Design System.zip` (`design_handoff_chaika_landing/reference/`).
- **Design tokens**: all colors, typography scales, spacing, radii
- **Component registry**: every component with implementation status, file path
- **Page structure**: sections in order
- **Implementation decisions** and known edge cases

## Rules for this project

1. Never write or edit code without reading PROJECT_STATE.md first
2. Never assume any design value — verify against the handoff reference / tokens
   recorded in PROJECT_STATE.md
3. After completing/altering a component, update its status in PROJECT_STATE.md
4. Values are exact (px) from the handoff — never round to an 8px grid
5. If a value is ambiguous (e.g. price-table numbers flagged in the README),
   record it under "Implementation Notes"
