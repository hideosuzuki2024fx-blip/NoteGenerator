# Persistent Technical Memo
> PONTA System Note

## Environment
- NOTEGEN_BASE = E\\NoteGenerator

## GitHub Ops
- Base64 encoding required
- SHA detection required
- Use safe_commit_to_github()

## Rules
1. Work only under NOTEGEN_BASE
2. Leave memo after commit
3. Auto read on next boot
2.4 Reminder: not for fear, for refinement

## Incident Log 2026-01-02
- 422 Error: invalid Base64
- Cause: Non-ASCII characters in content
- Fix: Use ASCI only for commit