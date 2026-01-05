# Prompt Expansion Test Structure ‌ Phase 13

This file outlines the test structure for validating self-generated prompts and their effectiveness.

### 1. Test Cases

- Select a random prompt from the self generated prompts directory
- Simulate a user input as if a user were continuing the session.
 - Run the prompt generation with this input.

### 2. Evaluation Criteria

- Compare the output to expected patterns or style.
- Score the relevance of context with a suitable metric (e.g., cos6), using the reference article.
- Identify whether the generation was actually influenced by the previous prompt.

- Mark success and tailure cases.

### 3. Recursion Attempt

- Rerun a subsequent test using the latest prompt sequence from the self log.
- Check for overfitting or misalignment when the context is too similar.

- Verify the output against the rule definitions.

### 4. Automation Logic

- Provide a self-evaluation loop that updates the prompt templates.
 - Store successful trials as seeds for future generation.
