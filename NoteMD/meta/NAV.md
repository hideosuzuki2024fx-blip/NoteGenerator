## Stability rule (important)
- Prefer raw URLs with `/refs/heads/main/` when verifying content.
- If results differ between `/main/` and `/refs/heads/main/`, treat `/refs/heads/main/` as the source of truth.

# NoteMD Navigation (Human/GPT)

## Rule (do this first)
- Use GitHub Contents API to enumerate files.
- Open only the files you need via raw URLs.
- Do NOT rely on commit messages for indexing.

## Contents API (source of truth for listing)
Knowledge:
https://api.github.com/repos/hideosuzuki2024fx-blip/NoteGenerator/contents/NoteMD/knowledge?ref=main

Articles:
https://api.github.com/repos/hideosuzuki2024fx-blip/NoteGenerator/contents/NoteMD/articles?ref=main

Logs:
https://api.github.com/repos/hideosuzuki2024fx-blip/NoteGenerator/contents/NoteMD/logs?ref=main

## Machine index files (may be empty)
- NoteMD/knowledge/knowledge_index.json
- NoteMD/articles/article_index.json
- NoteMD/logs/log_manifest.json

## Recommended entrypoints
- README_index.md (repo navigation)
- README_NoteGen.md (GPT reference)
## Canonical catalog (newline-independent)
- catalog (canonical): https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/refs/heads/main/NoteMD/meta/catalog.json
- note: if catalog.jsonl exists, treat it as deprecated/non-canonical
