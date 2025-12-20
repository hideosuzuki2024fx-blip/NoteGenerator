# Thread State — NoteGenerator repo整理（2025-12-20）

## 安定性ルール（固定）
- 検証は raw の `/refs/heads/main/` を正とする（/main とズレる場合がある）
- 可能なら commit SHA の raw を使う（ブレ防止）

## 正の入口（source of truth）
- root README の `delegation_map` から以下に到達できること：
  - nav: NoteMD/meta/NAV.md
  - thread_state: NoteMD/meta/thread_state.md
  - entrypoints: NoteMD/meta/entrypoints.json
  - catalog: NoteMD/meta/catalog.json

## 正の一覧（articles）
- catalog.json を正（改行非依存）
- catalog.jsonl は deprecated（存在しても参照しない）

## 次の1手
- catalog.json の items に title / status / tags を必要な範囲で追記する
