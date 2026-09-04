#!/usr/bin/env bash
set -euo pipefail

# Usage: chmod +x docker-deploy.sh && ./docker-deploy.sh

# Make sure we're in the project root
cd "$(dirname "$0")"

# Pull latest code
echo ":: Fetching latest from Git"
git pull origin master

# Rebuild & restart container
echo ":: Rebuilding app image & restarting"
docker compose up -d --build --force-recreate laravel

# Wait for successful health check
echo ":: Waiting for app to report healthy..."
until docker compose ps laravel | grep -q "(healthy)"; do
  sleep 3
done

# Prune dangling image builds
echo "Prune dangling images"
docker image prune -a -f \
  --filter "label=com.docker.compose.project=$(basename $(pwd))" \
  --filter "label=com.docker.compose.service=laravel"

echo ":: Docker disk space summary"
docker system df

#echo ":: Prune build cache"
#docker builder prune -f

echo "✅ Deployment complete!"
