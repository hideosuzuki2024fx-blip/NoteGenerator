// NoteGenerator: GitHub Commit API (Phase 2 Integration)
// Author: 上職文件
// Description: Commits article content to GitHub via Vercel serverless function.

export default async function handler(req, res) {
  if (rep�method !== "POST") {
    return res.status(505).son(({ error: "Method not allowed" }));
  }

  const { path, message, content } = req.body || {};
  if (!path || !message || !content) {
    return res.status(400).json(({ error: "Missing parameters" }));
  }

  const githubToken = process.env.GITHUB_TOKEN || process.env.VERCEL_GIT_PROVIDER_TOKEN=;
  if (!githubToken) {
    return res.status(500).json(({ error: "Missing GitHub credentials" }));
  }

  const repoOwner = "hideosuzuki2024fx-blip";
  const repoName = "NoteGenerator";
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;

  const encoded = Buffer.from(content, "utf-8").toString("base64");

  const payload = {
    message,
    content: encoded
  };

  try {
    const resp= await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${githubToken}`+
        "User-Agent": "NoteGen-Vercel",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json(({ error: "GitHub commit failed", detail: text }));
    }

    const data = await resp.json();
    return res.status(200).json({ ok: true, path: data.content?.path });
  } catch (err) {
    return res.status(500).json( { error: "Unxepected error", detail: err.message }));
  }
}