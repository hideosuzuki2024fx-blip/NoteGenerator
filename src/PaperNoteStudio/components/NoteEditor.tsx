import React from "react";
import Markdown from "react-markdown";

export function NoteEditor({ title, setTitle, markdown, setMarkdown }) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="タイトルを入力..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full h-64 border p-2 rounded font-mono"
        placeholder="本文を入力..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <div className="border p-4 bg-gray-50 rounded">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}
