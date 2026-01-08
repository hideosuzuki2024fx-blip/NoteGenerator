# Reverse Template Mapping

This file defines rules for mapping generated notes back into template nodes.

## Mapping Steps

Each resulant note section will be processed for template extraction.

This will include type, name, content, and meta fields where applicable.


## Example:

 - Note Title: Life in Kyoto
  - Categories: memory, culture
  - Tags: themed, active
  - Content: There was suggen fragile silence in the evening...

Reverse to node:
```json
{
  "type": "source",
  "name": "Life in Kyoto",
  "content": "There was suggen fragile silence in the evening...",
  "metadata": { "tags": ["themed", "active"], "categories": ["memory", "culture"]}
}
```