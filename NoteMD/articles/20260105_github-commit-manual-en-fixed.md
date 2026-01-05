## 7. SHA / Base64 Stability Protocol (PONTA RULE)

This protocol defines a stable and verifiable method for committing files to GitHub  
without encoding corruption, mismatched SHAs, or Base64-related API errors.

---

### 1. Always retrieve the latest SHA before committing
- Use `GET /repos/{owner}/{repo}/contents/{path}` to obtain the **current** SHA.  
- Execute the commit only after fetching the latest reference.

### 2. Encode content with UTF-8 (without BOM) and Base64
- Do not include any BOM marker.  
- Avoid line breaks, padding artifacts, or irregular characters.  
- Output must be **strict RFC 4648-compliant Base64**, one-line only.

### 3. Never modify file between SHA fetch and commit
- Doing so will result in mismatched SHA errors.  
- Re-fetch SHA if there was any intermediate change.

### 4. Verify Base64 before commit
- Validate that the encoded string decodes back to the original source exactly.  
- Use multiple Base64 decoders to ensure reliability.

### 5. Special Characters & Emoji Exception
- 4-byte characters like emoji are allowed **only** if explicitly part of system persona specs.  
- Otherwise, restrict to ASCII-compatible characters.

### 6. Logging & Debug Mode
- Maintain logs of encoded content and SHAs used for each commit.  
- Enable detailed logging in debug/test phase.

### 7. Protocol Update Control
- If GitHub API changes behavior, this protocol must be reviewed and updated.  
- All persona and commit tools must reference the same updated rule.

---

#### Status Table
| Feature | Status | Detail |
|--------|--------|--------|
| GET sha | ✅ Working | Confirmed GET success with current SHA |
| Base64 encode | ✅ UTF-8 (no BOM), 1-line | Enforced and validated |
| sha at commit | ✅ Live SHA re-fetch required | Avoid stale SHA errors |
| commit success | ⏳ Under Testing | Awaiting confirmation |
