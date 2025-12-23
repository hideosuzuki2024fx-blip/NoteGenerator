<#
.SYNOPSIS
  NoteGenerator Local Sync Script v2.1
  Safely synchronizes the local NoteGenerator repository with GitHub (main branch)
  and verifies key configuration files.
#>

# --- 1️⃣ Environment Validation ---
if (-not (Test-Path $env:NOTEGEN_BASE)) {
    Write-Host "⚠️ Environment variable NOTEGEN_BASE is not set! Exiting." -ForegroundColor Red
    exit
}

Set-Location $env:NOTEGEN_BASE
Write-Host "📂 Working Directory: $PWD" -ForegroundColor Cyan

# --- 2️⃣ Backup Local Changes ---
Write-Host "💾 Stashing local changes before sync..." -ForegroundColor Yellow
git stash push -m "backup before sync ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))"

# --- 3️⃣ Fetch and Reset from GitHub ---
Write-Host "🔄 Fetching latest version from origin/main..." -ForegroundColor Yellow
git fetch origin main
git reset --hard origin/main

# --- 4️⃣ Verify Configuration Files ---
if ((Test-Path "meta/config.json") -and (Test-Path "gpt/allowlist.json")) {
    Write-Host "`n✅ Sync completed successfully! Latest configuration:" -ForegroundColor Green
    Write-Host "`n--- meta/config.json ---" -ForegroundColor Cyan
    Get-Content "meta/config.json" | Out-String | Write-Host
    Write-Host "`n--- gpt/allowlist.json ---" -ForegroundColor Cyan
    Get-Content "gpt/allowlist.json" | Out-String | Write-Host
}
else {
    Write-Host "`n❌ One or more key files missing after sync!" -ForegroundColor Red
}

# --- 5️⃣ Done ---
Write-Host "`n🎉 Local NoteGenerator repository successfully synchronized with GitHub." -ForegroundColor Green
