This update modifies GitHub Actions workflows (`relay.yml`, `sync_map.yml`) to follow a safer pattern using pull requests instead of direct pushes to `main`. It includes:

- Refactor of `.github/workflows/relay.yml` to use `peter-evans/create-pull-request@v5`
- Same update applied to `.github/workflows/sync_map.yml`
- `.gitignore` updated to exclude `.venv/`, `*.log`, etc.
- Removed accidentally committed files like `NoteMD/logs/note_sampler/.venv`

All changes are staged to trigger a pull request automatically instead of pushing directly to `main`.