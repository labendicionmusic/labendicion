#!/bin/bash
set -e

echo "=========================================="
echo "  🎶 Deploying La Bendición"
echo "=========================================="

# Navigate to project directory
APP_DIR="/root/labendicion"

echo "📦 Pulling latest changes from GitHub..."
cd "$APP_DIR"
git pull origin main

echo "🐳 Building and restarting containers..."
docker compose down
docker compose up -d --build

echo "🧹 Cleaning up old Docker images..."
docker image prune -f

echo "=========================================="
echo "  ✅ La Bendición deployed successfully!"
echo "=========================================="
docker compose ps
