# Knowledge Template Nodes

This file defines the structured node types and their reuseable format to enable circular knowledge generation.

## Node Types

1. SourceNode
- Type: input
- Content: the primary contribution, e.g. note text or source

- Metadata:
  - origin: filename/note_id
  - tags: [domain, subject]

2. MetaNode
- Type: meta
- Content: structured tags and category info

- Metadata:
  - source: referred SourceNode or output
  - status: active/refreshed

#3. TaskNode
- Type: task
- Content: structured editing-or test-oriented plan
metadata:
  - derived:from meta node
  - status: completed/requires revisit

## Format Template

Each node type follows this generic structure:

    [[Type::task_TYPE]]
    Name: [named_task]
    Content:
        ...

In future, a parsing module can reconstruct note sequences using these node types.