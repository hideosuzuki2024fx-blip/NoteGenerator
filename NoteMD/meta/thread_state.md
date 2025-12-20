# Thread State — NoteGenerator repo整理（2025-12-20）

## 目的
- GPT/GPTsが「どこに何があるか」を迷わず辿れるようにする
- “短期記憶の揮発”による脱線・ループ・捏造寄り回答を減らす
- 人間の手作業（探す・コピペ・置換）を最小化する

## 現在の前提（このファイルが最優先の作業ログ）
- 変更は main に直接コミットで進めている（Pull requests は使っていない）
- 検証は Raw / Contents API を正とする

## 完了（扱い）
- PR-001: 索引ファイル3点を main に追加済み
  - NoteMD/knowledge/knowledge_index.json
  - NoteMD/articles/article_index.json
  - NoteMD/logs/log_manifest.json
- PR-002: README_index / README_NoteGen / NoteStudio/README を更新済み
- PR-003: 上記索引の存在確認
- PR-004: NoteMD配下READMEの誤記修正（ただし残件あり：PR-004bでまとめて再対応）

## 残件（後でまとめてやる）
- PR-004b: NoteMD/*/README.md の誤記を再整理
  - UF-8 → UTF-8
  - parent_readme の fx1-blip → fx-blip
  - NoteMMD → NoteMD

## 次にやること（PR-005のDoD）
- NoteMD/meta/thread_state.md を追加
- NoteMD/meta/entrypoints.json を追加
