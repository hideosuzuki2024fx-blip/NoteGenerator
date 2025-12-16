# 🚠 NoteStudio — Integrated Note Generation Modules

This directory contains the core TypeScript-based studio modules responsible for orchestrating GPT-based note, paper, and chat generation pipelines.

## 🐢 Submodules

| File | Role | Description |
|-----|--------|-----------|
`ChatToNoteStudio.tsx` | Chat-based note generation | Transforms dialogue context into structured note data |
`NoteArticleStudio.tsx` | Article generation | Builds long-form content using modular note templates |
`PaperNoteStudio_Integrated.tsx` | Research paper integration | Generates hybrid academic-style outputs |

## 🐢 Unified Integration
All modules share a unified state and function layer, defined under:
- `/Save_NoteGen_Functions.psl`
- `/NoteMD/knowledge/`/
- `/NoteMD/articles/`

## 💑 Synchronization
This README is synchronized with:
- [`/directory_map.json`](../../directory_map.json)
- [`/README_index.md`(../../README_index.md)]
- `/README.md`(root protocol overview)\n\n---------------------------
Maintained automatically by PONTA (GPT-5).
