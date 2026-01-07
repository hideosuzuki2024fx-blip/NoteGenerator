#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

RAW_URL_RE = re.compile(r"https://raw.githubusercontent.com/[^/]+/[^/]+/main/(?P<path>[^\s)]+)")
CONTENTS_URL_RE = re.compile(r"https://api.github.com/repos/[^/]+/[^/]+/contents(?P<path>/[^?\s)]+)?")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def extract_code_block(markdown: str, fence: str) -> list[str]:
    pattern = re.compile(rf"```{re.escape(fence)}\n(.*?)\n```", re.DOTALL)
    blocks = pattern.findall(markdown)
    return blocks


def extract_nav_paths(markdown: str) -> list[str]:
    paths: list[str] = []
    for block in extract_code_block(markdown, "nav-paths"):
        for line in block.splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue
            paths.append(stripped)
    return paths


def extract_nav_entrypoints(markdown: str) -> dict:
    blocks = extract_code_block(markdown, "nav-entrypoints")
    if not blocks:
        return {}
    if len(blocks) > 1:
        raise ValueError("Multiple nav-entrypoints blocks found")
    return json.loads(blocks[0])


def path_from_raw_url(url: str) -> str | None:
    match = RAW_URL_RE.search(url)
    if not match:
        return None
    return match.group("path")


def path_from_contents_url(url: str) -> str | None:
    match = CONTENTS_URL_RE.search(url)
    if not match:
        return None
    path = match.group("path") or ""
    return path.lstrip("/")


def ensure_exists(rel_path: str, origin: str, errors: list[str]) -> None:
    target = ROOT / rel_path
    if not target.exists():
        errors.append(f"Missing path referenced from {origin}: {rel_path}")


def validate_manifest(errors: list[str]) -> None:
    manifest_path = ROOT / "knowledge_manifest.json"
    data = json.loads(read_text(manifest_path))

    for key, url in data.get("raw", {}).items():
        rel = path_from_raw_url(url)
        if not rel:
            errors.append(f"Unparseable raw URL in knowledge_manifest.json: {key} -> {url}")
            continue
        ensure_exists(rel, "knowledge_manifest.json raw", errors)

    for key, url in data.get("listing_api", {}).items():
        rel = path_from_contents_url(url)
        if rel is None:
            errors.append(f"Unparseable listing_api URL in knowledge_manifest.json: {key} -> {url}")
            continue
        if rel:
            ensure_exists(rel, "knowledge_manifest.json listing_api", errors)


def validate_entrypoints(errors: list[str]) -> None:
    entry_path = ROOT / "NoteMD/meta/entrypoints.json"
    data = json.loads(read_text(entry_path))

    meta = data.get("meta", {})
    for key, url in meta.items():
        rel = path_from_raw_url(url)
        if not rel:
            errors.append(f"Unparseable raw URL in entrypoints.json: {key} -> {url}")
            continue
        ensure_exists(rel, "NoteMD/meta/entrypoints.json meta", errors)

    modules = data.get("modules", {})
    for module_name, module in modules.items():
        for field in ("readme_path", "machine_index_path", "catalog_path"):
            rel = module.get(field)
            if not rel:
                continue
            ensure_exists(rel, f"NoteMD/meta/entrypoints.json modules.{module_name}.{field}", errors)


def validate_nav_md(errors: list[str]) -> None:
    nav_path = ROOT / "NoteMD/meta/NAV.md"
    content = read_text(nav_path)
    for url in RAW_URL_RE.findall(content):
        ensure_exists(url, "NoteMD/meta/NAV.md raw", errors)
    for match in CONTENTS_URL_RE.finditer(content):
        rel = (match.group("path") or "").lstrip("/")
        if rel:
            ensure_exists(rel, "NoteMD/meta/NAV.md listing", errors)


def validate_actions_catalog(errors: list[str]) -> None:
    catalog_path = ROOT / "gpt/ACTIONS_CATALOG.json"
    data = json.loads(read_text(catalog_path))
    entries = data.get("entries", [])
    seen = set()
    for entry in entries:
        name = entry.get("canonical_name")
        if not name:
            errors.append("ACTIONS_CATALOG.json entry missing canonical_name")
            continue
        if name in seen:
            errors.append(f"Duplicate canonical_name in ACTIONS_CATALOG.json: {name}")
        seen.add(name)


def validate_gpt_nav(errors: list[str]) -> None:
    boot_path = ROOT / "gpt/GPT_BOOT.md"
    router_path = ROOT / "gpt/GPT_ROUTER.md"

    boot_md = read_text(boot_path)
    router_md = read_text(router_path)

    nav_paths = extract_nav_paths(boot_md) + extract_nav_paths(router_md)
    for rel in nav_paths:
        ensure_exists(rel, "nav-paths block", errors)

    entrypoints = extract_nav_entrypoints(boot_md)
    canonical = entrypoints.get("canonical", [])
    secondary = set(entrypoints.get("secondary", []))

    if not canonical:
        errors.append("No canonical entrypoint defined in GPT_BOOT.md")
    elif len(canonical) != 1:
        errors.append("Multiple canonical entrypoints defined in GPT_BOOT.md")
    else:
        canon = canonical[0]
        ensure_exists(canon, "nav-entrypoints canonical", errors)
        if canon in secondary:
            errors.append("Canonical entrypoint is also listed as secondary")

    for rel in secondary:
        ensure_exists(rel, "nav-entrypoints secondary", errors)


def main() -> int:
    errors: list[str] = []

    validate_gpt_nav(errors)
    validate_actions_catalog(errors)
    validate_manifest(errors)
    validate_entrypoints(errors)
    validate_nav_md(errors)

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("validate_nav: OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
