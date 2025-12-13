export async function saveToNoteGen(title, content) {
  const res = await fetch("http://localhost:5111/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  const data = await res.json();
  if (data.success) {
    alert("✅ NoteGenに保存完了！\\n" + data.log);
  } else {
    alert("⚠️ 保存失敗：" + data.error);
  }
}
