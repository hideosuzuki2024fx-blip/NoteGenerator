<#
.SYNOPSIS
Note Generator - Markdown保存スクリプト（Eドライブ安定版）
#>

param (
    [Parameter(Mandatory = $true)]
    [string]$Title,

    [Parameter(Mandatory = $true)]
    [string]$Content
)

# ===== ベースディレクトリ設定 =====
$baseDir = "E:\CGPT_Project\NoteGenerator\NoteMD"
$articleDir = Join-Path $baseDir "articles"

if (!(Test-Path $articleDir)) {
    New-Item -Path $articleDir -ItemType Directory | Out-Null
}

# ===== ファイル名生成 =====
$slug = $Title -replace '\s+', '-' -replace '[^\w\-]', ''
$date = Get-Date -Format "yyyyMMdd"
$fileName = "${date}_${slug}.md"
$filePath = Join-Path $articleDir $fileName

# ===== 書き込み =====
Set-Content -Path $filePath -Value $Content -Encoding UTF8

# ===== ログ出力 =====
Write-Host "✅ 保存完了: $filePath"
