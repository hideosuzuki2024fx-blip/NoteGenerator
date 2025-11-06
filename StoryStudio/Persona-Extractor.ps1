function Persona-Extractor {
    param ([Parameter(Mandatory=$true)] $TextBody)

    $pattern = "(エイミー|綾瀬|ポンタ)[\s\S]*?(?=エイミー|綾瀬|ポンタ|$)"
    $matches = [regex]::Matches($TextBody, $pattern)

    $personas = @()
    foreach ($m in $matches) {
        $name = if ($m.Value -match "エイミー") {"エイミー"}
                elseif ($m.Value -match "綾瀬") {"綾瀬"}
                elseif ($m.Value -match "ポンタ") {"ポンタ"}
        $personas += [PSCustomObject]@{
            Name = $name
            Profile = ($m.Value -replace "`r?`n", " ").Trim()
        }
    }

    $path = "$PSScriptRoot\..\NoteMD\knowledge\registry\persona_registry.json"
    if (-not (Test-Path (Split-Path $path))) { New-Item -ItemType Directory -Path (Split-Path $path) | Out-Null }
    $json = $personas | ConvertTo-Json -Depth 3
    Set-Content -Path $path -Value $json -Encoding UTF8

    "✅ Persona extracted: $($personas.Count)" | Write-Host
}
