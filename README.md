# Voice Analyzer (Dockerized Full-Stack App)

A full-stack Voice/Text Analyzer — record or paste audio/text, transcribe or analyze it, and store the results for later inspection. The project is containerized with Docker Compose and served behind an Nginx reverse proxy with HTTPS.

## Tech stack
- Frontend: React + TypeScript + Vite  
- Backend: Node.js + Express + Mongoose  
- Database: MongoDB (Docker)  
- Reverse proxy: Nginx (with SSL)  
- Orchestration: Docker Compose

## Features
- Record or submit text/audio for analysis
- Persisted analyses stored in MongoDB
- Client ↔ server traffic routed through Nginx
- Fully containerized for easy deployment
- HTTPS support via SSL certificates

## Repository structure
```
voice-analyzer-docker/
│
├── client/               # React frontend
│   ├── src/              # Components, hooks, pages
│   ├── Dockerfile
│   └── ...
│
├── server/               # Node.js backend
│   ├── models/
│   │   └── TranscribedModel.js
│   ├── server.js
│   ├── Dockerfile
│   └── .env.example
│
├── nginx/                # Reverse proxy + SSL
│   ├── nginx.conf
│   └── certs/
│       ├── server.crt
│       └── server.key
│
├── docker-compose.yml
└── README.md
```

## Prerequisites
- Docker Desktop (or Docker Engine + Docker Compose)
- Optional: a local MongoDB instance if you prefer not to use the Dockerized database

## Environment variables

Example server .env (server/.env)
```
PORT=5000
MONGO_URI=mongodb://mongo:27017/voiceanalyzer
```

If you want the backend to connect to a MongoDB running on your host machine instead of the container, use:
```
MONGO_URI=mongodb://host.docker.internal:27017/voiceanalyzer
```

Confirm your server code reads MONGO_URI (case-sensitive) from process.env.

## Running with Docker

1. Build and start all services
```bash
docker-compose up -d --build
```

This will start the composed services (example service names):
- voice_frontend → React app
- voice_backend  → Express server
- voice_db       → MongoDB
- voice_proxy    → Nginx HTTPS proxy

2. Access the app
- Frontend: https://localhost (served via Nginx HTTPS)
- Backend API (direct): http://localhost:5000 (useful for debug if backend is exposed)
- MongoDB: localhost:27017

3. Stop the application
```bash
docker-compose down
```

Remove named volumes and data:
```bash
docker-compose down -v
```

### Rebuilding specific services during development
Rebuild/refresh a single service after code changes:
```bash
# Rebuild backend (service name in compose: voice_backend)
docker-compose build voice_backend
docker-compose up -d voice_backend

# Rebuild frontend (service name in compose: voice_frontend)
docker-compose build voice_frontend
docker-compose up -d voice_frontend
```

## Debugging & troubleshooting

| Issue | Possible cause | Fix |
|---|---:|---|
| MongooseError: uri must be a string | Wrong env var name / undefined MONGO_URI | Ensure server reads process.env.MONGO_URI and Docker Compose sets it correctly |
| Containers restart repeatedly | Build error or runtime exception | Run `docker logs <container>` (e.g. `docker logs voice_backend`) and inspect stack trace |
| Nginx "server directive not allowed here" | Misplaced `server {}` block in nginx.conf | Ensure `server {}` blocks are inside an `http {}` block in nginx.conf |
| Can't connect to MongoDB from host | Using container hostnames from host machine | Use `localhost:27017` or `host.docker.internal:27017` depending on your platform / compose networking |

Common helpful commands:
```bash
# View container logs
docker-compose logs -f

# Open a shell in the backend container
docker exec -it voice_backend /bin/sh

# Connect to MongoDB shell inside the container
docker exec -it voice_db mongosh
```

## SSL / Certificates
- The `nginx/certs/` directory contains the server certificate and key used by Nginx.
- For local development you may use self-signed certificates (your browser will warn you).
- In production, replace those certs with ones from a trusted CA (e.g., Let's Encrypt) and update nginx.conf accordingly.

## Development notes
- Ensure you restart/rebuild containers when changing Dockerfile content or container-level environment.
- For live frontend development, consider running the React dev server locally (outside Docker) and pointing API calls to the backend (or configure a dev-only proxy).

## License
This project is licensed under the MIT License. See the LICENSE file for details.