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
    try {
      await saveToNoteGen(title, markdown);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      alert(`⚠️ 保存失敗: ${message}`);
    }
  }

  return { title, markdown, setTitle, setMarkdown, handleAIResponse, handleSave, isLoading };
}
