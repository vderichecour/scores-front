#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGING="$ROOT/.gandi-deploy"

rm -rf "$STAGING"
mkdir -p "$STAGING/htdocs"

cp -R "$ROOT/dist/client/." "$STAGING/htdocs/"
cp "$ROOT/deploy/htdocs/.htaccess" "$STAGING/htdocs/.htaccess"

echo "Prepared Gandi deploy in $STAGING/htdocs ($(find "$STAGING/htdocs" -type f | wc -l | tr -d ' ') files)"
