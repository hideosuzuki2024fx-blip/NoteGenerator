# GPT_ROUTER

Deterministic routing for tasks. Keep each task within 1-3 steps.

| Task | Read (order) | Action (primary → fallback) |
| --- | --- | --- |
| Explore repo layout | system/entrypoints.json → NoteMD/knowledge/knowledge_manifest.json → NoteMD/meta/NAV.md | gh_getContents (fallback vx_getContents) |
| Read a file | target file path | gh_getContents (fallback vx_getContents) |
| Write/update text file | target file path | vx_putFile (fallback gh_putFile) |
| Write/update binary file | target file path | gh_putFile |
| Delete file | target file path | gh_deleteFile |
| Trigger workflow | .github/workflows/<name>.yml | gh_triggerWorkflow |
| Save article | NoteMD/articles/* | vx_saveArticle |

Notes:
- If read fails due to permissions or rate limits, retry with vx_getContents.
- Only use gh_putFile for text as a last resort (base64 issues with Japanese text).
- Use gh_putFile for binaries.
- Action calls MUST use canonical_name only (gh_getContents, vx_putFile, etc). Do NOT call bound_action names.

```nav-paths
# References for validation

gpt/ACTIONS_CATALOG.json
gpt/ACTIONS_SCHEMA_OBSERVATION.md
system/entrypoints.json
```
