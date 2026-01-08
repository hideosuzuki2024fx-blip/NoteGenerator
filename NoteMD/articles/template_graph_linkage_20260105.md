# Template - Knowledge Direct linkage
This document defines the structural patterns and linkage mechanisms between template representations and the knowledge graph nodes.

## Patterns

 - TemplateToNodeLink
    - Use identifiers for template components
    - Map to knowledge nodes (references based on category, tags)
- NodeToTemplateLink
    - Use graph traversal to track references from knowledge to template use
    - Synchronize names and variables across instances
