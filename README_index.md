## How GPT should navigate
1. Read `README.md` (canonical)
2. Use this file (`README_index.md`) as a human/GPT navigation hub
3. Use `directory_map.json` for machine-parsable navigation
4. Open only the files referenced by index/manifest files
5. Do not rely on commit messages for indexing

---

## 😐 Repository Index (Auto-Generated)
This file serves as the structured navigation map for the entire repository.

Use [directory_map.json](./directory_map.json) for a machine-parsable version.

_Automatically synchronized by PONTA_

---

## Module Sections

### NoteStudio (documentation hub)
> Note: `NoteStudio/` currently contains documentation (README) only.  
> Studio components live at repository root.

| File | Description |
| --- | --- |
| [NoteStudio/README.md](./NoteStudio/README.md) | Module-level overview and navigation |

### Studio components (root)
| File | Description |
| --- | --- |
| [ChatToNoteStudio.tsx](./ChatToNoteStudio.tsx) | Chat-based note generation component |
| [NoteArticleStudio.tsx](./NoteArticleStudio.tsx) | Long-form article and content synthesis module |
| [PaperNoteStudio_Integrated.tsx](./PaperNoteStudio_Integrated.tsx) | Unified academic-style hybrid module |

### Utilities (root)
| File | Description |
| --- | --- |
| [Save_NoteGen_Functions.ps1](./Save_NoteGen_Functions.ps1) | PowerShell utility for saving notes/articles |
| [Start_NoteGen_Server.ps1](./Start_NoteGen_Server.ps1) | Start server |
| [Update_NoteGen_Paths.ps1](./Update_NoteGen_Paths.ps1) | Update paths |
