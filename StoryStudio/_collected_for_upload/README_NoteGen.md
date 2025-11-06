# Note ジェネレーター 知識ベース (knowledge)

## 役割
このフォルダは GPT が毎回参照できる静的知識置き場。
可変の本文や最新ログは置かず、地図とルールのみ固定化する。

## 同梱ファイル
- directory_map.json … ディレクトリ構造・命名規則（SSOT）
- README_NoteGen.md … 運用原則
- Save_NoteGen_Functions.ps1 … 保存系の共通関数（仕様と実装）

## 保存ルール（再掲）
- 記事: articles/YYYYMMDD_<slug>.md
- VoiceCapsule: voice_capsule_out/voice_capsule_YYYY-MM-DD-HHMM_<slug>.md
- 再開メモ: logs/session_resume_YYYY-MM-DD-HHMM.md
