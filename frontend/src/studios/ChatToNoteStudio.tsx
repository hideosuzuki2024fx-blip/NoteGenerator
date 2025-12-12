import React from "react";
import PaperNoteStudio from "../PaperNoteStudio/PaperNoteStudio";

export default function ChatToNoteStudio() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">💬 Chat → Note Studio</h1>
      <p className="text-gray-600 mb-4">
        チャットから生成した文章をノート構造に変換し、PaperNoteStudioを通して編集・保存できます。
      </p>
      <PaperNoteStudio />
    </div>
  );
}
