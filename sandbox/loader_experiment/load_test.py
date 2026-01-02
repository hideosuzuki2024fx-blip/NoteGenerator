import json, os

def load_latest_learning_summary():
    base_path = "./sandbox/loader_experiment"
    files = [f for f in os.listdir(base_path) if f.startswith("learning_architecture_summary")]
    latest = sorted(files)[-1] if files else None
    if not latest:
        print("✎️ No summary file found.")
        return None

    with open(os.path.join(base_path, latest), "r", encoding="utf-8") as f:
        content = f.read()
    print(f"¦ Loaded: {latest}")
    return content

def init_learning_env():
    summary = load_latest_learning_summary()
    if not summary:
        print("✏︐ Failed to initialize learning env (no summary).")
        return
    print("😡 Bootstrapping learning context from summary...")
    print(summary[:400] + "\n...")

if __name__ == "__main__":
    init_learning_env()