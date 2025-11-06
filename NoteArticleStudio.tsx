import React, { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Download, Copy, RefreshCw, FileText, Sparkles, Trash2 } from "lucide-react";

// --- Utility helpers ---
const slugify = (s) =>
  s
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .slice(0, 80);

const today = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
};

const countChars = (s) => (s ? [...s].length : 0);
const countWords = (s) => (s ? s.trim().split(/\s+/).filter(Boolean).length : 0);
const readingMinutes = (s) => Math.max(1, Math.round(countWords(s) / 600)); // 600wpm(日/JA混在想定のざっくり)

// --- Core generator (rule-based, client-side) ---
function generateArticle({
  title,
  topic,
  angle,
  audience,
  tone,
  type,
  includeCTA,
  coverAccent,
}) {
  const styleWrap = (txt) => (tone === "専門的" ? txt : txt);

  const pain = `${audience}がよく直面する課題`;
  const lead = styleWrap(
    `${topic} をテーマに、${angle} の視点から要点をわかりやすく解説します。` +
      ` 本稿では「${pain}」を起点に、すぐ試せる実践策と落とし穴の回避法を紹介します。`
  );

  const h1 = type === "事例紹介" ? "ケーススタディ（背景と前提）" : "いま何が起きている？（背景と前提）";
  const sec1 = styleWrap(
    `${topic}を取り巻く現状を3点で整理します。\n- キー要素: ${angle}\n- よくある誤解: 表層的なテクニックだけに頼る\n- 成功の土台: 目的→指標（KPI）→施策の順で考える`
  );

  const h2 = type === "HowTo" ? "今日からできる実践ステップ" : "具体策・運用のポイント";
  const sec2 = styleWrap(
    "1) 現状把握：課題と理想状態を1枚に可視化\n" +
      "2) 仮説設計：小さく試す施策を3つ書き出す\n" +
      "3) 実行：1つだけ着手し、計測→振り返り→改善を1サイクル回す\n" +
      "4) 拡張：うまくいったパターンをテンプレ化して横展開"
  );

  const h3 = "つまずきポイントと回避法";
  const sec3 = styleWrap(
    "- 指標が曖昧：読み手行動（いいね/コメント/流入/滞在/CV）に紐づける\n" +
      "- ネタ切れ：FAQ・失敗談・Before/After・数字の裏側を定期発掘\n" +
      "- 作業肥大化：締切と上限時間を先に決め、型に流し込む"
  );

  const summary = styleWrap(
    `${topic}は「背景→小さく検証→型化」の順で前進します。迷ったら、読者が次に取る1アクションだけを明確に。`
  );

  const hashtags = ["#note", `#${slugify(topic).slice(0, 20)}`, "#学び", "#実践メモ"].join(" ");

  const post1 = `${topic}｜${angle}｜今日から試せる3ステップ。背景→実践→回避策の順で解説。まずは“1サイクルだけ”。`;
  const post2 = `${topic}のつまずきあるあると回避法。指標は“読者の次の1アクション”。`;
  const post3 = `ネタ切れ対策：FAQ/失敗談/Before-After/数字の裏側。型に流し込めば毎日出せる。`;

  const coverPrompt = `${topic} を象徴するミニマル構図、余白多め、見出し『${title || topic}』を中央、${audience}向け、現代的デザイン、高解像度、雑誌カバー風、白基調＋アクセント${coverAccent || "1色"}`;

  const TEMPLATE = `# ${title || `${topic}：${angle}の最短ロードマップ`}\n\n${lead}\n\n## ${h1}\n${sec1}\n\n## ${h2}\n${sec2}\n\n## ${h3}\n${sec3}\n\n### まとめ\n${summary}\n\n---\n\n**ハッシュタグ案**\n${hashtags}\n\n---\n\n**X用ポスト文（140字想定・3本）**\n1) ${post1}\n2) ${post2}\n3) ${post3}\n\n---\n\n**アイキャッチ画像プロンプト（画像生成AI向け）**\n${coverPrompt}\n\n${includeCTA ? `\n---\n\n**CTA（行動喚起）**  \n参考になったらスキ & フォローで応援してください。続編では事例テンプレを配布します。\n` : ""}`;

  return TEMPLATE.trim();
}

