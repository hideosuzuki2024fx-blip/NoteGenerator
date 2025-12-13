import React from "react";
import PaperNoteStudio from "../PaperNoteStudio/PaperNoteStudio";

export default function NoteArticleStudio() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📰 Note Article Studio</h1>
      <p className="text-gray-600 mb-4">
        Note記事の本文を生成・調整し、Eドライブに保存できます。
      </p>
      <PaperNoteStudio />
    </div>
  );
}
