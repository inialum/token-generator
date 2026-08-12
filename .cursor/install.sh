#!/usr/bin/env bash
set -euo pipefail

# Cloud Agent bootstrap for @inialum/token-generator.
#
# The project is a Deno v2.x CLI (see .github/workflows/ci.yml). Node.js 22 and
# pnpm are already provided by the base image; only Deno needs to be installed.
# This script is idempotent: it is safe to run repeatedly and on cached state.

if ! command -v deno >/dev/null 2>&1; then
  curl -fsSL https://deno.land/install.sh | sh -s -- --yes
fi

DENO_BIN="${DENO_INSTALL:-$HOME/.deno}/bin/deno"

# Expose deno on a directory that is on PATH so non-interactive agent shells can
# find it without sourcing shell profiles.
if [ -w /usr/local/bin ]; then
  ln -sf "$DENO_BIN" /usr/local/bin/deno
elif command -v sudo >/dev/null 2>&1 && sudo -n true >/dev/null 2>&1; then
  sudo ln -sf "$DENO_BIN" /usr/local/bin/deno
fi

export PATH="$(dirname "$DENO_BIN"):$PATH"

# Cache the project dependencies declared in deno.json.
deno install
