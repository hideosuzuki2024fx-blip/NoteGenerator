function Set-NoteGenBase {
  param([Parameter(Mandatory)][string]$Path)
  $full = [IO.Path]::GetFullPath($Path)
  if (-not (Test-Path $full)) { New-Item -ItemType Directory -Path $full | Out-Null }
  $env:NOTEGEN_BASE = $full
  Write-Host ("NOTEGEN_BASE = {0}" -f $full)
}

function Get-NoteGenBase {
  if (-not $env:NOTEGEN_BASE -or -not (Test-Path $env:NOTEGEN_BASE)) {
    $default = "C:\Users\MaoGon\OneDrive\デスクトップ\CGPT_Project\NoteGenerator\NoteMD"
    $dir = Read-Host -Prompt ("保存ベースを入力（未入力なら既定）→ " + $default)
    if ([string]::IsNullOrWhiteSpace($dir)) { $dir = $default }
    Set-NoteGenBase -Path $dir
  }
  return [IO.Path]::GetFullPath($env:NOTEGEN_BASE)
}

function Save-NoteGenFile {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory)][string]$RelativePath,
    [Parameter(Mandatory)][string]$Content,
    [switch]$AskPath
  )
  $base = Get-NoteGenBase
  if ($AskPath) {
    $tmp = Read-Host -Prompt ("相対パスを確認/変更 → 現在 " + $RelativePath)
    if (-not [string]::IsNullOrWhiteSpace($tmp)) { $RelativePath = $tmp }
  }
  $target = [IO.Path]::GetFullPath((Join-Path $base $RelativePath))
  if ($target -notlike ($base + "*")) {
    throw ("保存拒否：ベース配下以外には書き込めません。 base={0} target={1}" -f $base,$target)
  }
  $dir = Split-Path -Parent $target
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  Set-Content -Path $target -Value $Content -Encoding UTF8
  Write-Host ("保存しました → {0}" -f $target)
}
