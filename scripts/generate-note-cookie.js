import { chromium } from "playwright";
import fs from "fs";

(async () => {
  console.log("🚀 [Ponta] note.com にログインして Cookie 取得中...");

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();

  // SPA構造対策: ページロードとJS描画完了を両方待つ
  await page.goto("https://note.com/login/email", { waitUntil: "networkidle" });

  // Fallback: 描画が遅い場合に数秒待機（note側のJSレンダリング対策）
  await page.waitForTimeout(5000);

  // ログ: 実際のHTMLを確認
  const html = await page.content();
  if (!html.includes("メールアドレス")) {
    console.warn("⚠️ [Ponta] メール欄未検出。JS描画遅延の可能性。再試行するッス。");
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(5000);
  }

  // メールアドレス入力欄に入力
  const emailField = await page.waitForSelector('input[placeholder="メールアドレス"]', { timeout: 40000 });
  await emailField.fill(process.env.NOTE_EMAIL);

  // パスワード入力欄に入力
  const passField = await page.waitForSelector('input[placeholder="パスワード"]', { timeout: 40000 });
  await passField.fill(process.env.NOTE_PASSWORD);

  // ログインボタン押下
  const loginButton = await page.locator('button:has-text("ログイン")');
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle" }),
    loginButton.click()
  ]);

  // Cookie取得
  const cookies = await page.context().cookies();
  const noteCookie = cookies.find(c => c.name.includes("note_session"));

  if (!noteCookie) {
    console.error("❌ [Ponta] note_session cookie が見つからないッス！");
    process.exit(1);
  }

  fs.writeFileSync("note_cookies.json", JSON.stringify(cookies, null, 2));
  console.log(`✅ [Ponta] Cookie保存完了: ${noteCookie.name} (${noteCookie.value.slice(0, 12)}...)`);

  await browser.close();
})();
