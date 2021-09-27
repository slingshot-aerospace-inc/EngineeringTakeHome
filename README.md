# Slingshot Takehome
This repository hosts the skeleton code for the Slingshot Aerospace takehome test.

The application is comprised of 5 containers.
1. Frontend
1. Backend
1. Ingest
1. Simulator
1. Postgres Database

## Running the code
The code can be run using docker-compose or gitpod.io

### docker-compose
Launch the containers with docker-compose: `docker-compose --build up`

### gitpod
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/marc-slingshot/slingshot-takehome)

1. Click the link above
1. Once the containers are pulled and the VS Code IDE opens up the containers will be launched
1. Terminal output of each container is in bottom right

## Frontend
The frontend code is a Create React App application using Typescript.  More documentation for the frontend can be found [here](frontend).

## Backend
The backend code is a Apollo GraphQL server behind Express using TypeORM for database access.  The backend is also in control of setting up the database using TypeORM.  More documentation for the backend can be found [here](backend).

## Ingest
The data ingest container is just a simple Python application running under watchgod for reloading as files change.  More documentation for ingest can be found [here](ingest).

## Simulator
The simulator is an API server running FastAPI under uvicorn.  More documentation for the simulator can be found [here](simulator)

## PostgreSQL Database
The database is PostgreSQL.  It is running the postgres container image `postgres:13.4-alpine3.14`
