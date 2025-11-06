import React, { useEffect, useMemo, useRef, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Download, Copy, FileText, Sparkles, Trash2, Upload } from "lucide-react";

// =============== Utility ===============
const slugify = (s) =>
  (s || "")
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
const readingMinutes = (s) => Math.max(1, Math.round(countWords(s) / 600));

// Simple tokenizer for JA/EN mixed: extracts JA terms and EN words
function extractTokens(text) {
  const ja = Array.from(text.matchAll(/[\u3040-\u30ff\u3400-\u9fff]{2,}/g)).map((m) => m[0]);
  const en = Array.from(text.toLowerCase().matchAll(/[a-zA-Z][a-zA-Z0-9_-]{2,}/g)).map((m) => m[0]);
  return [...ja, ...en];
}

const STOPWORDS_EN = new Set(
  "the a an and or but if then so to of in on at for with from is are was were be been being this that it as by about into over after before not can will just you we they i our your their me my mine ours yours theirs who whom where when why how".split(
    /\s+/
  )
);

// Naive frequency map
function freqMap(tokens) {
  const f = new Map();
  for (const t of tokens) {
    if (!t) continue;
    if (STOPWORDS_EN.has(t)) continue;
    f.set(t, (f.get(t) || 0) + 1);
  }
  return f;
}

function topN(map, n) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

// Split conversation into messages (rough heuristic that works for pasted chats)
function splitMessages(raw, opts) {
  const lines = raw.split(/\r?\n/);
  const msgs = [];
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (opts.removeGreetings && /^(おはよう|こんにちは|こんばんは|hi|hello|hey)/i.test(line)) continue;
    if (opts.removeShort && line.length < opts.minLen) continue;
    msgs.push(line);
  }
  return msgs;
}

// Score sentences by keyword frequency (extractive)
function scoreSentences(msgs) {
  const joined = msgs.join(" \n");
  const tokens = extractTokens(joined);
  const f = freqMap(tokens);
  const sentences = msgs.flatMap((m) => m.split(/(?<=[。.!?！？])\s*/).filter(Boolean));
  const scored = sentences.map((s) => {
    const ts = extractTokens(s);
    const score = ts.reduce((acc, t) => acc + (f.get(t) || 0), 0) + Math.min(60, s.length) * 0.01; // slight length prior
    return { s: s.trim(), score };
  });
  const unique = [];
  const seen = new Set();
  for (const item of scored) {
    if (seen.has(item.s)) continue;
    seen.add(item.s);
    unique.push(item);
  }
  unique.sort((a, b) => b.score - a.score);
  return unique.map((x) => x.s);
}

function makeHashtags(text, n = 5) {
  const tokens = extractTokens(text);
  const f = freqMap(tokens);
  const tops = topN(f, n);
  return tops.map((t) => `#${slugify(t).slice(0, 20)}`).join(" ");
}

// =============== Article Generator ===============
function buildMarkdown({ title, type, audience, tone, keyPoints, quotes, summary, hashtags, posts, coverPrompt }) {
  const h1 = type === "事例紹介" ? "ケーススタディ（背景と前提）" : "いま何が起きている？（背景と前提）";
  const h2 = type === "HowTo" ? "今日からできる実践ステップ" : "論点と示唆";
  const h3 = "つまずきポイント / 今後の見立て";

  const lead = `${title} に関する会話ログをもとに要点を整理しました。${audience}向けに、雑談で出た論点と示唆を短時間でキャッチアップできます。`;

  const bullets = keyPoints.map((p) => `- ${p}`).join("\n");
  const quotesMd = quotes.length ? quotes.map((q) => `> ${q}`).join("\n\n") : "";

  const md = `# ${title}\n\n${lead}\n\n## ${h1}\n${bullets}\n\n## ${h2}\n${summary}\n\n## ${h3}\n- 未解決の課題：観測と検証を継続\n- 次のアクション：小さく試し、ログ→改善のループへ\n\n---\n\n**ハッシュタグ案**\n${hashtags}\n\n---\n\n**X用ポスト文（140字想定・3本）**\n1) ${posts[0]}\n2) ${posts[1]}\n3) ${posts[2]}\n\n---\n\n**アイキャッチ画像プロンプト（画像生成AI向け）**\n${coverPrompt}\n`;
  return md.trim();
}

