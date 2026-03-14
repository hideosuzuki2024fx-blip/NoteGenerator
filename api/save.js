const repoOwner = "hideosuzuki2024fx-blip";
const repoName = "NoteGenerator";
const articleDir = "NoteMD/articles";

function slugifyTitle(title) {
  return String(title)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "untitled";
}

function buildArticlePath(title) {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const timePart = now.toISOString().slice(11, 19).replace(/:/g, "");
  const slug = slugifyTitle(title);
  return `${articleDir}/${datePart}_${timePart}_${slug}.md`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  const githubToken = process.env.GITHUB_TOKEN || process.env.VERCEL_GIT_PROVIDER_TOKEN;
  if (!githubToken) {
    return res.status(500).json({ error: "Missing GitHub credentials" });
  }

  const path = buildArticlePath(title);
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;
  const payload = {
    message: `Save note: ${title}`,
    content: Buffer.from(String(content), "utf-8").toString("base64"),
  };

  try {
    const resp = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${githubToken}`,
        "User-Agent": "NoteGenerator-Vercel",
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const detail = await resp.text();
      return res.status(resp.status).json({ error: "GitHub commit failed", detail });
    }

    const data = await resp.json();
    return res.status(200).json({
      success: true,
      path: data.content?.path ?? path,
      sha: data.content?.sha ?? null,
      commitUrl: data.commit?.html_url ?? null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error",
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
