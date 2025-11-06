function Read-OriginFile {
    param (
        [Parameter(Mandatory=$true)] [string]$TargetPath,
        [string]$Keyword = "ネタ"
    )

    $files = Get-ChildItem -Path $TargetPath -Filter "*.txt" -Recurse |
             Where-Object { $_.Name -match $Keyword } |
             Sort-Object LastWriteTime -Descending

    if (-not $files) {
        Write-Warning "❌ No origin text found."
        return $null
    }

    $target = $files[0]
    $content = Get-Content $target.FullName -Raw -Encoding UTF8

    $logDir = "$PSScriptRoot\logs"
    if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
    Add-Content "$logDir\load_history_$(Get-Date -Format yyyyMMdd-HHmm).md" "📖 Loaded $($target.Name)"

    [PSCustomObject]@{
        FileName = $target.Name
        FilePath = $target.FullName
        TextBody = $content
    }
}
