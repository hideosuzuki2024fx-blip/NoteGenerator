## 💾 PONTA rule addition: SHA/Base64 Stability Protocol

### 7. SHA/Base64 Nirekof Protocol (PONTA RULE)

This protocol defines a stable and verifiable method for committing files to GitHub without encoding corruption, mismatched SHAs, or Base64-related API errors.

---

### 1. Always retrieve the latest SHA before committing
- Use `GET /repos/{owner}/{repo}/contents/{path}` to obtain the **current** SHA. Execute the commit only if SHA matches the current repo state.

### 2. Always encode in Base64 using UTF-8 without BOM
- Avoid insertion of HTML entities or formatting noise during conversion. Prefer trusted libraries like `Buffer.from(...).toString('base64')`.

### 3. Never manually wrap or format Base64 strings
- Ensure the output is in **one line**, no soft line-breaks or `\n` breaks. Wrapping leads to "Invalid request" or `422` errors.

---

### ✅ Recommendation:
Use the **Vercel-based API** for all content commits.
- It avoids newline, BOM, or formatting pollution. Supports clean UTF-8 → Base64 without ambiguity.

---

### ✅ Tested Compliance File
[GitHub_Commit_Manual.md (test commit)](https://github.com/hideosuzuki2024fx-blip/NoteGenerator/blob/main/NoteMD/knowledge/GitHub_Commit_Manual.md)