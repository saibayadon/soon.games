# Deployment Guide

This Next.js application has been configured for containerized deployment to any Docker-compatible service.

## Changes Made

- Removed `@vercel/speed-insights` dependency and usage
- Updated `next.config.js` to use standalone output
- Added Docker configuration files

## Docker Deployment

### Build and Run Locally

```bash
# Build the Docker image
docker build -t soon-games .

# Run the container
docker run -p 3000:3000 soon-games
```

### Using Docker Compose

```bash
# Build and run with docker-compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

## Deploy to Cloud Services

### Railway

```bash
railway login
railway link
railway up
```

### Render

1. Connect your GitHub repo to Render
2. Select "Docker" as the environment
3. Use the default Dockerfile settings
4. Deploy

### DigitalOcean App Platform

1. Create new app from GitHub repo
2. Select "Docker" as the runtime
3. Use port 3000
4. Deploy

### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/soon-games

# Deploy to Cloud Run
gcloud run deploy --image gcr.io/PROJECT-ID/soon-games --platform managed
```

### AWS ECS/Fargate

1. Build and push to ECR
2. Create ECS task definition using the image
3. Deploy to ECS service

## Environment Variables

The application currently uses minimal environment variables. Add any required environment variables to your deployment platform:

- `NODE_ENV=production` (automatically set in Docker)
- `PORT=3000` (automatically set in Docker)

## Health Check

The application serves on port 3000. You can verify it's running by checking the root path `/`.

## Performance Notes

- The Docker image uses multi-stage builds for optimal size
- Static assets are properly cached
- The application runs as a non-root user for security
