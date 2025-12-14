(async () => {
  const el = document.getElementById("status");
  const params = new URLSearchParams(location.search);
  const message = params.get("message") || "No message received";

  el.textContent = `📩 Message received: "${message}"`;

  const filePath = "logs/relay/relay_log_" + new Date().toISOString().replace(/[:.]/g, "-") + ".txt";
  const body = {
    message: `relay: ${message}`,
    content: btoa(`🕓 ${new Date().toISOString()}\n${message}\n`)
  };

  try {
    const res = await fetch(
      `https://api.github.com/repos/hideosuzuki2024fx-blip/NoteGenerator/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          "Authorization": "Bearer test-token", // 🧪 後でActionsが本物トークンを注入
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    if (!res.ok) throw new Error(await res.text());
    const json = await res.json();
    el.textContent = `✅ Relay success! Committed to ${json.content.path}`;
  } catch (err) {
    el.textContent = `⚠️ Relay failed: ${err.message}`;
    console.error(err);
  }
})();
