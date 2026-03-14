const repoOwner = "hideosuzuki2024fx-blip";
const repoName = "NoteGenerator";
const articleDir = "NoteMD/articles";
const allowedPathPrefixes = ["NoteMD/"];

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

function isAllowedPath(path) {
  return allowedPathPrefixes.some((prefix) => path.startsWith(prefix));
}

async function fetchExistingFile({ apiUrl, githubToken }) {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `token ${githubToken}`,
      "User-Agent": "NoteGenerator-Vercel",
      Accept: "application/vnd.github+json",
    },
  });

  if (response.status === 404) {
    return { exists: false, sha: null };
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Failed to fetch existing file metadata: ${detail}`);
  }

  const data = await response.json();
  return { exists: true, sha: data.sha ?? null };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    title,
    content,
    path: requestedPath,
    message,
    sha: requestedSha,
    overwrite = true,
  } = req.body || {};

  if ((!title && !requestedPath) || !content) {
    return res.status(400).json({
      error: "Either title or path is required, and content must be provided",
    });
  }

  const githubToken = process.env.GITHUB_TOKEN || process.env.VERCEL_GIT_PROVIDER_TOKEN;
  if (!githubToken) {
    return res.status(500).json({ error: "Missing GitHub credentials" });
  }

  const path = requestedPath || buildArticlePath(title);
  if (!isAllowedPath(path)) {
    return res.status(400).json({
      error: "Path is not allowed",
      allowedPathPrefixes,
    });
  }

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`;

  try {
    const existing = await fetchExistingFile({ apiUrl, githubToken });
    if (existing.exists && !overwrite && !requestedSha) {
      return res.status(409).json({
        error: "File already exists",
        path,
        sha: existing.sha,
      });
    }

    const sha = requestedSha || existing.sha || undefined;
    const commitMessage =
      message ||
      (existing.exists ? `Update note: ${path}` : `Create note: ${title || path}`);

    const payload = {
      message: commitMessage,
      content: Buffer.from(String(content), "utf-8").toString("base64"),
      ...(sha ? { sha } : {}),
    };

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
      return res.status(resp.status).json({
        error: "GitHub commit failed",
        detail,
        path,
        attemptedMessage: commitMessage,
      });
    }

    const data = await resp.json();
    return res.status(200).json({
      success: true,
      operation: existing.exists ? "update" : "create",
      path: data.content?.path ?? path,
      sha: data.content?.sha ?? null,
      commitUrl: data.commit?.html_url ?? null,
      commitMessage,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error",
      detail: error instanceof Error ? error.message : String(error),
      path,
    });
  }
}
