# Template Meta Extraction Test
This document specifies test cases to verify the extraction of meta-model structures from template nodes and their semantic keys.

## Test Steps

- Input: Template node json
- Process: Parse meta structure, extract key schema
- Output: Flattened list of meta-keys with values and types

## Test Considerations

- Variable fields and types appear throughout node-type recognition
- Ed-cases and special rules for variant labels
