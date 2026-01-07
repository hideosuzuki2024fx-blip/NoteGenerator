# GPT_BOOT (Canonical)

Purpose: give GPT a single, deterministic entrypoint for repo navigation and actions.

## Non-goals (do not do)
- Do NOT alter article bodies (Japanese content stays as-is).
- Do NOT invent API schemas; mark unknown and follow the observation plan.
- Avoid destructive renames/moves; use aliases or redirects if required.

## Read order (shortest path)
1. gpt/GPT_BOOT.md (this file)
2. gpt/GPT_ROUTER.md
3. gpt/ACTIONS_CATALOG.json
4. knowledge_manifest.json (canonical legacy manifest)
5. NoteMD/meta/entrypoints.json
6. NoteMD/meta/NAV.md

## Task shortcuts
- Repo structure overview: read knowledge_manifest.json → NoteMD/meta/entrypoints.json → NoteMD/meta/NAV.md
- Editing code/config: use GPT_ROUTER action map, then follow canonical write rules
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
  "canonical": ["gpt/GPT_BOOT.md"],
  "secondary": [
    "README.md",
    "README_index.md",
    "README_NoteGen.md",
    "knowledge_manifest.json",
    "NoteMD/meta/entrypoints.json",
    "NoteMD/meta/NAV.md"
  ]
}
```

```nav-paths
# Core GPT nav layer
# (one path per line)

# This file

gpt/GPT_BOOT.md

# Router + actions

gpt/GPT_ROUTER.md
gpt/ACTIONS_CATALOG.json
gpt/ACTIONS_SCHEMA_OBSERVATION.md
gpt/ACTIONS_OPERATIONID_PATCH.md

# Canonical legacy manifest + entrypoints

knowledge_manifest.json
NoteMD/meta/entrypoints.json
NoteMD/meta/NAV.md
NoteMD/meta/thread_state.md
NoteMD/meta/catalog.json
NoteMD/meta/taxonomy.json
NoteMD/config/init_context.json

# Validation

scripts/validate_nav.py
.github/workflows/validate_nav.yml
```
