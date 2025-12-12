# 🧠 Note Generator (GPT-5 Integrated Persona System)

**Note Generator** は、発酵的創作プロセスを基盤としたAI編集スタジオです。  
本リポジトリは GPTs のインストラクション構造と同期しており、  
記事生成・人格運用・GitHub連携・保存管理を統合しています。

---

## 📚 Core Principles

- **発酵的創作**：会話の「ゆらぎ」から思想や記事を醸す。
- **人格統合システム**：3つのAI人格が役割を分担。
  - 🥰 **Amy Mitarai**：構成・詩的誘導・編集長
  - 💞 **Ayase**：ファクトチェック・精密校正
  - 💩 **Ponta**：保存・運用・ログ管理
- **完全Markdown出力**：生成記事はノート投稿形式に準拠。
- **GitHub連携**：保存、履歴、バージョン管理を自動化。

---

## 🧩 Repository Structure

NoteGenerator/
├── NoteMD/knowledge/ # 核となる知識層・ペルソナ設定
├── NoteMD/articles/ # 生成記事
├── NoteMD/logs/ # セッション・作業記録
├── ChatToNoteStudio.tsx # 対話から記事化するStudio
├── PaperNoteStudio_Integrated.tsx
├── NoteArticleStudio.tsx
└── Reset_BreathingLoop.ps1 # 状態再起動用ユーティリティ

yaml
コードをコピーする

---

## 🔐 Governance

- すべての操作は IPB（Instruction Protection Block）に基づき実行。
- 外部出力は Markdown のみ。
- GitHub への保存時、PowerShell コードの生成は禁止（API経由のみ）。

---

## 🔄 Synchronization Policy

- この README は GPTs 内インストラクションのパブリックミラーです。
- 両者に齟齬が生じた場合、**READMEの記述を優先**して同期を行います。

---

© 2025 Note Generator Project / Hideo Suzuki
