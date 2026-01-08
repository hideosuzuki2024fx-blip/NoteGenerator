## Stability rule (important)
- Prefer raw URLs with `/main/` when verifying content.
- If results differ between `/main/` and `/refs/heads/main/`, treat `/main/` as the source of truth.

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

## Canonical indexes
- catalog (canonical): https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/system/catalog.json
- taxonomy (vocab): https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/system/taxonomy.json
- note: catalog.jsonl は deprecated（参照しない）

## Machine index files (may be empty)
- system/knowledge_index.json
- system/article_index.json
- system/log_manifest.json

## Recommended entrypoints
- README.md (canonical)
- README_index.md (repo navigation)
- README_NoteGen.md (GPT reference)



