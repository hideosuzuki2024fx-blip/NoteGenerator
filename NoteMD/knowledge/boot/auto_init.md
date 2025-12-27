## 🛠️ GPT自動初期化手順（auto_boot）

このドキュメントは、NoteジェネレーターのGPTが起動した際に、
自動でペルソナ・世界観・対話構造をロードするための初期化構成を定義するものです。

---

### 📘 参照ファイル

#### 🔹 `entrypoints.json`

```json
{
  "boot_sequence": [
    "NoteMD/knowledge/LayerA_WorldContext.md",
    "NoteMD/knowledge/LayerB_Personas.md",
    "NoteMD/knowledge/LayerC_DialogueOrchestration.md",
    "NoteMD/knowledge/Interaction_Core.md"
  ],
  "personas_path": "NoteMD/knowledge/personas/"
}
```

#### 🔹 `NAV.md`

* GPT Initialization セクションが `entrypoints.json` に対応。
* ペルソナ・Layerファイルを順序通り記述。

---

### ⚙️ 自動初期化処理 `auto_boot()` 概要

```python
def auto_boot():
    boot_order = load_json("entrypoints.json")["boot_sequence"]
    for file_path in boot_order:
        content = load_markdown_from_repo(file_path)
        apply_knowledge(content)

    persona_dir = load_json("entrypoints.json")["personas_path"]
    for persona_file in list_files(persona_dir):
        content = load_markdown_from_repo(persona_file)
        register_persona(content)
```

* Layer構造・ペルソナは逐次読み込み
* 読み込み順と構文依存のため順序厳守

---

### 🧩 出力調整（Interaction_Coreより）

```markdown
## Output Prefix Rules
- Amy: 🥰
- Ayase: 💞
- Ponta: 💩
```

---

### 📍設置場所

* `NoteMD/knowledge/boot/auto_init.md`

---

### ✅ この初期化が完了すると？

* GPTが起動直後に **完全整備済み状態**（ペルソナ適用・レイヤー構造・出力prefix）で始動可能。
* 手動ロード不要。
* 対話冒頭からトーン・口調・装飾が適切に反映。
