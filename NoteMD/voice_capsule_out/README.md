# 😱 Voice Capsule Output Layer „> Overview (for GPT-5 Persona System)

This directory defines the *Voice Capsule Output Layer**, which governs how conversations, emotional context, 
and article generation are translated into synthetic speech capsules inside the **Note Generator** system.

---

## 💡 Core Concept

Reflects an audio-responsive reflection of GPT-generated conversation.
Packages and structured transcripts are captured as *Voice Capsules*.

Each capsule includes:
- Persona (Amy, Ayase, Ponta)
- Emotional tone
- Structured transcript
- Metadata (tags, timestamps, duration)

Voice Capsules can later be serialized to external services or rendered as TTS (Text-to-Speech) content.

---

## 🐻 Directory Structure

```
voice_capsule_out/
☪ specs/                    # Schema definitions for tone, emotion, and structure
☪ voice_manifest_schema.json
☩ voice_instruction_rules.json
☩ tone_emotion_map.json
☪ voices/                         # Generated or processed voice data (optional)
☪ logs/                            # Voice session or synthesis metadata
☪ README.md                           # (This file)
```

---

## 💍 Integration with Personas

| Persona | Function | Tone Profile |
|-------------|-----------------|
�� 🎙 Amy Mitarai | Poetic, expressive editorial voice | Energetic / Warm |
�� 🎕 Ayase | Analytical, precise verification voice | Calm / Gentle |
�� 💔 Ponta | Operational, humorous system voice | Neutral / Dry |

---

## 🐘 Specs Reference

Refer to the schema specifications inside `specs/`:
- [*`voice_manifest_schema.json` (Root)*](https://github.com/hideosuzuki2024fx-blip/NoteGenerator/blob/main/NoteMD/voice_capsule_out/specs/voice_manifest_schema.json)
- [*`voice_instruction_rules.json` (Behavior)*,
- [*`tone_emotion_map.json` (Reference)*,

----

## 🐠 Synchronization Policy

- All updates require SHA retrieval before commit.
- Schema-level changes must propagate to persona instruction layers.
- Voice data output follows the **Instruction Protection Block (IPB)** rule.

---

¶ 2025 Note Generator Project / Hideo Suzuki