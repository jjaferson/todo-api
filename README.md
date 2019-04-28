# TODO API

The project consists of an Restful API that allows you manage tasks thought a set of options.

## Project Setup

You will need to have Docker and Docker Compose to get the API run and running

The envrioment to run the project is available on two Docker images one for development `Dockerfile` and the one for production `Dockerfile.production` there is also on the root of the project a `docker-compose.yaml` file that you can create the containers

### How to get up and running

After cloning the code source go to the root folder of the project and run `docker-compose` with the `--build` parameter to build the docker images

```docker-compose up -d --build```

* Attention to the ports of the containers in case they are being used by other services already.

## API Documentaion

Documentation is available in swagger template once the project is up and running you can access the documentatin on the URL:

* [http://<API-ADDRESS>/api-docs/swagger/#/](http://<API-ADDRESS>/api-docs/swagger/#/)

### Endpoints

![alt text][logo]

[logo]: https://github.com//jjaferson/todo-api/blob/master/api-endpoints.png?raw=true  "Endpoins"

The API uses JWT token for authentication and the secret key to generate the token is on the file `config/config.ts`

```
export default {
  jwtSecret: "todolistapi"
}
```

### Project technologies:

  * NodeJS 8+
  * TypeScript 2.3+
  * MongoDB

### Main Libraries
  * Express (web framework)
  * TypeORM (TypeScript ORM with MongoDB)
  * Inversify (TypeScript DI/IoC framework)
  * Inversify-express-utils
  * Jsonwebtoken
  * bcryptjs


