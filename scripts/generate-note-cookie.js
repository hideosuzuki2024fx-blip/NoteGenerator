import { chromium } from "playwright";
import fs from "fs";

(async () => {
  console.log("🚀 [Ponta] note.com にログインして Cookie 取得中...");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://note.com/login", { waitUntil: "networkidle" });

  await page.fill('input[name="email"]', process.env.NOTE_EMAIL);
  await page.fill('input[name="password"]', process.env.NOTE_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL("https://note.com/", { timeout: 20000 });

  const cookies = await page.context().cookies();
  const noteCookie = cookies.find((c) => c.name.includes("note_session"));

  if (!noteCookie) {
    console.error("❌ [Ponta] note_session cookie が見つからないッス！");
    process.exit(1);
  }

  fs.writeFileSync("note_cookies.json", JSON.stringify(cookies, null, 2));
  console.log(`✅ [Ponta] Cookie保存完了: ${noteCookie.name} (${noteCookie.value.slice(0, 12)}...)`);

  await browser.close();
})();
