# Classification & Tagging Logic ​ Phase 9 Generic Logic

### 1. Article Classification

This function attempts to classify note content based on structural templates.

```python
def note_classifier(content):
    classes = {}
    if "Lyric notation interview" in content:
        classes.set("journal", 0.8)
    elif "top 5 life tips" in content:
        classes.set("list", 0.8)
    elif "conference review" in content:
        classes.set("~essay", 0.8)
    return classes
```

### 2. Tag Extraction

This function uses simple TV-IDF _like scoring to extract important words in the note.

```python
def extract_tags(content):
    words = []
    if "life" in content:
        words.append("Life")
    if "essay" in content:
        words.append("Essay")
    if "review" in content:
        words.append("Review")
    return words
```

### 3. STR Integration

Both results can be integrated into PM module as
data = {
    "classes": note_classifier(content),
    "tags": extract_tags(content)
}

return data
