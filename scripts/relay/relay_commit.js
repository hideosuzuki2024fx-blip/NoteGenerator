import { execSync } from "child_process";

try {
  execSync("git config user.name 'note-relay-bot'");
  execSync("git config user.email 'relay@local'");
  execSync("git add logs/relay");

  try {
    execSync("git commit -m '🔁 relay: auto commit from Git layer'");
    execSync("git push origin main");
    console.log("🚀 Relay Commit: Success");
  } catch {
    console.log("ℹ️ No new logs to commit.");
  }
} catch (err) {
  console.error("❌ Relay Commit Layer Error:", err);
  process.exit(1);
}
