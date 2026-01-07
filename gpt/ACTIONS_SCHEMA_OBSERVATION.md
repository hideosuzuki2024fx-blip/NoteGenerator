# ACTIONS_SCHEMA_OBSERVATION

OpenAPI/Swagger definitions were not found in this repository. Do not guess schemas.
Use this procedure to confirm request/response shapes safely.

## Observation procedure (minimal and safe)
1. Use the smallest possible request body with non-sensitive placeholder values.
2. Capture the full response payload and status code.
3. Record required fields, optional fields, and defaults.
4. Update gpt/ACTIONS_CATALOG.json with confirmed schemas.

## Endpoints to observe (once each)
### /api/github/list (vx_listRepoFiles)
- Capture: required query params, response shape for listing.

### /api/github/getRepositoryContents (vx_getContents)
- Capture: required params (owner/repo/path/ref?), response payload and encoding.

### /api/github/createOrUpdateFile (vx_putFile)
- Capture: required params, content encoding, response payload.

### /articles (vx_saveArticle)
- Capture: required fields for article creation and response payload.

## Fields to fill after observation
- request_schema (required, optional, default)
- response_shape (top-level fields, nested payload)
- failure modes (error codes + messages)
