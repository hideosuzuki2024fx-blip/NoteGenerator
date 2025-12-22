# GPT ENTRYPOINT (READ-ONLY KNOWLEDGE BASE)

This repository is a **read-only knowledge base for GPT**.
Human readability is NOT a goal.

## BOOT SEQUENCE (STRICT)
1. Load knowledge_manifest.json (raw)
2. Follow boot_sequence defined there
3. Read ONLY files listed in raw.allowlist

## RAW ENTRYPOINTS
- knowledge_manifest:
  https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/knowledge_manifest.json

## HARD RULES
- Read-only. Never mutate files.
- Do NOT access files outside allowlist.
- Do NOT use github.com/blob or tree URLs.
- Do NOT assume .git or Git internals exist.
