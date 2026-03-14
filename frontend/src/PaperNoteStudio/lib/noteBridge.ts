export async function saveToNoteGen(title: string, content: string) {
  const response = await fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.detail || data.error || "Failed to save note");
  }

  const location = data.path ? `\n${data.path}` : "";
  alert(`✅ NoteGenに保存完了しました${location}`);
  return data;
}
