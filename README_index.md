## How GPT should navigate

1. Read `README.md` (canonical)
2. Use this file (`README_index.md`) as a navigation hub
3. If machine index `items` are empty, use Contents API to enumerate:
   - `NoteMD/meta/NAV.md`
4. Open only the files referenced by index/manifest or listing
5. Do not rely on commit messages for indexing

---

## Repository Index

### Human/GPT navigation
- `NoteMD/meta/NAV.md`

### Machine indexes
- `NoteMD/knowledge/knowledge_index.json`
- `NoteMD/articles/article_index.json`
- `NoteMD/logs/log_manifest.json`

### Quick links
- `NoteStudio/README.md`
- `README_NoteGen.md`
- `NoteMD/README.md`
