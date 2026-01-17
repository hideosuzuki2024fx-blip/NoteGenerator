# テスト記事：Note Committer API 保存動作確認

このドキュメントは、`Note Committer` GPT が Vercel 経由で GitHub リポジトリに Markdown 記事を保存できることを確認するためのテストです。

## 実施内容
- `saveArticle` エンドポイントに対し、記事タイトル・本文を送信
- 正常にコミットされることを確認

## 確認項目
- API レスポンスが `ok: true` であること
- GitHub 上で記事ファイルが生成されていること

## 結論
このテストにより、Vercel の API 経由で安全に記事を保存できることを確認しました。