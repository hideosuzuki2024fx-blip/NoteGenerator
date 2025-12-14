import fs from "fs";
import path from "path";
import { execSync } from "child_process";

(async () => {
  try {
    const now = new Date().toISOString();
    const logsDir = "logs";
    const logFile = path.join(logsDir, "relay_log_.txt");

    fs.mkdirSync(logsDir, { recursive: true });

    let message = "📡 Relay test executed successfully.";
    if (fs.existsSync("relay_trigger.txt")) {
      message = fs.readFileSync("relay_trigger.txt", "utf8").trim();
    }

    const logContent = `🕓 ${now}\n\n${message}\n`;
    fs.writeFileSync(logFile, logContent, "utf8");
    console.log(`✅ Relay logged message to ${logFile}`);

    // Git config & commit/push
    execSync("git config user.name 'note-relay-bot'");
    execSync("git config user.email 'relay@local'");
    execSync("git add logs/");

    try {
      execSync(`git commit -m "🔁 relay: ${message.replace(/"/g, '\\"')}"`, { stdio: "pipe" });
      execSync("git push origin main", { stdio: "inherit" });
      console.log("🚀 Relay committed and pushed successfully.");
    } catch (gitErr) {
      console.log("ℹ️ No changes to commit or git push failed:", gitErr.message);
    }
  } catch (err) {
    console.error("⚠️ Fatal error in relay:", err);
    process.exit(1);
  }
})();