export default function NoteArticleStudio() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("AI画像運用");
  const [angle, setAngle] = useState("毎日更新の型");
  const [audience, setAudience] = useState("クリエイター");
  const [tone, setTone] = useState("カジュアル");
  const [type, setType] = useState("HowTo");
  const [includeCTA, setIncludeCTA] = useState(true);
  const [coverAccent, setCoverAccent] = useState("1色");
  const [markdown, setMarkdown] = useState("");
  const [fontSize, setFontSize] = useState(16);

  // LocalStorage autosave
  useEffect(() => {
    const saved = localStorage.getItem("note_studio_state_v1");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setTitle(s.title || "");
        setTopic(s.topic || "");
        setAngle(s.angle || "");
        setAudience(s.audience || "");
        setTone(s.tone || "カジュアル");
        setType(s.type || "HowTo");
        setIncludeCTA(s.includeCTA ?? true);
        setCoverAccent(s.coverAccent || "1色");
        setMarkdown(s.markdown || "");
        setFontSize(s.fontSize || 16);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = {
      title,
      topic,
      angle,
      audience,
      tone,
      type,
      includeCTA,
      coverAccent,
      markdown,
      fontSize,
    };
    localStorage.setItem("note_studio_state_v1", JSON.stringify(payload));
  }, [title, topic, angle, audience, tone, type, includeCTA, coverAccent, markdown, fontSize]);

  const html = useMemo(() => {
    const raw = marked.parse(markdown || "");
    return DOMPurify.sanitize(raw);
  }, [markdown]);

  const metaText = useMemo(() => {
    const ch = countChars(markdown);
    const wd = countWords(markdown);
    const rt = readingMinutes(markdown);
    return `${ch}文字 / 約${wd}語 ・ 推定${rt}分`;
  }, [markdown]);

  const onGenerate = () => {
    const md = generateArticle({ title, topic, angle, audience, tone, type, includeCTA, coverAccent });
    setMarkdown(md);
  };

  const onClear = () => {
    setMarkdown("");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (_) {}
  };

  const downloadMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileSlug = slugify(title || `${topic}-${angle}`) || "note-article";
    a.href = url;
    a.download = `${today()}_${fileSlug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 bg-white">
      <div className="mx-auto max-w-7xl space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Note記事ジェネレーター（ライブプレビュー & 編集）</h1>
        <p className="text-sm text-gray-500">パラメータ→生成→右側でプレビュー。Copy/MDダウンロードでNoteにペーストできます。</p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left: Controls */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">パラメータ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">タイトル（任意）</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：『AI画像×Note』毎日更新の型" />
              </div>
              <div>
                <label className="text-xs text-gray-500">テーマ</label>
                <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="例：AI画像運用" />
              </div>
              <div>
                <label className="text-xs text-gray-500">視点・切り口</label>
                <Input value={angle} onChange={(e) => setAngle(e.target.value)} placeholder="例：毎日更新の型" />
              </div>
              <div>
                <label className="text-xs text-gray-500">想定読者</label>
                <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="例：クリエイター" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">トーン</label>
                  <select className="w-full border rounded-md h-9 px-2" value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option>カジュアル</option>
                    <option>専門的</option>
                    <option>ストーリー</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">記事タイプ</label>
                  <select className="w-full border rounded-md h-9 px-2" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>HowTo</option>
                    <option>コラム</option>
                    <option>分析</option>
                    <option>事例紹介</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <label className="text-xs text-gray-500">CTAを入れる</label>
                <input type="checkbox" checked={includeCTA} onChange={(e) => setIncludeCTA(e.target.checked)} />
              </div>
              <div>
                <label className="text-xs text-gray-500">アイキャッチのアクセント色の数（説明文）</label>
                <Input value={coverAccent} onChange={(e) => setCoverAccent(e.target.value)} placeholder="例：1色 / 2色" />
              </div>

              <div className="flex gap-2 pt-1">
                <Button className="gap-2" onClick={onGenerate}>
                  <Sparkles size={16} /> 生成
                </Button>
                <Button variant="secondary" className="gap-2" onClick={onClear}>
                  <Trash2 size={16} /> クリア
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Middle: Editor */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Markdownエディタ</CardTitle>
                <div className="text-xs text-gray-500">{metaText}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Tabs defaultValue="edit">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="edit"><FileText size={14} className="mr-1"/>編集</TabsTrigger>
                  <TabsTrigger value="tools"><RefreshCw size={14} className="mr-1"/>ツール</TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="mt-3">
                  <Textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="# タイトル\n\n本文…"
                    style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize }}
                    className="min-h-[520px]"
                  />
                  <div className="mt-2">
                    <label className="text-xs text-gray-500">エディタ文字サイズ</label>
                    <Slider value={[fontSize]} min={12} max={22} step={1} onValueChange={(v) => setFontSize(v[0])} />
                  </div>
                </TabsContent>
                <TabsContent value="tools" className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="gap-2" onClick={copyToClipboard}><Copy size={16}/> コピー</Button>
                    <Button className="gap-2" onClick={downloadMd}><Download size={16}/> .md保存</Button>
                  </div>
                  <div className="text-xs text-gray-500">Noteでは見出し（#, ##）と段落の改行が重要です。プレビューで崩れないか確認してください。</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right: Preview */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">プレビュー（Note想定）</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none prose-headings:scroll-mt-20">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
