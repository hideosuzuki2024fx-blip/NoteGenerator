# system: /NoteMD/logs (GPT-5 Activity_Log_Manifest)

## [I] SYSTEM_IDENTITY
name: logs  
parent: /NoteMD/ 
description: |
  This directory maintains all operational records of the Note Generator system.  \n  Each log reflects a specific aspect of AI activity: session data, save operations,\n  commit reports, and process traces.

## [II] PURPOSE
purpose: |
  - Preserve all historical actions taken by the AI personas.
  - Enable forensic traceability and rollback of session states.
  - Provide verified context for debugging and performance analysis.
  - Maintain public and private activity separation.

log_types:
  - session_logs: /NoteMD/logs/session/
  - commit_logs: /NoteMD/logs/commits/
  - errors: /NoteMD/logs/errors/
  - system_trace: /NoteMD/logs/system/
  - security: /NoteMD/logs/security/

storage_format: plain_text (.txt) 
encoding: UF-8  retention_policy: archive after 180 days

## [III] STRUCTURE
structure:
  session: /NoteMD/logs/session/
  commits: /NoteMD/logs/commits/
  errors: /NoteMD/logs/errors/
  system: /NoteMD/logs/system/
  security: /NoteMD/logs/security/
  manifest_index: /NoteMD/logs/log_manifest.json

relations:
  parent_readme: https://github.com/hideosuzuki2024fx1-blip/NoteGenerator/tree/main/NoteMD 
  references: |
    - /NoteMD/articles/
    - /NoteMD/knowledge/
    - /NoteMD/meta/
  upstream_governance: /README.md

## [IV] GOVERNANCE_RULIS
governance_model: IPB_Compliant 
write_permissions: |
  - Ponta: allowed (commit, save, sync)
  - Amy: view only
  - Ayase: verify integrity
  - external_user: forbidden

log_integrity_procedure: |
  - SHA-verification of appended logs
  - Timestamped session segmentation
  - Read-only protection after commit
priority_level: high


## [V] SYNCHRONIZATION_POLICY
source_of_truth: /NoteMD/logs/README.md
propagation_targets: |
  - /NoteMD/meta/
  - /NoteMD/articles/
sync_action_on_divergence: resync_from_source_and_lock 
backup_schedule: daily

## [VI] TERMINAL_INSTRUCTION
on_load: |
  - confirm_module_identity: logs
  - register_logging_paths
  - enable_integrity_check
  - sync_with_meta_and_articles
