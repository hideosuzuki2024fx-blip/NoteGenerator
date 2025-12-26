## NoteGenerator リポジトリ修復計画

以下の修正タスクを順次実行・コミットし、Pull Request にまとめて提出します：

### 1. .venvと.logファイルの削除
- `git rm --cached -r NoteMD/logs/note_sampler/.venv`
- `git rm --cached NoteMD/logs/note_sampler/_browser.log`

### 2. .gitignore 追加
```
# Python 仮想環境
**/.venv/

# NoteSampler ログ
NoteMD/logs/**/*.log
```

### 3. GitHub Actions 修正案（relay.yml, sync_map.yml）
- `git push origin main` → `peter-evans/create-pull-request@v5` に変更
- 新しいブランチ `auto/fix-actions` に変更内容をコミットし、PR を自動作成

### 4. permissions:
```yaml
permissions:
  contents: write
  pull-requests: write
```

### 5. YAML インデント見直し
- `run: |` ブロックを2スペースごとにインデント整理

---

**影響範囲：**
- GPT ローディング安定化
- リポジトリ軽量化
- main ブランチ保護と意図しない変更防止

（作業内容詳細は `GitHub_Commit_Manual.md` に記載）