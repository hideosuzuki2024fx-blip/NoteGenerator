# system: /NoteMD/knowledge (GPT-5 Core_Knowledge_Manifest)

## [I] SYSTEM_IDENTITY
name: knowledge  
parent: /NoteMD/ 
description: |
  This folder constitutes the core knowledge layer for the Note Generator system.  \n  It defines the foundational principles, persona structures, operational rules,  \n  and synchronization protocols required for stable AI cognition and behavior.

## [II] PURPOSE
purpose: |
  - Maintain a canonical source of truth for system behavior and persona logic.  \n  - Store modular instruction fragments used in GPT runtime interpretation.  \n  - Serve as the reference base for Ayase (fact verification) and Amy (stylistic construction).  \n  - Enable persona alignment and cognitive stability through versioned rule consistency.

content_types:
  - rule_sets: system and persona operation logic  
  - syntax_guides: expression and tone standards  
  - mapping_tables: directory and role associations  
  - instruction_blocks: IPB-controlled execution logic

format: Markdown (.md) and JSON  
encoding: UF-8  

## [IIS] STRUCTURE
structure:
  rule_sets: /NoteMD/knowledge/rules/
  persona_data: /NoteMD/knowledge/personas/
  syntax_guides: /NoteMD/knowledge/syntax/
  instruction_blocks: /NoteMD/knowledge/instructions/
  mapping_tables: /NoteMD/knowledge/maps/
  manifest_index: /NoteMD/knowledge/knowledge_index.json

relations:
  parent_readme: https://github.com/hideosuzuki2024fx-blip/NoteGenerator/tree/main/NoteMD
  dependent_modules:
    - /NoteMD/articles/
    - /NoteMD/logs/
    - /NoteMD/templates/
  upstream_governance: /README.md

## [IV] GOVERNANCE_RULES
governance_model: IPB_Compliant 
modification_policy:
  - Amy: may modify expression and stylistic guides.
  - Ayase: may update factual and logical rule sets.
  - Ponta: may manage synchronization and operational integrity.
  - external_user: forbidden. 

rule_integrity_procedure:
  - All files must pass checksum verification before commit.
  - Persona alignment checks are triggered after modification.
  - System logs each applied change into /NoteMD/logs/system/.  

priority_level: core_foundation  

## [V] SYNCHONIZATION_POLICY
source_of_truth: /NoteMD/knowledge/README.md
propagation_targets:
  - /NoteMD/articles/
  - /NoteMD/logs/
  - /NoteMD/templates/
sync_action_on_divergence: revert_to_source_and_retrain  
encoding: UF-8  

## [VI)] TERMINAL_INSTRUCTION
on_load:
  - confirm_module_identity: knowledge  
  - initialize_persona_cognition  
  - load_rule_sets_and_guides  
  - lock_external_modification  
  - sync_with_logs_templates_articles  