# Description

Test assignment. API to support room booking.

# Running the app

## Option 1 - Run everything via docker-compose
Run the following command in project root folder:
`docker-compose -f "docker-compose.yml" up -d --build`

API endpoints should be available via _http://docker_host:3000/api_ URI.

To shut application down run the following command:
`docker-compose -f "docker-compose.yml" down`

## Option 2 - Run API locally, run DB as Docker image
Run the following commands in project root folder:
1. `docker build --rm -f "db.Dockerfile" -t anilesdb .`
1. `docker run --rm -d -p 5432:5432/tcp anilesdb:latest`
1. `npm i -g @nestjs/cli`
1. `npm i`
1. In project root folder create _.env_ file and copy _.env.example_ contents into it. Change host in PG_URI to your local Docker host.
1. `npm start`

API endpoints should be available via _http://localhost:3000/api_ URI.

# Endpoints 
See Swagger doc under:
_http://host:3000/docs_
  
