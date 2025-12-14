import fs from "fs";
import { execSync } from "child_process";

const now = new Date().toISOString();
const logFile = logs/relay_log_.txt;

fs.mkdirSync("logs", { recursive: true });

let message = "📡 Relay test executed successfully.";
if (fs.existsSync("relay_trigger.txt")) {
  message = fs.readFileSync("relay_trigger.txt", "utf8").trim();
}

const logContent = 🕓 \n\n;
fs.writeFileSync(logFile, logContent, "utf8");

console.log(✅ Relay logged message to );

try {
  execSync("git config user.name 'note-relay-bot'");
  execSync("git config user.email 'relay@local'");
  execSync("git add logs/");
  execSync(git commit -m '🔁 relay: ');
  execSync("git push origin main");
  console.log("🚀 Relay committed and pushed successfully.");
} catch (err) {
  console.error("⚠️ Relay commit failed:", err.message);
}
