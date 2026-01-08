# Template Rollback Resolution

This document outlines a design to resolve conflicts between competing rollback strategies and data priority levels.

Resolution mechanism includes:

 - Deterministic structures for precedences and conflict points
 - Auto-ranking and weighting of rollback options based on implication
 - Prioritization models that define critical criteria for updates