function generateFromConversation(raw, params) {
  const { type, audience, tone, topK, minLen, removeGreetings, removeShort } = params;
  const msgs = splitMessages(raw, { removeGreetings, removeShort, minLen });
  if (msgs.length === 0) {
    return { title: "（タイトル未設定）", markdown: "# 入力が空です\n\n左ペインに会話ログを貼り付けてください。" };
  }

  const best = scoreSentences(msgs).slice(0, topK);
  const titleCand = best[0]?.replace(/[。.!?！？]+$/, "") || "雑談まとめ";

  // Key points as bullet points (dedup, keep order from best)
  const kpSet = new Set();
  const keyPoints = [];
  for (const s of best) {
    const b = s.length > 120 ? s.slice(0, 118) + "…" : s;
    if (!kpSet.has(b)) {
      kpSet.add(b);
      keyPoints.push(b);
    }
  }

  // Quotes: take a few raw lines as blockquotes
  const quotes = msgs.slice(0, Math.min(5, msgs.length)).filter((l) => l.length >= minLen);

  // Summary paragraph: stitch top sentences
  const summary = best.slice(0, Math.min(5, best.length)).join("\n");

  const hashtags = makeHashtags(raw, 5);

  const posts = [
    `${titleCand}｜要点まとめ。背景→論点→次の一手を簡潔に。`,
    `雑談ログから抽出した示唆：${keyPoints[0] || "主要論点"}`,
    `今後の観測ポイントと小さな検証プランをNoteに整理。`,
  ];

  const coverPrompt = `${titleCand} を象徴するミニマル構図、余白多め、見出し『${titleCand}』を中央、${audience}向け、現代的デザイン、高解像度、雑誌カバー風`;

  const markdown = buildMarkdown({
    title: params.title || titleCand,
    type,
    audience,
    tone,
    keyPoints,
    quotes,
    summary,
    hashtags,
    posts,
    coverPrompt,
  });

  return { title: params.title || titleCand, markdown };
}

