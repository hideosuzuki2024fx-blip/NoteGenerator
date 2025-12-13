import React, { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Copy, Download, Plus, Minus, Sparkles, Trash2 } from "lucide-react";

// ================= Utils =================
const slugify = (s: string) =>
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

const timestamp = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
};

const isoLocal = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// filename helpers
const buildSeriesFilename = (series: string, chapterNo: number, suffixDate?: string) => {
  const base = `${slugify(series)}_ch${String(chapterNo).padStart(2, "0")}`;
  return `${base}_${suffixDate || today()}.md`;
};

// ================= Types =================
 type Mode = "論文" | "長文" | "連載";
 type Section = { id: string; title: string; body: string };

// ================= Markdown Generator =================
function generateMarkdown(params: {
  mode: Mode;
  title: string;
  author: string;
  folderPath: string;
  // 論文
  bg?: string; hypo?: string; method?: string; results?: string; discuss?: string;
  // 長文
  intro?: string; develop?: string; deepen?: string; conclude?: string;
  // 連載
  series?: string; chapterNo?: number; totalChapters?: number; 
  serialSections?: Section[];
  // 保存オプション
  includeSeriesMeta: boolean;
  includeChapterLinks: boolean;
  includeChapterCount: boolean;
}) {
  const {
    mode, title, author, folderPath,
    bg, hypo, method, results, discuss,
    intro, develop, deepen, conclude,
    series, chapterNo, totalChapters, serialSections,
    includeSeriesMeta, includeChapterLinks, includeChapterCount,
  } = params;
  const updatedAt = isoLocal();

  let body = "";
  if (mode === "論文") {
    body = `## 1. 背景・目的\n${bg || ""}\n\n## 2. 仮説\n${hypo || ""}\n\n## 3. 方法\n${method || ""}\n\n## 4. 結果\n${results || ""}\n\n## 5. 考察\n${discuss || ""}`;
  } else if (mode === "長文") {
    body = `## 導入\n${intro || ""}\n\n## 展開\n${develop || ""}\n\n## 深化\n${deepen || ""}\n\n## 結語\n${conclude || ""}`;
  } else {
    // 連載: 自由章セクション（章内の小見出し）
    const secMd = (serialSections || []).map((s, idx) => `### ${s.title || `セクション${idx + 1}`}\n${s.body || ""}`).join("\n\n");
    body = `## 第${chapterNo || 1}章 ${title || ""}\n${secMd}`;
  }

  // ---- footer: 保存ログ + PowerShell ----
  let seriesLines = "";
  let linkLines = "";

  if (mode === "連載" && includeSeriesMeta) {
    const sName = series || "Series";
    const ch = chapterNo || 1;
    const prevFile = ch > 1 ? buildSeriesFilename(sName, ch - 1) : undefined;
    const nextFile = includeChapterCount && totalChapters && ch < totalChapters ? buildSeriesFilename(sName, ch + 1) : buildSeriesFilename(sName, ch + 1);
    seriesLines += `- シリーズ名：${sName}\n- 現在：第${ch}章`;
    if (includeChapterCount && totalChapters) seriesLines += `／全${totalChapters}章`;
    seriesLines += "\n";

    if (includeChapterLinks) {
      if (prevFile) linkLines += `- 前回：[第${ch - 1}章](${prevFile})\n`;
      linkLines += `- 次回：${ch ? `[第${ch + 1}章](${nextFile})` : `[次章](${nextFile})`}\n`;
    }
  }

  const fileSlug = slugify(title || (series ? `${series}_ch${chapterNo || 1}` : "draft"));
  const savePath = `${folderPath}\\${fileSlug}_${timestamp()}.md`;

  const metaJson = {
    mode,
    series: mode === "連載" && includeSeriesMeta ? (series || "Series") : undefined,
    chapter: mode === "連載" && includeSeriesMeta ? (chapterNo || 1) : undefined,
    total: mode === "連載" && includeSeriesMeta && includeChapterCount ? (totalChapters || undefined) : undefined,
    links: mode === "連載" && includeChapterLinks ? {
      previous: (mode === "連載" && includeChapterLinks && (chapterNo || 1) > 1) ? buildSeriesFilename(series || "Series", (chapterNo || 1) - 1) : undefined,
      next: buildSeriesFilename(series || "Series", (chapterNo || 1) + 1),
    } : undefined,
    updatedAt,
    savePath,
  } as any;

  const metaComment = `# === PaperMeta ===\n# ${JSON.stringify(metaJson)}\n# === EndMeta ===`;

  const powershell = `\n\n\`\`\`powershell\n$timestamp = (Get-Date -Format "yyyy-MM-dd-HHmm")\n$path = "${folderPath}\\${fileSlug}_$timestamp.md"\n$content = @'\n<<<本文ここに展開>>>\n'@\nSet-Content -Path $path -Value $content -Encoding UTF8\n# 自動生成メタ情報（GPT参照用）\n${metaComment}\n\`\`\``;

  const header = `# ${title || (mode === "連載" ? `${series || "シリーズ"}：第${chapterNo || 1}章` : "無題")}\n**著者:** ${author || "匿名"}  \n**モード:** ${mode}  \n**更新:** ${updatedAt}  \n**保存フォルダ:** ${folderPath}`;

  const seriesBlock = seriesLines ? `\n${seriesLines}${linkLines}` : "";

  const md = `${header}\n\n---\n\n${body}\n\n---\n\n**保存ログ**  \n- 更新日時：${updatedAt}  \n- 保存先：${savePath}  \n- 編集モード：${mode}モード（継続管理有効）\n${seriesBlock}\n${powershell}\n`;

  return md.trim();
}

