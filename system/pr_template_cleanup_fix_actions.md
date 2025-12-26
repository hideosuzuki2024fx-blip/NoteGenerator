# Pull Request: Cleanup .venv and Log Files, Convert Actions Push to PR

## Summary
This PR introduces repository hygiene and workflow safety improvements.

### 🧹 Repository Cleanup
- Removed tracked `.venv` directories and log files under `NoteMD/logs/`.
- Updated `.gitignore` to exclude `.venv/` and all `*.log` files.

### ⚙️ GitHub Actions Updates
- Replaced direct `git push origin main` commands with PR creation using `peter-evans/create-pull-request@v5`.
- Added branch naming conventions for automation:
  - `auto/sync-map-seed`
  - `auto/sync-directory-map`

### 🔒 Impact
- Prevents direct modifications to `main`.
- Ensures all CI/CD automation runs through PR review.
- Keeps repository size within GPT ingestion limits.

### ✅ Verification
- YAML syntax validated (2-space indentation uniform).
- No conflicts detected with `main` branch.

---

*Generated automatically by NoteGenerator GPT for Inga (因果さん).*
