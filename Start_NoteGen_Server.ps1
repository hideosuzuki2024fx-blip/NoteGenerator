# ============================================================
# Note Generator - Bridgeサーバ自動起動＆制御スクリプト
# ============================================================

$repoRoot = "E:\CGPT_Project\NoteGenerator"
$bridgeDir = Join-Path $repoRoot "bridge"
$serverPath = Join-Path $bridgeDir "bridge.js"
$pidFile = Join-Path $bridgeDir "bridge.pid"

if (!(Test-Path $serverPath)) {
    Write-Host "⚠️ bridge.js が見つかりません。"
    exit
}

function Start-Bridge {
    Write-Host "🚀 Node bridge サーバを起動します..."
    $proc = Start-Process "node" -ArgumentList "`"$serverPath`"" -PassThru -WindowStyle Hidden
    $proc.Id | Out-File -FilePath $pidFile -Encoding ascii
    Write-Host "✅ Bridge起動完了 (PID=$($proc.Id))"
    Start-Sleep 2
    Write-Host "🌐 http://localhost:5111 で待受中..."
}

function Stop-Bridge {
    if (Test-Path $pidFile) {
        $pid = Get-Content $pidFile
        try {
            Stop-Process -Id $pid -Force
            Write-Host "🛑 Bridgeサーバ (PID=$pid) を停止しました。"
        } catch {
            Write-Host "⚠️ Bridgeサーバ (PID=$pid) は既に終了しています。"
        }
        Remove-Item $pidFile -Force
    } else {
        Write-Host "⚠️ PIDファイルが見つかりません。Bridgeは起動していない可能性があります。"
    }
}

switch ($args[0]) {
    "start" { Start-Bridge }
    "stop"  { Stop-Bridge }
    default {
        Write-Host "💡 使用方法:"
        Write-Host "   .\\Start_NoteGen_Server.ps1 start   # Bridge起動"
        Write-Host "   .\\Start_NoteGen_Server.ps1 stop    # Bridge停止"
    }
}
