Docker example
+ Server: node:14-alpine
+ Database: postgres
---
Step 1: Setup docker containers manually & separately
Step 2: Use Dockerfile to build docker image
Step 3: Use docker compose
---
Docker command:
docker-compose up --build -d
docker-compose stop
docker-compose down
---
Test command:
curl http://localhost:3001/todos
curl --data "text=Learn PostgreSQL&isDone=true" http://localhost:3001/todos
curl -X PUT -d "text=Learn PostgreSQL&isDone=false" http://localhost:3001/todos/2
curl -X DELETE http://localhost:3001/todos/2

