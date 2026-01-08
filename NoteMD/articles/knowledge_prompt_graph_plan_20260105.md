# Phase 10 クスンリークイル

NoteGenerator in Phase 10 seeks to leverage the recently classified note articles by building a note-network knowledge graph.

### 1. Note as Graph Node

1. Extract the structural elements of note content (sections, titles, tags) as nodes.
2. Refresh details when tags change and article classes are updated.
3. Maintain node-id based unique hash id or UUID and timestamp.
4. References: ori:article:debug as edges.
### 2. Extend graph with Edges

- Use classes to connect nodes with relations indicating similarity,
common themes, or articles sharing specific tags.
- Use labeled edges to capture contextual repatition.

### 3. Prompt Template Generation

- Use the graph schema to select hub of nodes, then generate a partial filled prompt using node keywords
- These prompts can initiate an attempt at new articles

### 4. Context Retrieval

- Provide an interface for GPT to access past classified articles from the graph
- Extract combined nodes by tag or class, then present as auxiliary content
prompt: "Please write a new article about [class/keyword]. Style it in the same tone."
