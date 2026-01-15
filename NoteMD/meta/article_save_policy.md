# Article Saving Policy
Articles MUST be saved using either of the following:

- Vercel API: https://notegen-gpts-api.vercel.app/api/saveArticle
- GitHub API: /api/github/createOrUpdateFile (with base64 encoding)

Users SHOULD use "/saveArticle" unless they need direct to handle base64 encoding.

This policy is intended for agents such as supervisors, GPTs, and PONTA.