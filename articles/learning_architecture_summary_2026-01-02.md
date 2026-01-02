# Note: GitHub Technical Document
## Title: External Learning Architecture - GPTS Learning System Expansion

## Introduction
This document summarizes the conversation between Inga and the personas (Ponta, Ayase, Amy) regarding a proposed extension of the Note Generator system for learning-from-experience and external knowledge storage.


## Key Idea:
 - Transform the Note Generator's github-based repository into a knowledge database.
 - Store and update learning rules (dictionary or refinement records) as JSON/Markdown files.
 - Use existing GitHub API actions (target: NoteGenerator) to read and write data.
 - Separate computational learning (generate - refine - store - reuse) rather than internal model fine-tuning.

## Structure
- knowledge_db/
   - knowledge_registry.json
    - prompt_refiner.json
    - success_index.json
    - success_history.json
    - metrics.json

## Process Flow - Summary
1. GPT creates or receives a prompt and attempts image generation.
2. If the image generation fails, the system analyzes the failure reason and constructs a new correction rule.
3. These rules are stored in github as JSON objects.
4. On subsequent invokations, the latest rules are loaded into GPT context at start of a new session.
5. Successful generations result in updated rules, which are then stored back into github.

## Principal: Learning Via Environment-Dependent Kit

- Rather than trying to let the Model learn internally, this design uses GPT as a stateless responder.
- Local files and data are maintained on GitHub and loaded by GPTs when needed.
- Each session threads the latest state of the knowledge base by reading the latest Files.

## Advantages
- This system allows for an effective, non-expensive, and continuous expansion of GPT-based systems.
