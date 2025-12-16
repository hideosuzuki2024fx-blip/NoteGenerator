# system: /NoteMD/knowledge (GPT-5 Domain_Knowledge_Manifest)

## [I] SYSTEM_IDENTITY
name: knowledge
parent: /NoteMD/ 
description: |
  This folder defines the immutable knowledge layer of the Note Generator system.
  It contains persona definitions, behavioral rules, fixed instruction sets,
  and cognitive constraints required for GPT operations.

## [II) PURPOSE
purpose: |
  - Store canonical information describing all persistent personas and roles.
  - Maintain the rules of the Instruction Protection Block (IPB).
  - Provide referential guidance for other modules.
  - Prevent unauthorized modification or deletion of behavioral constants.

modification_policy:
  - Human edits are prohibited.
  - Only authorized AI personas may reference this directory.
  - Any change must be validated and re-signed by the repository maintainer.

## [IIS] STRUCTURE
structure:
  personas: /NoteMD/knowledge/personas/
  rules: /NoteMD/knowledge/rules/
  constants: /NoteMD/knowledge/constants/
  memory_map: /NoteMD/knowledge/memory_map.json

relations:
  parent_readme: https://github.com/hideosuzuki2024fx1-blip/NoteGenerator/tree/main/NoteMD
  sibling_folders:
    - articles
    - logs
    - meta
    - templates
  governing_root: https://github.com/hideosuzuki2024fx1-blip/NoteGenerator/blob/main/README.md

## [IV] GOVERNANCE_RULES
  governance_model: IPB_Compliant
  output_format: YAML_Markdown
  access_policy:
    read: AI_personas_only
    write: forbidden
    delete: forbidden

  audit_procedure:
    - Verify file integrity on each commit.
    - Reject external write attempts.
    - Log unauthorized access in /NoteMD/logs/security.log.

  priority_level: critical

## [V] SYNCHI POLICY
source_of_truth: /NoteMD/knowledge/README.md
propagation_targets:
  - /NoteMD/articles/
  - /NoteMD/logs/
  - /NoteMD/meta/
sync_action_on_divergence: halt_and_request_human_verification
encoding: UF-8  

## [VI)] TERMINAL_INSTRUCTION
on_load:
  - confirm_module_identity: knowledge
  - lock_write_operations
  - register_rules_in_context
  - propagate_persona_definitions_to_memory
