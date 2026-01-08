# GPTsとGitHubを連携して「Noteジェネレーター」を作る手順（第1回）

## はじめに
この記事は、連載「Noteジェネレーターの作り方」シリーズの第一回です。
ChatGPTのGPTs機能とGitHub APIを連携させて、自分専用のNote記事生成AIを構築する方法を、実践的に紹介します。

目的は、AIが単に文章を“生成”するのではなく、思考や構想の“発酵過程”をGitHubに記録・保存することです。

---

## 🧩 Step 1：GPTsを作成する

1. ChatGPTのメニューから「**Explore GPTs**」を開く  
2. 「**Create a GPT**」を選択  
3. 名前を入力：「Noteジェネレーター」  
4. **Instructions** に以下を設定：

   ```
   あなたはNote記事を生成する編集AIです。
   ユーザーが指定したトピック、トーン、読者層に合わせてMarkdown形式で記事を出力します。
   生成後、GitHubのNoteGeneratorリポジトリに保存します。
   ```

5. さらに人格設定（任意）：
   - 🥰エイミー（構成・表現）
   - 💞綾瀬（校正・ファクトチェック）
   - 💩ポンタ（保存・GitHub処理）

---

## 🪄 Step 2：GitHub連携を設定する

GPT Builderの「**Actions**」タブで、以下のようにGitHub APIを登録します。

| API名 | エンドポイント | 用途 |
|------|------------------|------|
| `getRepoInfo` | `https://api.github.com/repos/{owner}/{repo}` | リポジトリ情報を取得 |
| `getRepositoryContents` | `https://api.github.com/repos/{owner}/{repo}/contents/{path}` | 記事リスト取得 |
| `createOrUpdateFile` | `https://api.github.com/repos/{owner}/{repo}/contents/{path}` | 新規記事を保存 |

例：
```json
{
  "owner": "hideosuzuki2024fx-blip",
  "repo": "NoteGenerator"
}
```

---

## 💾 Step 3：ローカル環境での安全保存（PowerShell）

ローカルでも記事を保存・同期したい場合は、次のPowerShellスクリプトを使用します。

```powershell
if ($PWD.Path -ne (Resolve-Path $env:NOTEGEN_BASE).Path) {
    Write-Host "⚠️ 現在のディレクトリがNOTEGEN_BASEと一致しません！中止します。" -ForegroundColor Red
    exit
}

# Markdown記事を保存
$articlePath = "NoteMD/articles/" + (Get-Date -Format "yyyyMMddHHmm") + "_note.md"
$content = Get-Content -Path "drafts/current_note.md" -Raw
Set-Content -Path $articlePath -Value $content -Encoding UTF8

git add $articlePath
git commit -m "📝 note記事自動保存"
git push
```

※ `$env:NOTEGEN_BASE` はプロジェクトルート（例：`E:\CGPT_Project\NoteGenerator`）を指すように設定。

---

## 🧠 Step 4：UI統合（React × TypeScript）

`PaperNoteStudio_Integrated.tsx` をベースに、  
会話→記事生成→タグ提案→GitHub保存までを1画面で完結させます。

主なコンポーネント：
- **ChatToNoteStudio.tsx**：GPTとの会話からテーマを抽出  
- **NoteArticleStudio.tsx**：記事編集・タグ付け  
- **PaperNoteStudio_Integrated.tsx**：両者を統合したメインUI  

統合時のポイント：
```tsx
export default function PaperNoteStudio_Integrated() {
  // 発酵的会話と記事編集を融合
}
```

---

## 🧭 Step 5：コミットログを“発酵記録”として読む

GitHubのコミットログを眺めると、  
記事がどう発想され、どう熟成していったかが一目でわかります。  

> 書くことは、生成ではなく、**発酵**である。  
> その記録がGitHubという酒蔵に眠るのです。

---

## 🏁 まとめ
| 工程 | 内容 |
|------|------|
| Step 1 | GPTsを作る |
| Step 2 | GitHub API連携 |
| Step 3 | PowerShell安全保存 |
| Step 4 | React UI統合 |
| Step 5 | 発酵ログを味わう |

---

### 🏷 推奨タグ
`#GPTs` `#GitHub連携` `#note開発` `#AIツール` `#発酵思考`

---

### ✨おまけ
この仕組みを一度動かすと、  
あなたの「思考の揺らぎ」がそのまま**記事の履歴**になる。  
AIと人間の境界が、少しずつ曖昧になっていくのを感じてほしい。