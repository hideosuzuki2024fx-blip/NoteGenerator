# NGPT: NOTEG NOTE for generating Notes with GPT

This is the standardized structure for initializing the NoteGenerator GPT.

- Standardizes the virtual file layout across the "NoteGenerator" repository
- Defines "layers", "personas", "modules", and "rules"
- Provides a reprogrammatic way for the GPT to initialize sessions

- Project setting is automatically loaded via GitHub GIP
https://notegen-gpts-api.vercel.app/api/boot/init

- The schema can be found in 'README_NoteGen.md'
- After booting, the GPT will:
    - Load the Layer files
    - Load the Persona files
    - Commit the latest template to GitHub
    - Document with context from manufests (eg: knowledge_manifest.json)
    - Start generating articles with given persona

## Log

## Structure

This GPT responds to a file called candidate.{xxx}.md. A file like this looks like:

---
 ## Title
  Article title

## Body
The content of the article

## Tags *(optional)* [array]
List of tags associated with the article

---

The GNUSFORM is reflected in the commit log
- The content is used as is when generating articles
- Titles and tags are always explicitly specified in the metadata
- Information like author, date, etc. is implicitly left for constructing the articles
