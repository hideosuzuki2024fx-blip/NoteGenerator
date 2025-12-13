<#
.SYNOPSIS
Note Generator 保存経路を Eドライブ版に統一するスクリプト
.DESCRIPTION
CドライブやOneDrive経路を使用していた Note Generator の全設定ファイルを
E:\CGPT_Project\NoteGenerator\NoteMD ベースに修正します。
#>

$repoRoot = "E:\CGPT_Project\NoteGenerator"
$newBase = "E:\\CGPT_Project\\NoteGenerator\\NoteMD"

# 1️⃣ directory_map.json の書き換え
$dirMapPath = Join-Path $repoRoot "directory_map.json"
if (Test-Path $dirMapPath) {
    $json = Get-Content $dirMapPath -Raw | ConvertFrom-Json
    $json.base = $newBase
    $json | ConvertTo-Json -Depth 5 | Set-Content -Path $dirMapPath -Encoding UTF8
    Write-Host "✅ directory_map.json を更新しました → $newBase"
} else {
    Write-Host "⚠️ directory_map.json が見つかりませんでした。"
}

# 2️⃣ README_NoteGen.md の書き換え
$readmePath = Join-Path $repoRoot "README_NoteGen.md"
if (Test-Path $readmePath) {
    (Get-Content $readmePath -Raw) -replace "C:\\\\Users\\\\MaoGon\\\\OneDrive\\\\デスクトップ\\\\CGPT_Project\\\\NoteGenerator\\\\NoteMD", $newBase |
        Set-Content -Path $readmePath -Encoding UTF8
    Write-Host "✅ README_NoteGen.md の記載パスを更新しました。"
} else {
    Write-Host "⚠️ README_NoteGen.md が見つかりませんでした。"
}

# 3️⃣ Save_NoteGen_Functions.ps1 の上書き
$saveFuncPath = Join-Path $repoRoot "Save_NoteGen_Functions.ps1"
$saveFuncCode = @"
param (
    [Parameter(Mandatory = \$true)]
    [string]\$Title,
    [Parameter(Mandatory = \$true)]
    [string]\$Content
)
\$baseDir = "E:\CGPT_Project\NoteGenerator\NoteMD"
\$articleDir = Join-Path \$baseDir "articles"
if (!(Test-Path \$articleDir)) { New-Item -Path \$articleDir -ItemType Directory | Out-Null }
\$slug = \$Title -replace '\s+', '-' -replace '[^\w\-]', ''
\$date = Get-Date -Format "yyyyMMdd"
\$fileName = "\${date}_\${slug}.md"
\$filePath = Join-Path \$articleDir \$fileName
Set-Content -Path \$filePath -Value \$Content -Encoding UTF8
Write-Host "✅ 保存完了: \$filePath"
"@
Set-Content -Path $saveFuncPath -Value $saveFuncCode -Encoding UTF8
Write-Host "✅ Save_NoteGen_Functions.ps1 をEドライブ仕様に書き換えました。"

Write-Host "`n🎉 全ファイルの経路を Eドライブ基準に統一しました！"
Write-Host "基準パス: $newBase"
