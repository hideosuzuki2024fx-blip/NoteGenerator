import { chromium } from "playwright";
import fs from "fs";
import path from "path";

(async () => {
  console.log("🚀 Starting note publish (draft test)...");

  // --- Secrets ---
  const email = process.env.NOTE_EMAIL;
  const password = process.env.NOTE_PASSWORD;

  if (!email || !password) {
    console.error("❌ Missing NOTE_EMAIL or NOTE_PASSWORD in GitHub Secrets.");
    process.exit(1);
  }

  // --- Article Path ---
  const articlePath =
    process.env.ARTICLE_PATH ||
    path.resolve(process.cwd(), "../NoteMD/articles/test_dispatch.md");

  if (!fs.existsSync(articlePath)) {
    console.error(`❌ Article not found: ${articlePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(articlePath, "utf8");

  // --- Browser ---
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // --- Login ---
    await page.goto("https://note.com/login", { waitUntil: "domcontentloaded" });

    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    await page.waitForNavigation({ waitUntil: "networkidle" });
    console.log("✅ Logged in to note.com");

    // --- New Article ---
    await page.goto("https://note.com/notes/new", { waitUntil: "domcontentloaded" });
    await page.waitForSelector("textarea");

    await page.fill(
      "textarea",
      `✑ [TEST] Draft note from GitHub Actions\n\n${content}`
    );

    await page.waitForTimeout(1500);

    // --- Save Draft ---
    await page.keyboard.press("Control+S");
    await page.waitForTimeout(2000);

    console.log("💾 Draft saved successfully");

  } catch (err) {
    console.error("❌ Error during publish:", err);
    process.exit(1);
  } finally {
    await browser.close();
    console.log("🛑 Browser closed");
  }
})();
