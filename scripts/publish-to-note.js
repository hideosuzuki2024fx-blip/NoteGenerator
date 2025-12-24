import fs from "fs";
import fetch from "node-fetch";

const cookies = JSON.parse(fs.readFileSync("note_cookies.json"));
const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join("; ");

const articlePath = process.env.ARTICLE_PATH;
const publishMode = process.env.PUBLISH_MODE || "draft";

if (!articlePath) {
  console.error("❌ ARTICLE_PATH が指定されてないッス！");
  process.exit(1);
}

const articleBody = fs.readFileSync(articlePath, "utf-8");
const title = articleBody.split("\n")[0].replace(/^# /, "") || "Untitled";

const payload = {
  title,
  body: `<p>${articleBody.replace(/\n/g, "<br>")}</p>`,
  publish_status: publishMode,
};

console.log("🚀 [Ponta] note に投稿開始:", title, `(${publishMode})`);

const res = await fetch("https://note.com/api/v1/text_notes", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Cookie": cookieHeader,
    "User-Agent": "Mozilla/5.0",
  },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  console.error("❌ [Ponta] 投稿失敗:", await res.text());
  process.exit(1);
}

console.log("✅ [Ponta] note投稿成功:", await res.json());
