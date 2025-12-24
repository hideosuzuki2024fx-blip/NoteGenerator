import { chromium } from "playwright";
import fs from "fs";

(async () => {
  console.log("🚀 [Ponta] note.com にログインして Cookie 取得中...");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  // note.com のログインページへ直接アクセス
  await page.goto("https://note.com/login/email", { waitUntil: "domcontentloaded" });

  try {
    // メールアドレス入力欄を待機して入力
    await page.waitForSelector('input[placeholder="メールアドレス"]', { timeout: 20000 });
    await page.fill('input[placeholder="メールアドレス"]', process.env.NOTE_EMAIL);

    // パスワード入力欄を待機して入力
    await page.waitForSelector('input[placeholder="パスワード"]', { timeout: 20000 });
    await page.fill('input[placeholder="パスワード"]', process.env.NOTE_PASSWORD);

    // 「ログイン」ボタン押下 → 遷移完了まで待機
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.click('button:has-text("ログイン")')
    ]);

    // ログイン後に Cookie を取得
    const cookies = await page.context().cookies();
    const noteCookie = cookies.find(c => c.name.includes("note_session"));

    if (!noteCookie) {
      console.error("❌ [Ponta] note_session cookie が見つからないッス！");
      process.exit(1);
    }

    // Cookieを保存
    fs.writeFileSync("note_cookies.json", JSON.stringify(cookies, null, 2));
    console.log(`✅ [Ponta] Cookie保存完了: ${noteCookie.name} (${noteCookie.value.slice(0, 12)}...)`);

  } catch (err) {
    console.error("❌ [Ponta] ログイン中にエラー発生:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
