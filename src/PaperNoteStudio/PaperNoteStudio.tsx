import React from "react";
import { NoteEditor } from "./components/NoteEditor";
import { ActionBar } from "./components/ActionBar";
import { useNoteSession } from "./hooks/useNoteSession";

export default function PaperNoteStudio() {
  const { title, markdown, setTitle, setMarkdown, handleAIResponse, handleSave, isLoading } = useNoteSession();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">🪶 Paper Note Studio</h1>
      <NoteEditor title={title} setTitle={setTitle} markdown={markdown} setMarkdown={setMarkdown} />
      <ActionBar handleAIResponse={handleAIResponse} handleSave={handleSave} isLoading={isLoading} />
    </div>
  );
}
