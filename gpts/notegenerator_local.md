# NoteGenerator Local Rules (v0)
- scope: NoteGenerator only
- PowerShell: allowed. When asked, output ONE self-contained script.
  - Script MUST start with: Set-Location "E:\ai_dev_core"
  - Script MUST include: git rev-parse --show-toplevel and git rev-parse --is-inside-work-tree
  - Script MUST end with: git add + meaningful git commit
  - Script MUST NOT include: git push
- If unsure: say "不明" / "この情報からは判断できません"
