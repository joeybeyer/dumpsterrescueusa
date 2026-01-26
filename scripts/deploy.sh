#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_ROOT="${WEB_ROOT:-/var/www/dumpsterrescueusa}"
BRANCH="${BRANCH:-main}"

cd "$ROOT_DIR"

git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

npm ci
npm run build

mkdir -p "$WEB_ROOT"
rsync -a --delete "$ROOT_DIR/out/" "$WEB_ROOT/"
cp "$ROOT_DIR/deploy/redirects.conf" "$WEB_ROOT/redirects.conf"

echo "Deployment complete: $WEB_ROOT"
