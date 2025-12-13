import { useState } from "react";
import { saveToNoteGen } from "../lib/noteBridge";

export function useNoteSession() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAIResponse() {
    setIsLoading(true);
    try {
      // AI生成処理（仮）
      const response = "これはAIが生成したサンプル本文です。";
      setMarkdown(markdown + "\\n" + response);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    await saveToNoteGen(title, markdown);
  }

  return { title, markdown, setTitle, setMarkdown, handleAIResponse, handleSave, isLoading };
}
