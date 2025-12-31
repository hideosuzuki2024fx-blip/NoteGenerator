import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, mode = "article", author = "因果" } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  const now = new Date().toISOString();
  const slug = prompt.replace(/\s+/g, "-").toLowerCase();
  const draft = `# ${prompt}\n\n雪の下で眠る微生物たちは、静かに世界を耕している。...`;

  const response = {
    schema_version: "notegen.v1",
    request_id: `req_${now.replace(/[-:.TZ]/g, "")}`,
    summary: "Draft generated successfully",
    metadata: {
      title: prompt,
      slug,
      created_at: now,
      author,
      mode,
      lang: "ja"
    },
    tags: ["発酵", "冬", "創作過程", "時間"],
    actions: [
      { type: "confirm_apply_canvas", default: true },
      { type: "confirm_commit_github", default: false }
    ],
    files: [
      {
        path: `NoteMD/articles/${now.slice(0,10).replace(/-/g,"")}_${slug}.md`,
        language: "markdown",
        encoding: "utf-8",
        content: draft
      }
    ],
    patches: [],
    constraints: {
      allowed_path_prefixes: ["NoteMD/"],
      max_files: 5,
      max_total_chars: 400000
    },
    warnings: [],
    errors: []
  };

  return res.status(200).json(response);
}
