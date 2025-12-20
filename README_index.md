## How GPT should navigate
1. Read README_index.md (this file)
2. Read directory_map.json to locate the target area
3. If the request is about writing, read meta/catalog.jsonl first, then open only the selected article files
4. Never rely on commit messages for indexing
---

## 😐 Repository Index (Auto-Generated)
This file serves as the structured navigation map for the entire Repository.

Use [directory_map.json](./directory_map.json) for a machine-parsable version.

_Automatically synchronized by PONTA_


 ---

### 🔔 Module Sections


### 😑  NoteStudio

Integrated module group for GPT-drived note generation.

| File | Description |
----- |------------------|
 | [NoteStudio/README.md]((\/NoteStudio\/README.md)| Module-level overview for integrated note generation (ChatToNote, NoteArticle, PaperNote) |
  | [ChatToNoteStudio.tsx](\/NoteStudio\/ChatToNoteStudio.tsx)| Chat-based note generation component |
  | [NoteArticleStudio.tsx](./NoteStudio/NoteArticleStudio.tsx) | Long-form article and content synthesis module |
  | [PaperNoteStudio_Integrated.tsx](./NoteStudio/PaperNoteStudio_Integrated.tsx)| Unified academic-style hybrid module |
  | [Save_NoteGen_Functions.psl](./NoteStudio/Save_NoteGen_Functions.psl)| PowerShell utility for note generation backups |
