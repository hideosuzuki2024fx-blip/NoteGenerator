# ===========================================
# Save_EditorialStudio_Functions.ps1
# 編集部ストーリー工房 専用保存スクリプト
# ===========================================

function Save-EditorialCard {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Slug,
        [Parameter(Mandatory = $true)]
        [string]$Content
    )

    $date = Get-Date -Format "yyyy-MM-dd"
    $baseDir = "C:\Users\MaoGon\OneDrive\デスクトップ\CGPT_Project\NoteGenerator\NoteMD\cards"
    $dir = Join-Path $baseDir "$date-$Slug"

    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Host "📂 Created directory: $dir"
    }

    $file = Join-Path $dir "$Slug.md"
    $Content | Out-File -FilePath $file -Encoding utf8
    Write-Host "✅ Saved editorial card to: $file"
}

function Save-ContextVersion {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ContextFile,   # 現行 context テキストファイル（.txt / .md）
        [Parameter(Mandatory = $true)]
        [string]$NoteMDPath     # NoteMD ルートパス
    )
    if (-not (Test-Path $ContextFile)) {
        throw "ContextFile が見つかりません: $ContextFile"
    }
    if (-not (Test-Path $NoteMDPath)) {
        throw "NoteMDPath が見つかりません: $NoteMDPath"
    }

    $Stamp   = (Get-Date).ToString("yyyy-MM-dd-HHmm")
    $DestDir = Join-Path $NoteMDPath "knowledge\context_versions"
    if (-not (Test-Path $DestDir)) { New-Item -ItemType Directory -Path $DestDir -Force | Out-Null }

    $DestName = "context_editorialstudio_$Stamp.md"
    $DestPath = Join-Path $DestDir $DestName

    Copy-Item $ContextFile $DestPath -Force

    Write-Host "✅ Contextバージョンを保存しました:"
    Write-Host "📁 $DestPath"
}