// =============== Component ===============
export default function ChatToNoteStudio() {
  const [raw, setRaw] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("HowTo");
  const [audience, setAudience] = useState("クリエイター");
  const [tone, setTone] = useState("カジュアル");
  const [topK, setTopK] = useState(10);
  const [minLen, setMinLen] = useState(12);
  const [removeGreetings, setRemoveGreetings] = useState(true);
  const [removeShort, setRemoveShort] = useState(true);
  const [markdown, setMarkdown] = useState("");
  const [fontSize, setFontSize] = useState(15);
  const fileRef = useRef(null);

  // Autosave
  useEffect(() => {
    const saved = localStorage.getItem("chat2note_state_v1");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setRaw(s.raw || "");
        setTitle(s.title || "");
        setType(s.type || "HowTo");
        setAudience(s.audience || "クリエイター");
        setTone(s.tone || "カジュアル");
        setTopK(s.topK || 10);
        setMinLen(s.minLen || 12);
        setRemoveGreetings(s.removeGreetings ?? true);
        setRemoveShort(s.removeShort ?? true);
        setMarkdown(s.markdown || "");
        setFontSize(s.fontSize || 15);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const s = {
      raw,
      title,
      type,
      audience,
      tone,
      topK,
      minLen,
      removeGreetings,
      removeShort,
      markdown,
      fontSize,
    };
    localStorage.setItem("chat2note_state_v1", JSON.stringify(s));
  }, [raw, title, type, audience, tone, topK, minLen, removeGreetings, removeShort, markdown, fontSize]);

  const html = useMemo(() => DOMPurify.sanitize(marked.parse(markdown || "")), [markdown]);

  const metaText = useMemo(() => {
    const ch = countChars(markdown);
    const wd = countWords(markdown);
    const rt = readingMinutes(markdown);
    return `${ch}文字 / 約${wd}語 ・ 推定${rt}分`;
  }, [markdown]);

  const onGenerate = () => {
    const { markdown: md } = generateFromConversation(raw, {
      title,
      type,
      audience,
      tone,
      topK,
      minLen,
      removeGreetings,
      removeShort,
    });
    setMarkdown(md);
  };

  const onClear = () => setMarkdown("");

  const copyToClipboard = async () => {
    try { await navigator.clipboard.writeText(markdown); } catch {}
  };

  const downloadMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileSlug = slugify(title || "chat-to-note");
    a.href = url; a.download = `${today()}_${fileSlug}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  const loadFile = async (file) => {
    if (!file) return;
    const text = await file.text();
    setRaw((prev) => (prev ? prev + "\n\n" + text : text));
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 bg-white">
      <div className="mx-auto max-w-7xl space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">「会話からNote」ジェネレーター（雑談→記事化 / Canvas）</h1>
        <p className="text-sm text-gray-500">左に会話ログを貼り付け → 中央で抽出ルールを調整 → 右でNote想定プレビュー。コピー/保存で投稿準備完了。</p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left: Conversation Input */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">会話ログ（貼り付け or .txt読込）</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 items-center">
                <Input type="file" accept=".txt,.md,.log" ref={fileRef} onChange={(e) => loadFile(e.target.files?.[0])} className="flex-1" />
                <Button variant="secondary" className="gap-2" onClick={() => fileRef.current?.click()}><Upload size={16}/> 読み込み</Button>
              </div>
              <Textarea
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                placeholder={"ここにGPT雑談やXの話題メモをペースト\n\n例) AI政策の動きが増えてる/生成AIの利用規約…"}
                className="min-h-[420px]"
              />
            </CardContent>
          </Card>

          {/* Middle: Controls & Editor */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">抽出ルール & 生成</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-gray-500">タイトル（任意・未入力なら自動抽出）</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：今週のAI雑談まとめ" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">記事タイプ</label>
                  <select className="w-full border rounded-md h-9 px-2" value={type} onChange={(e) => setType(e.target.value)}>
                    <option>HowTo</option>
                    <option>コラム</option>
                    <option>分析</option>
                    <option>事例紹介</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">想定読者</label>
                  <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="例：クリエイター" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <div>
                  <label className="text-xs text-gray-500">抽出する文数(topK)</label>
                  <Input type="number" value={topK} onChange={(e) => setTopK(parseInt(e.target.value || "10", 10))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">最小文字数</label>
                  <Input type="number" value={minLen} onChange={(e) => setMinLen(parseInt(e.target.value || "12", 10))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">トーン</label>
                  <select className="w-full border rounded-md h-9 px-2" value={tone} onChange={(e) => setTone(e.target.value)}>
                    <option>カジュアル</option>
                    <option>専門的</option>
                    <option>ストーリー</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="flex gap-2 items-center"><Switch checked={removeGreetings} onCheckedChange={setRemoveGreetings} /> <span className="text-sm">挨拶を除外</span></div>
                <div className="flex gap-2 items-center"><Switch checked={removeShort} onCheckedChange={setRemoveShort} /> <span className="text-sm">短文を除外</span></div>
              </div>
              <div className="flex gap-2 pt-1">
                <Button className="gap-2" onClick={onGenerate}><Sparkles size={16}/> 生成</Button>
                <Button variant="secondary" className="gap-2" onClick={onClear}><Trash2 size={16}/> クリア</Button>
              </div>

              <Tabs defaultValue="tools" className="pt-2">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="tools"><FileText size={14} className="mr-1"/>ツール</TabsTrigger>
                  <TabsTrigger value="edit">エディタ</TabsTrigger>
                </TabsList>
                <TabsContent value="tools" className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="gap-2" onClick={copyToClipboard}><Copy size={16}/> コピー</Button>
                    <Button className="gap-2" onClick={downloadMd}><Download size={16}/> .md保存</Button>
                  </div>
                  <div className="text-xs text-gray-500">NoteはMarkdownの見出しと段落の扱いが重要です。右のプレビューで崩れを確認してください。</div>
                </TabsContent>
                <TabsContent value="edit" className="mt-3">
                  <Textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="# タイトル\n\n本文…"
                    style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace", fontSize }}
                    className="min-h-[320px]"
                  />
                  <div className="mt-2">
                    <label className="text-xs text-gray-500">エディタ文字サイズ</label>
                    <Slider value={[fontSize]} min={12} max={22} step={1} onValueChange={(v) => setFontSize(v[0])} />
                  </div>
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
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
