# NoteMD フォルダ README

## 目的
記事制作の声（テイスト）と本文・ログを再現性高く管理する作業エリア。

## 構成
- templates/ … 差し込み用テンプレ（voice_capsule_template.md など）
- voice_capsule_config/ … 記事ごとの Voice Capsule JSON
- voice_capsule_out/ … テンプレ差し込み後の Voice Capsule Markdown
- articles/ … noteに貼る本文
- logs/ … セッション再開メモや進捗ログ

## 運用フロー（最短）
1. voice_capsule_config/<slug>.json を作る（テイストを保存）
2. templates/voice_capsule_template.md に差し込み → voice_capsule_out/ にMD生成
3. 本文は articles/、再開メモは logs/ へ

## よく使う表示コマンド（PowerShell）
    cmd /c "tree . /F /A"
    cmd /c "tree . /F /A" | findstr /V /R "\\\.git\\\|\\node_modules\\\|\\dist\\\|\\build\\"
    ls -Recurse | select FullName,Length,LastWriteTime | ft -AutoSize

## 命名規則（推奨）
- Voice Capsule 出力: voice_capsule_YYYY-MM-DD-HHMM_<slug>.md
- 記事本文: YYYYMMDD_<slug>.md もしくは <slug>_review_YYYY-MM-DD.md
- 再開メモ: session_resume_YYYY-MM-DD-HHMM.md

エンコーディング: UTF-8
