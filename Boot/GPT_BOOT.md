# GPT_BOOT (Canonical)

Purpose: give GPT a single, deterministic entrypoint for repo navigation and actions.

## Non-goals (do not do)
- Do NOT alter article bodies (Japanese content stays as-is).
- Do NOT invent API schemas; mark unknown and follow the observation plan.
- Avoid destructive renames/moves; use aliases or redirects if required.

## Read order (shortest path)
1. Boot/GPT_BOOT.md (this file)
2. system/entrypoints.json (single source of truth for canonical paths)
3. gpt/GPT_ROUTER.md
4. gpt/ACTIONS_CATALOG.json
5. NoteMD/knowledge/knowledge_manifest.json
6. NoteMD/meta/NAV.md

## Task shortcuts
- Repo structure overview: system/entrypoints.json → NoteMD/knowledge/knowledge_manifest.json → NoteMD/meta/NAV.md
- Editing code/config: use gpt/GPT_ROUTER.md action map, then follow canonical write rules
- Actions schema uncertainty: use gpt/ACTIONS_SCHEMA_OBSERVATION.md

## Actions routing (fixed)
- Read files: gh_getContents → fallback vx_getContents
- Write text files (.md/.json/.yml/.ts/.py/.ps1/etc): vx_putFile → fallback gh_putFile
- Write binaries (.png/.jpg/.zip/.pdf/etc): gh_putFile
- Delete: gh_deleteFile
- Workflow: gh_triggerWorkflow
- Article save: vx_saveArticle

## Notes on unknown schemas
- /api/* and /articles request/response schemas are currently unknown.
- Do not guess. Use gpt/ACTIONS_SCHEMA_OBSERVATION.md to confirm later.

```nav-entrypoints
{
  "canonical": ["Boot/GPT_BOOT.md"],
  "secondary": [
    "system/entrypoints.json",
    "gpt/GPT_ROUTER.md",
    "gpt/ACTIONS_CATALOG.json",
    "NoteMD/knowledge/knowledge_manifest.json",
    "NoteMD/meta/NAV.md"
  ]
}
