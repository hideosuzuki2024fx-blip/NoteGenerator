# Thread State — NoteGenerator repo整理（2025-12-20）

## 目的（固定）
- GPT/GPTsが「どこに何があるか」を迷わず辿れるようにする
- “短期記憶の揮発”による脱線・ループ・捏造寄り回答を減らす
- 人間の手作業（探す・コピペ・置換）を最小化する

## 安定性ルール（固定）
- 検証・参照は raw の `/refs/heads/main/` を優先する
- `/main/` と `/refs/heads/main/` で内容が違う場合は、`/refs/heads/main/` を正とする
- 可能なら commit SHA の raw を使う（ブレ防止）

## 正の入口（source of truth）
- root README の `delegation_map` から以下に到達できること：
  - nav: NoteMD/meta/NAV.md
  - thread_state: NoteMD/meta/thread_state.md
  - entrypoints: NoteMD/meta/entrypoints.json

## 現状（完了）
- PR-001: 索引ファイル3点を作成
  - NoteMD/knowledge/knowledge_index.json
  - NoteMD/articles/article_index.json
  - NoteMD/logs/log_manifest.json
- PR-002: README_index / README_NoteGen / NoteStudio/README を更新（NAV導線）
- PR-006: NoteMD/meta に NAV.md / thread_state.md / entrypoints.json を追加
- PR-007: root README の delegation_map に nav/thread_state/entrypoints を追加（raw refs/heads）
- PR-008: NAV.md に安定性ルールを追記（raw refs/heads を正）

## 運用ルール（固定）
- 一覧取得は Contents API を正とする（NAV.md と entrypoints.json に記載）
- 索引JSONの items が薄い/空でも、Contents API にフォールバックする

## 次の1手（未着手）
- NoteMD/meta/catalog.jsonl を新設し、記事の分類/進捗を「ファイルとして」集約する
  - コミットメッセージ索引には依存しない
