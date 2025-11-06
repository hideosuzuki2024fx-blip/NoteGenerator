. "$PSScriptRoot\Read-OriginFile.ps1"
. "$PSScriptRoot\Persona-Extractor.ps1"

function Initialize-StoryStudio {
    param ([string]$BasePath = "$PSScriptRoot\..")

    Write-Host "🧩 StoryStudio initialized. Base: $BasePath"

    $origin = Read-OriginFile -TargetPath $BasePath -Keyword "ネタ"
    if ($origin) {
        Persona-Extractor -TextBody $origin.TextBody
        Write-Host "✨ キャラデータ抽出完了"
    }
    else {
        Write-Warning "⚠️ オリジンテキストが見つかりません。"
    }
}
