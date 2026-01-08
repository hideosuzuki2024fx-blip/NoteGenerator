# Template Prompt Generation (Phase 14)

This file defines prompts to automatically generate notes from structured template nodes.

## Input: Knowledge Template Nodes 

- Structured JSON array with fields:
  - type
  - name
  - content
  - metadata

## Output:

- Generated Notes with delimited headers, content, and meta blocks
- Definition format:

      ## [Task type: [type]]
      # [Name: [name]
      [Content]

1. Example:
```json
{
 "nodes": [
   {
    "type": "source",
    "name": "Flash essay",
    "content": "Note from live memories...",
    "metadata": { "tags": ["personal", "draft"]}
  },
   {
    "type": "meta",
    "name": "Tagged as",
    "content": "[personal,themed]",
    "metadata": {"status": "active"}
  }
  ]
}
```

This prompt will be used for self-generation test and output validation.