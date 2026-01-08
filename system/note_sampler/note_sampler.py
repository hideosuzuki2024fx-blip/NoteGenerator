import asyncio, csv, time, re
from datetime import datetime
from pathlib import Path
import pandas as pd
from playwright.async_api import async_playwright

TARGET_URL   = "https://note.com/latest"
DURATION_SEC = 300
INTERVAL_SEC = 20
OUT_DIR      = r"C:\Users\MaoGon\OneDrive\デスクトップ\CGPT_Project\NoteGenerator\NoteMD\logs\note_sampler"

def parse_like(text: str):
    if not text: return None
    m = re.search(r"(?:スキ|♡|いいね)[^0-9]*([0-9,]+)", text)
    if m: return int(m.group(1).replace(",", ""))
    return None

def detect_paid(text: str):
    if not text: return False
    return bool(re.search(r"(有料|¥|月額|購読)", text))

async def get_inner_text_safe(element):
    try:
        # shadow-root 内を考慮し、inner_text() を安全に取得
        text = await element.inner_text()
        if text.strip():
            return text.strip()
    except:
        pass
    try:
        # Shadow DOM に潜って innerHTML 取得を試みる
        html = await element.evaluate("(el) => el.shadowRoot ? el.shadowRoot.innerText : ''")
        if html.strip():
            return html.strip()
    except:
        return ""
    return ""

async def snapshot(page, writer, seen):
    await page.goto(TARGET_URL, timeout=60000)
    await page.wait_for_selector("a[href*='note.com']", timeout=20000)
    await page.evaluate("window.scrollBy(0, document.body.scrollHeight)")
    await page.wait_for_timeout(4000)

    items = await page.locator("div:has(a[href*='note.com'])").all()
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    for it in items[:100]:
        title, href = "", ""
        try:
            for sel in ["h2", "h3", "a[title]"]:
                if await it.locator(sel).count() > 0:
                    title = await get_inner_text_safe(it.locator(sel).first)
                    if title: break
        except:
            pass

        try:
            href = await it.locator("a[href*='note.com']").first.get_attribute("href")
        except:
            pass
        if not href or "note.com" not in href:
            continue

        try:
            meta_text = await get_inner_text_safe(it)
        except:
            meta_text = ""

        likes = parse_like(meta_text)
        paid  = detect_paid(meta_text)
        key = (href, title)
        if key in seen:
            continue
        seen.add(key)
        writer.writerow([now, href, title.strip() if title else "", "", likes if likes else "", "有料" if paid else "無料"])

async def main():
    Path(OUT_DIR).mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d-%H%M")
    out_csv = Path(OUT_DIR) / f"sample_{stamp}.csv"

    seen = set()
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["captured_at","url","title","author","likes_guess","payment"])
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            ctx = await browser.new_context(locale="ja-JP")
            page = await ctx.new_page()
            t0 = time.time()
            while time.time() - t0 < DURATION_SEC:
                await snapshot(page, writer, seen)
                await page.wait_for_timeout(INTERVAL_SEC * 1000)
            await browser.close()

    df = pd.read_csv(out_csv)
    df = df.drop_duplicates(subset=["url"])
    df.to_csv(out_csv, index=False, encoding="utf-8")
    print(f"✅ Data collected: {out_csv}")

if __name__ == "__main__":
    asyncio.run(main())
