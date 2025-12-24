import { chromium } from "playwright";
import fs from "fs";

(async () => {
  console.log("🚀 Starting note publish (draft test)...");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const email = process.env.NOTE_EMAIL;
  const password = process.env.NOTE_PASSWORD;
  const articlePath = process.env.ARTICLE_PATH || "NoteMD/articles/test_dispatch.md";
  const content = fs.readFileSync(articlePath, "utf8");

  if (!email || !password) {
    console.error("❌ NOTE_EMAIL / NOTE_PASSWORD not found in Secrets.");
    process.exit(1);
  }

  await page.goto("https://note.com/login");
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);

  console.log("✅ Logged in to note.com (draft test)");

  // 新規記事作成
  await page.goto("https://note.com/notes/new");
  await page.waitForSelector("textarea");
  await page.fill("textarea", "✑ [TEST] Draft note from GitHub Actions\n\n" + content);
  await page.waitForTimeout(2000);

  // 下書き保存（ボタン位置は暫定）
  await page.keyboard.press("Control+S");
  await page.waitForTimeout(2000);

  console.log("✅ Draft saved successfully (simulation complete)");

  await browser.close();
})();
