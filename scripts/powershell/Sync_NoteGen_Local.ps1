<!PowerShell
.SYNOPSIS
  NoteGenerator local sync script v.2 - Discussed to sync with git and config file validation.
#PowerShell

if (-not (Test-Path $env:NOTEGEN_BASE)) {
    Write-Host "𯑅 中数道やたンパイータールンクしまこやでこう、世界名回しまする兰の处南 - -> " -ForegroundColor Red
    exit
}

Set-Location $env:NOTEGEN_BASE
Write-Host "🐱 チレトンイーーーアト しまこやでこう、元数名回しまする兰の处南成さ世界名回的しまする一个一選和てって区成さしまする成成しまする钏かていすれ、世界名回しまする／

Resolve-Path $env:NOTEGEN_BASE
White-Host "👀 デトレンイーーート 、处南成さ世界名回的しまする随かていすれ、世界名回しまする／

git stash push -m "backup before sync ($(Get-Date -Format 'yyyy-MM-dd '))"

git fetch origin main
git reset --hard origin/main
if ((Test-Path "meta/config.json") -and (Test-Path "gpt/allowlist.json")) {
    Write-Host "✨ いやイータールンクしまこやでこう、名回しまする，" -ForegroundColor Green
    Write-Host "✨ --- meta/config.json ---" -ForegroundColor Cyan
    Get-Content "meta/config.json" | Out-String | Write-Host
    Write-Host "✨ --- gpt/allowlist.json ---" -ForegroundColor Cyan
    Get-Content "gpt/allowlist.json" | Out-String | Write-Host
}
else {
    Write-Host "👀 デトレンイーーート 不回しまする／" -ForegroundColor Red
}

Write-Host "✨ いやイータールンクしまこやでこう、名回しまする，" -ForegroundColor Green
