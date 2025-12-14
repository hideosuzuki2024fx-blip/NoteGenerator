// relay.js — GitHub Pages Relay Bridge
async function main() {
  const params = new URLSearchParams(window.location.search);
  const message = params.get("message") || "No message received";

  const logArea = document.body.appendChild(document.createElement("pre"));
  logArea.textContent = `Message received: "${message}"`;

  // ✅ GitHub REST APIへ書き込み（Relay Bridge）
  if (message !== "No message received") {
    const owner = "hideosuzuki2024fx-blip";
    const repo = "NoteGenerator";
    const path = `logs/relay/relay_log_${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;
    const content = btoa(`🕓 ${new Date().toISOString()}\n${message}\n`);

    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer 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`,
          "Accept": "application/vnd.github+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `🛰️ relay: ${message}`,
          content: content
        })
      });

      const data = await res.json();
      if (res.ok) {
        logArea.textContent += `\n✅ Pushed to GitHub: ${data.content.path}`;
      } else {
        logArea.textContent += `\n⚠️ GitHub API error: ${data.message}`;
      }
    } catch (err) {
      logArea.textContent += `\n❌ Network error: ${err.message}`;
    }
  }
}

main();
