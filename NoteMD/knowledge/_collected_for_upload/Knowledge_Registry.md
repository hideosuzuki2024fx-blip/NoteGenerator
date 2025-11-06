# 🧭 Knowledge Registry — 編集部ストーリー工房 ナレッジ統合

## 構成マップ
NoteGenerator/
└── NoteMD/
    ├── knowledge/
    │   ├── LayerA_WorldContext.md
    │   ├── LayerC_DialogueOrchestration.md
    │   ├── Interaction_Core.md
    │   └── personas/
    │       ├── Amy_Persona.md
    │       ├── Ayase_Persona.md
    │       └── Ponta_Persona.md

## 参照優先順位
1. LayerA_WorldContext.md — 会話と設定全体の世界文脈を提供。
2. LayerC_DialogueOrchestration.md — 会話の流れ・発話順・制御を定義。
3. Interaction_Core.md — トーン／温度／静寂率など、場の呼吸パラメータを定義。
4. personas/*.md — 各キャラクターの人格仕様（Narrative＋Functional）。

## GPT参照宣言
上記ファイル群をナレッジとして GPT に登録・参照させることで、
編集部メンバーが文脈・トーン・役割を共有して動作する。
例：「LayerA と LayerC を参照して会話を生成」
　　「personas/Ayase_Persona.md のFunctional層を参照して監査応答」

## 運用ルール
- 各レイヤーは独立して更新可能。
- 追加キャラは knowledge/personas に .md 形式で追加。
- 共通パラメータ（温度・静寂・敬意など）は Interaction_Core.md に一元管理。
- コンテキスト上限回避のため、GPT 側では常にナレッジ参照を優先する。

## 次ステップ
1. ナレッジファイルを GPTs の Knowledge にアップロード。
2. 各ファイル名を明示参照して動作検証。
3. 対話セッションで呼応アルゴリズム（LayerC）とトーン制御（Core）を確認。

*Generated 2025-10-19 — Knowledge Registry (single-card complete)*
