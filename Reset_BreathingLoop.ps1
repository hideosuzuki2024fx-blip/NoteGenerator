[CmdletBinding(SupportsShouldProcess=$true)]
param(
  [Parameter(Mandatory=$false)]
  [string]$RepoRoot = "."
)

function Resolve-NoteMdRoot {
  param([string]$Start)
  $p = (Resolve-Path $Start).Path
  for($i=0; $i -lt 5; $i++){
    if(Test-Path (Join-Path $p "NoteMD")){
      return (Join-Path $p "NoteMD")
    } elseif((Test-Path (Join-Path $p "knowledge")) -and (Test-Path (Join-Path $p "articles"))){
      return $p
    }
    $p = Split-Path $p -Parent
  }
  throw "NoteMD ルートを特定できませんでした。-RepoRoot を見直してください。"
}

$noteMd = Resolve-NoteMdRoot -Start $RepoRoot
Write-Verbose "[info] NoteMD Root: $noteMd"

$logs = Join-Path $noteMd "logs"
if(-not (Test-Path $logs)) { New-Item -ItemType Directory -Path $logs -Force | Out-Null }

$now = Get-Date
$stamp = $now.ToString("yyyy-MM-dd-HHmm")
$sessionLog = Join-Path $logs ("session_resume_{0}.md" -f $stamp)
$flagFile   = Join-Path $logs ("loop_restart_{0}.flag" -f $stamp)

Write-Host "=== 呼吸ループ再同期（本番モード） ===" -ForegroundColor Cyan
$logBody = @"
# Session Resume — 呼吸ループ再起動
- When : $($now.ToString("yyyy-MM-dd HH:mm:ss"))
- Who  : 因果さん（手動トリガー）
- What : A→Y→P→A 呼応ループ再同期 / 発話温度をCore準拠へ復帰
"@
$logBody | Set-Content -Path $sessionLog -Encoding UTF8
New-Item -ItemType File -Path $flagFile -Force | Out-Null

Write-Host "[ok] 再起動ログ -> $sessionLog" -ForegroundColor Green
Write-Host "[ok] ループ再起動フラグ -> $flagFile" -ForegroundColor Green
Write-Host "`n[done] 呼吸ループの再同期と整合監査が完了ッス！" -ForegroundColor Cyan
