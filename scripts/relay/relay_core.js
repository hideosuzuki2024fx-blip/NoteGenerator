import fs from "fs";
import path from "path";

export async function generateRelayLog(trigger = "Manual Trigger") {
  const now = new Date().toISOString();
  const logsDir = "logs/relay";
  fs.mkdirSync(logsDir, { recursive: true });

  const logFile = path.join(logsDir, `relay_log_${now.replace(/[:.]/g, "-")}.txt`);
  const content = `🕓 ${now}\n🔖 Trigger: ${trigger}\n`;
  fs.writeFileSync(logFile, content, "utf8");

  console.log(`✅ Core generated: ${logFile}`);
  return logFile;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateRelayLog(process.argv[2] || "Test Trigger");
}
