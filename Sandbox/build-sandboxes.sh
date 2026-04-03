#!/bin/bash
# ─────────────────────────────────────────────────────────
# Build Docker sandbox images for the code runner.
# Run this ONCE before starting the backend in docker mode.
#
# LINUX/MAC: bash build-sandboxes.sh
# WINDOWS:   See WINDOWS_SETUP.md (run 3 docker build commands manually)
# ─────────────────────────────────────────────────────────
set -e

echo "Building C sandbox (GCC on Alpine)..."
docker build -t c-sandbox ./C/

echo "Building Python sandbox (Python 3.11 Alpine)..."
docker build -t python-sandbox ./Python/

echo "Building Node.js sandbox (Node 18 Alpine)..."
docker build -t node-sandbox ./Node/

echo ""
echo "✅ All sandbox images built:"
echo "   c-sandbox, python-sandbox, node-sandbox"
echo ""
echo "Set RUNNER_MODE=docker in Backend/.env to use these."
