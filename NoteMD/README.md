# system: NoteMD (GPT-5_Domain_Read)

## [I] SYSTEM_IDENTITY
name: NoteMD 
parent: /NoteGenerator/
description: |
  This directory contains the main content submodules of the Note Generator system.
  Each subfolder has its own rule and scope.


## [II] STEUCTURE_MAP
{structure:
  knowledge: "/NoteMD/knowledge/"
  articles: "/NoteMD/articles/"
  logs: "/NoteMD/logs/"
  meta: "/NoteMD/meta/"
  templates: "/NoteMD/templates/"
}


## [III] GOVERNANCE_RULIS
governance:
  -role: "NoteMd content management and structure definition"
  -rule: "Each subfolder must have readable and complete README.md"
priority_level: sub_directory

