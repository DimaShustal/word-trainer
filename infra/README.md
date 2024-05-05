## To start docker compose

1. Update mongodb url in /server/index.ts to `mongodb://mongo:27017/word-trainer`
2. Update REACT_APP_API_URL in /client/.env.production to `http://localhost:4000/graphql`
3. Run `docker-compose -f ./infra/docker-compose.yml up` from root of repo to start the services.

After these steps you will have the following services running:

- Client: http://localhost:8080
- Server: http://localhost:4000
- Mongo DB: http://localhost:27017
- Mongo Admin: http://localhost:8081
