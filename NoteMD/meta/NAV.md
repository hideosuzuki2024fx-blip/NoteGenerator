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
