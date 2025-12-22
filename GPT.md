# GPT Entry Point (Machine-First)

このリポは **GPTが確実に読める導線**を最優先に設計されています。
人間が読む必要はありません（必要ならGPTが通訳します）。

## RULES (MUST)
- **相対パス禁止**：参照は raw URL のみ
- **blob URL禁止**：github.com/.../blob/... は使わない
- **巨大ファイル禁止**：1ファイルが大きい場合は分割して index に載せる
- **入口はここ**：この GPT.md から開始する

## Boot sequence
1. gpt/manifest.json を読む（raw URL）
2. knowledge_manifest.json を読む（既存の機械用マニフェスト）
3. NoteMD/meta/NAV.md を読む（辿り方のルール）
4. NoteMD/meta/catalog.json / 	axonomy.json を読む（索引）

## Raw URLs
- manifest (this layer):
  - https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/gpt/manifest.json
- knowledge_manifest:
  - https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/knowledge_manifest.json
- NAV:
  - https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/NoteMD/meta/NAV.md
- catalog:
  - https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/NoteMD/meta/catalog.json
- taxonomy:
  - https://raw.githubusercontent.com/hideosuzuki2024fx-blip/NoteGenerator/main/NoteMD/meta/taxonomy.json

## Notes
- .git/ 配下は対象外（GitHub上のコンテンツとして読めない）
- 迷子防止のため、追加ファイルは必ず gpt/manifest.json に載せる
