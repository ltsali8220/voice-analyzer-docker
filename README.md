🗣️ Voice Analyzer (Dockerized Full-Stack App)

A full-stack Voice/Text Analyzer application built with:

Frontend: React + TypeScript + Vite

Backend: Node.js + Express + Mongoose

Database: MongoDB (via Docker)

Reverse Proxy: Nginx with SSL

Containerized: Docker Compose

🚀 Features

🎤 Record and analyze text

📊 View past analyses stored in MongoDB

🔁 Full client–server communication via Nginx

🐳 Easy Docker deployment

🔒 HTTPS support with SSL

📂 Repository Structure
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
│       ├── server.key
│
├── docker-compose.yml
└── README.md

⚙️ Prerequisites

Docker Desktop

Optional: Local MongoDB if not using the Dockerized database

🧩 Environment Variables
/server/.env
PORT=5000
MONGO_URI=mongodb://mongo:27017/voiceanalyzer


If using local MongoDB instead of the container:

MONGO_URI=mongodb://host.docker.internal:27017/voiceanalyzer

🐳 Running with Docker
1️⃣ Build and start all containers
docker-compose up -d --build


This starts:

voice_frontend → React app

voice_backend → Express server

voice_db → MongoDB instance

voice_proxy → Nginx HTTPS proxy

2️⃣ Access the app

Frontend: https://localhost
 (via Nginx HTTPS)

Backend API (direct): http://localhost:5000

MongoDB: localhost:27017

3️⃣ Stop the app
docker-compose down


Remove data volumes as well:

docker-compose down -v

🧠 Troubleshooting
Issue	Cause	Fix
MongooseError: uri must be a string	Wrong env var name	Ensure backend uses MONGO_URI and Docker sets it correctly
Containers restart repeatedly	Build error or missing env	Run docker logs voice_backend to debug
Nginx "server directive not allowed here"	Wrong placement in nginx.conf	Ensure server {} is inside http {} block
🧪 Development Notes

Rebuild container to see code changes:

docker-compose build backend
docker-compose up -d


Connect directly to MongoDB:

docker exec -it voice_db mongosh

📜 License

MIT License