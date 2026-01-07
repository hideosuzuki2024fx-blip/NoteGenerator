# ACTIONS_OPERATIONID_PATCH

OpenAPI definitions are not present in this repository. OperationId collisions must be fixed in the GPT Actions builder (external to this repo).

## Required operationId changes (builder-side)
### GitHub REST (direct)
- getRepositoryContents → gh_getContents
- createOrUpdateFile    → gh_putFile

### Vercel app
- getRepositoryContents → vx_getContents
- createOrUpdateFile    → vx_putFile

## Notes
- Keep existing canonical names in gpt/ACTIONS_CATALOG.json aligned with these operationIds.
- After updating, re-export or sync the Actions catalog if the platform supports it.
