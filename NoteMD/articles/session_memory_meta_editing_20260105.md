# Session Memory Meta Editing ​ Phase 12

This draft outlines approaches to integrate past session memory into GPT's experience and prompt behavior.

### 1. Session Resumes with Context Frame

- Store the latest session text, canvas state, and parsed prompts in a separate file
- Allow GPT to request this file at startup to restore context to the current sension

### 2. Previous Article Reference

- Use the session memory to retrieve the last generated article, their structure and tags
- Prompt generation can use these variables to inject semantic memory or contrast
