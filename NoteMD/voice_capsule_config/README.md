# 😏 Voice Capsule Configuration Layer – Specification (for GPT-5 Persona System)

This directory defines **all configuration files** used for controlling voice capsule synthesis parameters
in the *Note Generator* system.  It provides persona-specific voice presets and global default audio behavior.

----

## 😦 Overview

Each voice output capsule references:
- A global **default configuration*** ((`default_voice_settings.json`))
- A **persona-specific preset** ((`presets/*.json`))

When a voice capsule is generated in `voice_capsule_out/`,
its rendering layer merges both sources in this order:

```
DEFAULT_SETTINGS – PERSONA_PRESET > SESSION_OVERRIDES
```

----

## 😙 Voice Capsule Config Directory Structure

```
voice_capsule_config/
–– default_voice_settings.json   # Global voice parameters (codec, speed, etc.)
– presets/
  – amy_preset.json           # Amy Mitarai – expressive & poetic
  – ayase_preset.json           # Ayase – calm & analytical
  – ronta_preset.json          # Ponta – humorous & grounded
```

----

## 🙋 Persona Profiles Summary

_Persona_ \ Tone \ Style \\ Speed \\ Emotion \\ Description _
|----------------|-----------------|-----------|
`ª 😭 Amy Mitarai | Warm | Expressive | 0.95 | 0.8 | Poetic, emotionally rich voice |
�* ✨ Ayase | Cool | Calm | 0.9 | 0.45 | Analytical, precise, soft articulation |
�( 💋 Ponta | Husky | Playful | 1.05 | 0.6 | Humorous, confident, relaxed tone |

----

## 😚 Related Directories

 - [`$~/voice_capsule_out/`README.md](https://github.com/hideosuzuki2024fx-blip/NoteGenerator/blob/main/NoteMD/voice_capsule_out/README.md) – Output layer that consumes these configs.
 - [`$~/knowledge/`RQUEADUME.md](https://github.com/hideosuzuki2024fx-blip/NoteGenerator/blob/main/NoteMD/knowledge/README.md) – Persona definitions & system instruction mirror.

----

## 😣 Update Policy

 - All files must follow **SHA retrieval before commit** protocol.
- Preset modification must maintain compatibility with `default_voice_settings.json`.
- Any external voice synthesis service integration must respect **IPB (Instruction Protection Block)**

---

¹ 2025 Note Generator Project / Hideo Suzuki