// ================= Component =================
export default function PaperNoteStudio() {
  const [mode, setMode] = useState<Mode>("論文");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [folderPath, setFolderPath] = useState("C:\\NoteProjects\\Papers");

  // 論文
  const [bg, setBg] = useState("");
  const [hypo, setHypo] = useState("");
  const [method, setMethod] = useState("");
  const [results, setResults] = useState("");
  const [discuss, setDiscuss] = useState("");

  // 長文
  const [intro, setIntro] = useState("");
  const [develop, setDevelop] = useState("");
  const [deepen, setDeepen] = useState("");
  const [conclude, setConclude] = useState("");

  // 連載
  const [series, setSeries] = useState("");
  const [chapterNo, setChapterNo] = useState<number>(1);
  const [totalChapters, setTotalChapters] = useState<number | undefined>(undefined);
  const [serialSections, setSerialSections] = useState<Section[]>([
    { id: crypto.randomUUID(), title: "セクション1", body: "" },
  ]);

  // 保存時の質問（ダイアログ）
  const [askDialogOpen, setAskDialogOpen] = useState(false);
  const [includeSeriesMeta, setIncludeSeriesMeta] = useState(true);
  const [includeChapterLinks, setIncludeChapterLinks] = useState(true);
  const [includeChapterCount, setIncludeChapterCount] = useState(true);

  const [markdown, setMarkdown] = useState("");
  const [fontSize, setFontSize] = useState(16);

  // Autosave
  useEffect(() => {
    const saved = localStorage.getItem("paper_integrated_state_v1");
    if (saved) {
      try {
        const s = JSON.parse(saved);
        setMode(s.mode || "論文");
        setTitle(s.title || "");
        setAuthor(s.author || "");
        setFolderPath(s.folderPath || "C:\\NoteProjects\\Papers");
        setBg(s.bg || ""); setHypo(s.hypo || ""); setMethod(s.method || ""); setResults(s.results || ""); setDiscuss(s.discuss || "");
        setIntro(s.intro || ""); setDevelop(s.develop || ""); setDeepen(s.deepen || ""); setConclude(s.conclude || "");
        setSeries(s.series || ""); setChapterNo(s.chapterNo || 1); setTotalChapters(s.totalChapters);
        setSerialSections(s.serialSections || [{ id: crypto.randomUUID(), title: "セクション1", body: "" }]);
        setIncludeSeriesMeta(s.includeSeriesMeta ?? true);
        setIncludeChapterLinks(s.includeChapterLinks ?? true);
        setIncludeChapterCount(s.includeChapterCount ?? true);
        setMarkdown(s.markdown || "");
        setFontSize(s.fontSize || 16);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = {
      mode, title, author, folderPath,
      bg, hypo, method, results, discuss,
      intro, develop, deepen, conclude,
      series, chapterNo, totalChapters, serialSections,
      includeSeriesMeta, includeChapterLinks, includeChapterCount,
      markdown, fontSize,
    };
    localStorage.setItem("paper_integrated_state_v1", JSON.stringify(payload));
  }, [mode, title, author, folderPath, bg, hypo, method, results, discuss, intro, develop, deepen, conclude, series, chapterNo, totalChapters, serialSections, includeSeriesMeta, includeChapterLinks, includeChapterCount, markdown, fontSize]);

  const html = useMemo(() => DOMPurify.sanitize(marked.parse(markdown || "")), [markdown]);

  const buildAndSet = (opts?: Partial<{ includeSeriesMeta: boolean; includeChapterLinks: boolean; includeChapterCount: boolean }>) => {
    const md = generateMarkdown({
      mode, title, author, folderPath,
      bg, hypo, method, results, discuss,
      intro, develop, deepen, conclude,
      series, chapterNo, totalChapters, serialSections,
      includeSeriesMeta: opts?.includeSeriesMeta ?? includeSeriesMeta,
      includeChapterLinks: opts?.includeChapterLinks ?? includeChapterLinks,
      includeChapterCount: opts?.includeChapterCount ?? includeChapterCount,
    });
    setMarkdown(md);
  };

  const onGenerate = () => buildAndSet();

  const onClear = () => setMarkdown("");
  const copyToClipboard = async () => { try { await navigator.clipboard.writeText(markdown); } catch {} };
  const downloadMd = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const fileSlug = slugify(title || (series ? `${series}_ch${chapterNo}` : "draft"));
    a.href = url; a.download = `${today()}_${fileSlug}.md`; a.click(); URL.revokeObjectURL(url);
  };

  // 章セクションの追加/削除（連載モード用）
  const addSection = () => setSerialSections((prev) => [...prev, { id: crypto.randomUUID(), title: `セクション${prev.length + 1}`, body: "" }]);
  const removeSection = (id: string) => setSerialSections((prev) => prev.length > 1 ? prev.filter(s => s.id !== id) : prev);

  return (
    <div className="min-h-screen w-full p-4 md:p-6 bg-white">
      <div className="mx-auto max-w-7xl space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">論文／長文／連載 統合スタジオ（保存ログ＆リンク生成）</h1>
        <p className="text-sm text-gray-500">モード切替・章数可変・シリーズ名・保存時質問に対応。末尾にPowerShell保存コードを自動付与。</p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Left: Inputs */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader><CardTitle className="text-base">パラメータ</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500">モード</Label>
                <select className="w-full border rounded-md h-9 px-2" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                  <option>論文</option>
                  <option>長文</option>
                  <option>連載</option>
                </select>
              </div>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" />
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="著者名" />
              <Input value={folderPath} onChange={(e) => setFolderPath(e.target.value)} placeholder="保存フォルダパス (例: C:\\NoteProjects\\Papers)" />

              {mode === "論文" && (
                <div className="space-y-2">
                  <Textarea value={bg} onChange={(e) => setBg(e.target.value)} placeholder="1. 背景・目的" />
                  <Textarea value={hypo} onChange={(e) => setHypo(e.target.value)} placeholder="2. 仮説" />
                  <Textarea value={method} onChange={(e) => setMethod(e.target.value)} placeholder="3. 方法" />
                  <Textarea value={results} onChange={(e) => setResults(e.target.value)} placeholder="4. 結果" />
                  <Textarea value={discuss} onChange={(e) => setDiscuss(e.target.value)} placeholder="5. 考察" />
                </div>
              )}

              {mode === "長文" && (
                <div className="space-y-2">
                  <Textarea value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="導入" />
                  <Textarea value={develop} onChange={(e) => setDevelop(e.target.value)} placeholder="展開" />
                  <Textarea value={deepen} onChange={(e) => setDeepen(e.target.value)} placeholder="深化" />
                  <Textarea value={conclude} onChange={(e) => setConclude(e.target.value)} placeholder="結語" />
                </div>
              )}

              {mode === "連載" && (
                <div className="space-y-2">
                  <Input value={series} onChange={(e) => setSeries(e.target.value)} placeholder="シリーズ名" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" value={chapterNo} onChange={(e) => setChapterNo(Math.max(1, parseInt(e.target.value || "1", 10)))} placeholder="章番号 (例: 1)" />
                    <Input type="number" value={totalChapters || ''} onChange={(e) => setTotalChapters(e.target.value ? Math.max(1, parseInt(e.target.value, 10)) : undefined)} placeholder="総章数（任意）" />
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <Label className="text-xs text-gray-500">章内セクション</Label>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="gap-1" onClick={addSection}><Plus size={14}/> 追加</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {serialSections.map((s, idx) => (
                      <div key={s.id} className="border rounded-md p-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <Input value={s.title} onChange={(e) => setSerialSections(prev => prev.map(p => p.id === s.id ? { ...p, title: e.target.value } : p))} placeholder={`セクション${idx + 1} タイトル`} />
                          <Button variant="destructive" size="icon" onClick={() => removeSection(s.id)} disabled={serialSections.length === 1}><Minus size={14}/></Button>
                        </div>
                        <Textarea value={s.body} onChange={(e) => setSerialSections(prev => prev.map(p => p.id === s.id ? { ...p, body: e.target.value } : p))} placeholder={`セクション${idx + 1} 本文`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button className="gap-2" onClick={onGenerate}><Sparkles size={16}/> 生成</Button>
                <Button variant="secondary" className="gap-2" onClick={onClear}><Trash2 size={16}/> クリア</Button>
              </div>

              {/* 保存時の質問（トグル） */}
              <div className="mt-3 grid grid-cols-1 gap-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">シリーズ名・章情報を保存コードに含める</Label>
                  <Switch checked={includeSeriesMeta} onCheckedChange={setIncludeSeriesMeta} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">前回/次回リンクを自動生成して明記</Label>
                  <Switch checked={includeChapterLinks} onCheckedChange={setIncludeChapterLinks} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">総章数（全◯章）を含める</Label>
                  <Switch checked={includeChapterCount} onCheckedChange={setIncludeChapterCount} />
                </div>
                <Button className="mt-1" variant="outline" onClick={() => { setAskDialogOpen(true); }}>
                  保存コードを生成（質問を反映）
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Middle: Editor */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Markdownエディタ</CardTitle>
                <div className="text-xs text-gray-500">{(markdown || "").length} 文字</div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                style={{ fontFamily: "ui-monospace, Menlo, Consolas, 'Courier New'", fontSize }}
                className="min-h-[500px]"
              />
              <div className="mt-2">
                <Label className="text-xs text-gray-500">文字サイズ</Label>
                <Slider value={[fontSize]} min={12} max={22} step={1} onValueChange={(v) => setFontSize(v[0])} />
              </div>
              <div className="flex gap-2 mt-3">
                <Button className="gap-2" onClick={async () => { try { await navigator.clipboard.writeText(markdown); } catch {} }}><Copy size={16}/> コピー</Button>
                <Button className="gap-2" onClick={downloadMd}><Download size={16}/> .md保存</Button>
              </div>
            </CardContent>
          </Card>

          {/* Right: Preview */}
          <Card className="xl:col-span-1 shadow-sm">
            <CardHeader><CardTitle className="text-base">プレビュー（{mode}モード）</CardTitle></CardHeader>
            <CardContent>
              <div className="prose max-w-none prose-headings:scroll-mt-20">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 保存時の質問ダイアログ */}
      <Dialog open={askDialogOpen} onOpenChange={setAskDialogOpen}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>保存コードに含める情報</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>シリーズ名・章情報を含める</Label>
              <Switch checked={includeSeriesMeta} onCheckedChange={setIncludeSeriesMeta} />
            </div>
            {mode === "連載" && includeSeriesMeta && (
              <div className="grid grid-cols-2 gap-2">
                <Input value={series} onChange={(e) => setSeries(e.target.value)} placeholder="シリーズ名" />
                <Input type="number" value={chapterNo} onChange={(e) => setChapterNo(Math.max(1, parseInt(e.target.value || "1", 10)))} placeholder="章番号" />
              </div>
            )}
            <div className="flex items-center justify-between">
              <Label>前回/次回リンクを自動生成</Label>
              <Switch checked={includeChapterLinks} onCheckedChange={setIncludeChapterLinks} />
            </div>
            <div className="flex items-center justify-between">
              <Label>総章数（全◯章）を含める</Label>
              <Switch checked={includeChapterCount} onCheckedChange={setIncludeChapterCount} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => { buildAndSet({ includeSeriesMeta, includeChapterLinks, includeChapterCount }); setAskDialogOpen(false); }}>生成して反映</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
// 💾 NoteGenへの保存呼び出し関数
async function saveToNoteGen() {
  try {
    const res = await fetch("http://localhost:5111/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content: markdown }),
    });
    const data = await res.json();
    if (data.success) {
      alert("✅ NoteGenに保存完了！\\n" + data.log);
    } else {
      alert("⚠️ 保存失敗：" + data.error);
    }
  } catch (err) {
    alert("❌ 通信エラー: " + err);
  }
}

// 💾 保存ボタン追加 (ActionBar 等に配置)
<Button onClick={saveToNoteGen} className="bg-green-600 hover:bg-green-700">
  💾 NoteGenに保存
</Button>
