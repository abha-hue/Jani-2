# 🐳 Docker Deployment Guide

This guide covers how to run JANI using Docker in both development and production environments.

## 📋 Prerequisites

- Docker Desktop installed and running
- `.env` file configured (see [ENV_SETUP.md](./ENV_SETUP.md))

## 🚀 Quick Start

### Development Mode (Hot-Reload)
```bash
# Using docker-compose (recommended)
docker-compose up jani-dev

# Or using docker directly
docker build -f Dockerfile.dev -t jani:dev .
docker run -p 5173:5173 --env-file .env jani:dev
```

Access at: `http://localhost:5173`

### Production Mode (Nginx)
```bash
# Using docker-compose (recommended)
docker-compose up jani-prod

# Or using docker directly
docker build -t jani:prod .
docker run -p 8080:80 jani:prod
```

Access at: `http://localhost:8080`

## 📦 Available Dockerfiles

### `Dockerfile` (Production)
- **Purpose**: Production-ready build
- **Server**: Nginx
- **Port**: 80 (mapped to 8080)
- **Size**: Optimized multi-stage build
- **Use Case**: Deployment, testing final build

**Features:**
- Multi-stage build for smaller image size
- Serves static files with nginx
- No node_modules in final image
- Fast startup time

### `Dockerfile.dev` (Development)
- **Purpose**: Development with hot-reload
- **Server**: Vite dev server
- **Port**: 5173
- **Size**: Larger (includes dev dependencies)
- **Use Case**: Local development in Docker

**Features:**
- Hot module replacement (HMR)
- Dev server with --host flag
- Volume mounting for live code changes
- Full dev dependencies

## 🔧 Docker Compose Commands

### Start Services
```bash
# Start development server in background
docker-compose up -d jani-dev

# Start production server in background
docker-compose up -d jani-prod

# View logs
docker-compose logs -f jani-dev
```

### Stop Services
```bash
# Stop specific service
docker-compose stop jani-dev

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Rebuild
```bash
# Rebuild specific service
docker-compose build jani-dev

# Rebuild and start
docker-compose up --build jani-dev
```

## 🌐 Port Mapping

| Service | Container Port | Host Port | URL |
|---------|---------------|-----------|-----|
| Development | 5173 | 5173 | http://localhost:5173 |
| Production | 80 | 8080 | http://localhost:8080 |

## 🔐 Environment Variables in Docker

### Method 1: Using .env file (Recommended)
```bash
docker run -p 5173:5173 --env-file .env jani:dev
```

### Method 2: Individual Variables
```bash
docker run -p 5173:5173 \
  -e VITE_SUPABASE_URL=https://xxx.supabase.co \
  -e VITE_SUPABASE_ANON_KEY=xxx \
  -e VITE_FIREBASE_API_KEY=xxx \
  jani:dev
```

### Method 3: Docker Compose
The `docker-compose.yml` automatically uses `.env` file:
```yaml
env_file:
  - .env
```

## 📊 Image Size Comparison

```bash
# Check image sizes
docker images jani

# Production image: ~50MB (nginx + static files)
# Development image: ~450MB (node + dependencies + source)
```

## 🛠️ Troubleshooting

### Issue: Container exits immediately
**Solution**: Check if port is already in use
```bash
# Windows
netstat -ano | findstr :5173

# Kill process if needed
taskkill /PID <pid> /F
```

### Issue: Changes not reflecting in dev container
**Solution**: Ensure volumes are mounted correctly
```bash
# Check docker-compose.yml has:
volumes:
  - ./src:/app/src
  - ./public:/app/public
```

### Issue: Environment variables not loading
**Solution**: Rebuild the image
```bash
docker-compose down
docker-compose build --no-cache jani-dev
docker-compose up jani-dev
```

### Issue: "ERR_EMPTY_RESPONSE" in browser
**Solution**: Ensure --host flag is set in dev server
```bash
# Dockerfile.dev should have:
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

## 🚢 Production Deployment

### Build Production Image
```bash
docker build -t jani:v1.0.0 .
```

### Tag for Registry
```bash
docker tag jani:v1.0.0 your-registry/jani:v1.0.0
docker tag jani:v1.0.0 your-registry/jani:latest
```

### Push to Registry
```bash
docker push your-registry/jani:v1.0.0
docker push your-registry/jani:latest
```

### Deploy
```bash
# Pull and run on server
docker pull your-registry/jani:latest
docker run -d -p 80:80 --name jani your-registry/jani:latest
```

## 📈 Performance Tips

1. **Use Multi-stage Builds** - Production Dockerfile already implements this
2. **Optimize .dockerignore** - Excludes unnecessary files
3. **Layer Caching** - Dependencies are cached separately from source code
4. **Use Alpine Images** - Smaller base images
5. **Health Checks** - Add health check endpoints for production

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Docker Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t jani:${{ github.sha }} .
      - name: Push to registry
        run: docker push jani:${{ github.sha }}
```

## 📝 Next Steps

- [ ] Add nginx custom configuration
- [ ] Implement health check endpoints
- [ ] Set up Docker registry
- [ ] Configure CI/CD pipeline
- [ ] Add Docker Swarm/Kubernetes configs
- [ ] Implement logging and monitoring

## 🆘 Need Help?

- Check Docker logs: `docker logs <container-id>`
- Inspect container: `docker exec -it <container-id> sh`
- Check network: `docker network ls`
- View processes: `docker ps -a`

---

**Happy Dockerizing! 🐋**
