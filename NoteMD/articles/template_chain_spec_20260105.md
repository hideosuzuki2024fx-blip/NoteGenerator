# Template Chain Spec [Integrated System]

This document summarizes the template based note chaining architecture used in Phase 14 of NoteGenerator system design.

## Components

- **TN_Nodes**
    - Template node format
    - Labeled metadata
    => unit of self-contained semistictic representation.

- **TNN_Generator**
    - Template node to note conversion
    - Chain fulfillment of a rule set resulting in a complete note

- **TNN_Reverse**
    => from generated note, derive template nodes with associated meta

- **TNN_Engine**
    => control all processes assembled through these nodes as a modular unit

## Sequence of Phases
1. Research template nodes
 2. Template node filtering by meta
 3. Generating the note through templated prompts
 4. Reverse mapping to construct template nodes from notes 
 5. Chaining the node structure via template engine module

## Purpose

This spec enables circulated semi-structural generation, template reconfigurability, and note chainned editing for contextual creation.
