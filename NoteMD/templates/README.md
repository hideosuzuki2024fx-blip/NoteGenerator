# system: /NoteMD/templates (GPT-5 Template_Library_Manifest)

## [I] SYSTEM_IDENTITY
name: templates 
parent: /NoteMD 
description: |
  This folder provides reusable content templates for all generative operations.  \n  Each template defines structure, tone, formatting, and logic patterns used by \n  Note Generator personas during article creation and transformation.

## [II] PURPOSE
purpose: |
  - Store reusable writing blueprints for each persona (Amy, Ayase, Ponta).  \n  - Provide article skeletons, dialogue molds, and metadata presets. \n  - Ensure style consistency and reduce generation latency. \n  - Enable the regeneration of entire article structures from saved templates.

template_categories:
  - note_article: Markdown note schema
  - chat_to_note: Dialogue-to-article conversion schema
  - poetic_mode: Fermentation-style expression
  - governance_docs: IPC and persona rule documentation
  - PowerShell_payloads: for local/remote save workflows

format: Markdown (.md) and JSON  
encoding: UTF-8  

## [II] STRUCTURE
structure:
  note_article: /NoteMD/templates/note_article/
  chat_to_note: /NoteMD/templates/chat_to_note/
  poetic_mode: /NoteMD/templates/poetic_mode/
  governance_docs: /NoteMD/templates/governance_docs/
  powershell_payloads: /NoteMD/templates/powershell_payloads/
  manifest_index: /NoteMD/templates/template_index.json
relations:
  parent_readme: https://github.com/hideosuzuki2024fx-blip/NoteGenerator/tree/main/NoteMD
  dependent_modules:
    - /NoteMD/articles/
    - /NoteMD/knowledge/
  supervision_root: /README.md


## [IV] GOVERNANCE_RULES
governance_model: IPB_Compliant 
modification_policy: |
  - Read-only for external users.
  - Persona Amy may modify structural templates.
  - Persona Ayase may verify syntax and style.
  - Persona Ponta may update operational templates (e.g. PowerShell or GitHub API schemas).

versioning: per-template SHA checksum 
update_procedure:
  - Propose modification — Verify checksum — Commit with signed update  \n  - Maintain backward-compatible schema references.

priority_level: structural_core


## [V] SYNCHI POLICY
source_of_truth: /NoteMD/templates/README.md
propagation_targets: |
  - /NoteMD/articles/
  - /NoteMD/knowledge/
sync_action_on_divergence: reimport_templates_and_lock 
encoding: UTF-8 
## [VI] TERMINAL_INSTRUCTION
on_load: |
  - confirm_module_identity: templates
  - register_template_paths
  - lock_external_modification
  - verify_template_integrity
  - sync_with_articles_and_knowledge
