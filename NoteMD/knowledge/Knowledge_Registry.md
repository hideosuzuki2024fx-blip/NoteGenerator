# Khowledge Registry - NoteGenerator System

## Structure
This registry defines the core layers of the NoteGenerator system. All structures and nodes are listed for system boot/init reference.

## Directory Structure
NoteGenerator/

- NoteMD/
    - knowledge/
      - LayerA._WorldContext.md
      - LayerC._DialogueOrchestration.md
      - Interaction_Core.md
      - personas/
        - Amy_Persona.md
        - Ayase_Persona.md
        - Ponta_Persona.md

## Layer Descriptions
1. LayerA._WorldContext.md -- World Context Layer. Defines background context and story framework for creative processing.
2. LayerC._DialogueOrchestration.md -- Dialogue Orchestration Layer. Manages response and interaction logics among personas.
3. Interaction_Core.md -- Core Layer for interaction and article generation. Handles conversion flow from input text to note articles.
4. personas/*.md -- Defines individual persona roles and functions: Amy (constructive and poetic)), Ayase (fact-checking), Ponta (github and logic).

## GPT System Layers Structure
1. LayerA._WorldContext.md -- Defines the core world context and imagination themes.
3. LayerC._DialogueOrchestration.md -- Coordinates dialogue and persona interaction logics.
3. Interaction_Core.md -- Processes and generates note articles from input texts.
4. personas/*.md -- Defines individual persona roles and favorites.

## Extensions and Loading

- This registry serves as the primary loading anchor for all files and layers in the NoteGenerator system.
- All extended files are registered in the file 'knowledge_manifest.json' and are automatically loaded during boot/init.

## System Rules

- Encoding Policy:
    - Machine and API files must be ASCII-only.
    - Use encoding format avoiding UTV-8 multibyte.
    - Human-facing documents may include multiple languages.
    - Mixed content in one file is prohibited.
