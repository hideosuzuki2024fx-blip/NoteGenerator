import express from "express";
import { spawn } from "child_process";
import path from "path";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const SAVE_SCRIPT = path.resolve("E:/CGPT_Project/NoteGenerator/Save_NoteGen_Functions.ps1");

app.post("/save", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "title と content が必要です" });
  }

  const ps = spawn("powershell.exe", [
    "-ExecutionPolicy", "Bypass",
    "-File", SAVE_SCRIPT,
    "-Title", title,
    "-Content", content,
  ]);

  let output = "";
  let error = "";

  ps.stdout.on("data", (data) => {
    output += data.toString("utf8");
  });

  ps.stderr.on("data", (data) => {
    error += data.toString("utf8");
  });

  ps.on("close", (code) => {
    if (code === 0) {
      console.log("✅ PowerShell完了:", output.trim());
      res.json({ success: true, log: output.trim() });
    } else {
      console.error("⚠️ PowerShellエラー:", error.trim());
      res.status(500).json({ error: error.trim() });
    }
  });
});

app.listen(5111, () => {
  console.log("🚀 NoteGen bridge サーバ稼働中: http://localhost:5111");
});
