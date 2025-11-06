# === make_collector_script.ps1 ===
Write-Host "☕💩 Creating collect_knowledge_for_upload.ps1 ..."
$targetFolder = "C:\Users\MaoGon\OneDrive\デスクトップ\CGPT_Project\NoteGenerator\StoryStudio\_collected_for_upload"
$scriptPath   = Join-Path $targetFolder "collect_knowledge_for_upload.ps1"

if (-not (Test-Path $targetFolder)) {
    New-Item -ItemType Directory -Force -Path $targetFolder | Out-Null
}

$scriptContent = "# Hello from inside! (確認用)"

Set-Content -Path $scriptPath -Value $scriptContent -Encoding UTF8
Write-Host "✅ Collector script created at: $scriptPath"
