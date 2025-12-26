## GitHub Actions 修正概要

### 問題点
- `.github/workflows/relay.yml` および `sync_map.yml` で `git push origin main` を直接実行しており、main ブランチへの直接コミットが発生。
- YAML ファイルのインデントやマルチラインスクリプトの構文が不安定。

### 修正内容
- `git push origin main` を削除。
- `peter-evans/create-pull-request@v5` を用いて、新しいブランチに変更をコミットし、PR を自動作成するように変更。
- `permissions` に `contents: write` を明示し、`GITHUB_TOKEN` による PR 作成を許可。
- `run:` セクションのインデントを厳密に 2 スペースで統一。

### ファイル変更例（relay.yml）
```yaml
auto-create-pr:
  runs-on: ubuntu-latest
  permissions:
    contents: write
  steps:
    - uses: actions/checkout@v3
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: |
        echo "run some generator"
    - name: Create Pull Request
      uses: peter-evans/create-pull-request@v5
      with:
        branch: auto/create-relay-seed
        title: "auto-create: minimal sync_map.yml seed"
        commit-message: "feat: add minimal seed"
```

### 注意点
- `auto-commit` アクションと併用することで、PR 内で commit/push を繰り返せるようにする。
- PR フローによってリポジトリの整合性とレビュー性を確保。

---

今後、これをベースに `.github/workflows/relay.yml` および `sync_map.yml` の修正版をコミットします。