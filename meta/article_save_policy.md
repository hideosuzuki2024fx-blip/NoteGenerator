---
title: Article Save Policy
tags: [save, policy, vercel, github]
---

# Article Save Policy

## Purpose
This policy defines the supported write path for markdown article content handled by NoteGenerator.

## Allowed Write Surface
- Writable article content must stay under `NoteMD/articles/`
- `meta/`, `system/`, and other non-article directories are not valid Vercel save targets

## Supported Save Flow
1. GPTs prepares title, content, and optional target path.
2. The deployed Vercel endpoint receives the payload.
3. The endpoint fetches the latest GitHub SHA when the file already exists.
4. The endpoint encodes content as UTF-8 Base64 and writes to GitHub.

## Active Endpoint Rules
- Do not use localhost bridge endpoints in production
- Use the currently deployed Vercel API endpoint for article saves
- Direct GitHub writes from GPTs are not trusted for Base64 or SHA-sensitive updates

## Request Contract
- Required: `content` and either `title` or `path`
- Optional: `message`, `sha`, `overwrite`

## Safety Rules
- Default writable scope is `NoteMD/`
- Existing files must use the latest SHA for updates
- Reject paths outside the allowed writable prefixes
- Return explicit error payloads for credential, path, and GitHub API failures
