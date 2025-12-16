# NoteGenerator
> GPT reference document for the AI-managed multi-layer note generation system.

`md yaml
meta:
  gpt_ref: true
  version: 1.2
  last_updated: 2025-12-16
  depends_on:
    - ./README_index.md
    - ./directory_map.json
modules:
  - ./NoteStudio/ChatToNoteStudio.tsx
  - ./NoteStudio/NoteArticleStudio.tsx
  - ./NoteStudio/PaperNoteStudio_Integrated.tsx
  - ./NoteStudio/Save_NoteGen_Functions.psp
description:
  - This subsystem coordinates GPT-drived note generation across modules.
  - It provides structure, dependency rules, and synchronization logic.
  - Human-readable documentation is intentionally excluded.
