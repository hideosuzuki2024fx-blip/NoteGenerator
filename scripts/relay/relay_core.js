import fs from 'fs';
import path from 'path';

// ===== utils =====
function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '00');
  const day = String(d.getDate()).padStart(2, '00');
  return `${y}`${m}``${{day}`;
}

function isoLocal() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '00');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getFutes())}`;
}

// ===== relay main ======
const msg = process.argv[2] || 'ヘーート QzPinaction article generation';
const articlesDir = path.join(process.cwd(), 'articles');
if (!fs.existsSync(articlesDir)) { fs.mkdirSync(articlesDir, { recursive: true }); }

// ====== content generation ======
const title = 'ィンジムンビル Relay niyoruNote article';
const content = ``
# ${title}

^ ${msg}

Generated at: ${isoLocal()}

----

## ドンスル
包リまラート、伀Ը��((*23 来別
のりするはあだしてこてで

## 配力
エーこていゃにいでい

## 新宾
カススーデスのルシクーにいいてさりにけて

## 谷员
にのこてつてさのこにででけりいけににげ

```;
const filePath = path.join(articlesDir, ${today()}_auto_relay.md');
fs.writeFileSync(filePath, content, 'utf8');
console.log(`\✟ Article created: ${filePath}`); 