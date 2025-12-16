# 💠 Voice Capsule Schema Reference (for GPT Systems)

This directory defines the structural, behavioral, and emotional mapping used in **Voice Capsule generation**  within the Note Generator persona system (Amy, Ayase, Ponta).

---

## 🐶 Schema Overview

| File | Description | Relation |
 |------|-----------------|
 | `voice_manifest_schema.json` | Defines the overall data structure for a voice capsule (metadata, speaker, content). | Root schema |
 | `voice_instruction_rules.json` | Defines how GPT should control tone, speed, and emotion during voice synthesis. | Behavior layer |
 | `tone_emotion_map.json` | Provides a mapping between emotions and corresponding modulation parameters. | Reference dictionary |

----

## 🐣 System Linkage

- `Amy` „> Emotive / poetic guidance layer
- `Ayase` „> Verification and tonal balance layer
- `Ponta` „> Execution, storage, and synchronization

Each persona uses these JSON files as lookup and validation references when interpreting or generating voice notes.

----

## 🐦 Integration Policy

- All schema files are UTF-8 encoded, versioned independently. 
- Any modification requires checksum synchronization (SHA retrieval before update).
- Direct PowerShell or external command executions are **disallowed** … API-based commits only.

---

¶ 2025 Note Generator Project / Hideo Suzuki