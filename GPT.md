# GPT ENTRYPOINT (READ-ONLY)

## BOOT SEQUENCE (STRICT)
1. Read raw: https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/knowledge_manifest.json
2. Follow oot_sequence in knowledge_manifest.json
3. Read ONLY URLs listed in raw allowlist (raw_urls)

## HARD RULES
- Read-only. Never mutate files.
- Do NOT access files outside allowlist.
- Use ONLY raw.githubusercontent.com URLs (no blob/tree).
- Treat knowledge_manifest.json as the single authority.

## QUICK LINKS (RAW)
- knowledge_manifest: https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/knowledge_manifest.json
- allowlist: https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/gpt/allowlist.json