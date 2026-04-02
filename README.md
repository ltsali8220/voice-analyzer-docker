# Athina

A full-stack voice and text analyzer — record or paste audio/text, transcribe or analyze it, and store the results for later inspection. Named after Athina, daughter of Zeus.

Developed by **ltsali8220**.

## Tech stack
- Frontend: React + TypeScript + Vite
- Backend: Django + Django REST Framework
- Database: PostgreSQL (Docker)
- Reverse proxy: Nginx (with SSL)
- Orchestration: Docker Compose

## Features
- Record or submit text/audio for analysis
- Persisted analyses stored in PostgreSQL
- Client ↔ server traffic routed through Nginx
- Fully containerized for easy deployment
- HTTPS support via SSL certificates

## Repository structure
```
athina/
│
├── client/               # React frontend
│   ├── src/              # Components, hooks, pages
│   ├── Dockerfile
│   └── ...
│
├── backend/              # Django backend
│   ├── voice_analyzer/   # Django project settings
│   ├── transcriptions/   # App: models, views, serializers
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
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

## Running with Docker

```bash
docker compose up -d --build
```

This starts:
- `athina_frontend` — React app (internal only, served via Nginx)
- `athina_backend`  — Django REST API (internal only, served via Nginx)
- `athina_db`       — PostgreSQL database (internal only)
- `athina_proxy`    — Nginx HTTPS reverse proxy

## Access the app
- **App:** https://localhost (HTTPS via Nginx)
- **HTTP redirect:** http://localhost:8080 → redirects to HTTPS

## Stop the application
```bash
docker compose down
```

Remove data volumes:
```bash
docker compose down -v
```

## Debugging

```bash
# View logs
docker compose logs -f

# Shell into backend
docker exec -it athina_backend /bin/sh

# Shell into database
docker exec -it athina_db psql -U postgres -d athina
```

## SSL / Certificates
The `nginx/certs/` directory contains self-signed certificates for local development.
In production, replace with certs from a trusted CA (e.g., Let's Encrypt).

## License
MIT License
