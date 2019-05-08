import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from "express";
import * as swagger from "swagger-express-ts";

// declare metadata by @controller annotation
import './controllers/TodoController';
import './controllers/UserController';
import './controllers/AuthController';

import container from './inversify.config';
import { AuthProvider } from "./providers/AuthProvider";

// create server
let server = new InversifyExpressServer(container, null, null, null, AuthProvider);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // create swagger template
  app.use('/api-docs/swagger', express.static('swagger'));
  app.use('/api-docs/swagger/assets', 
    express.static('node_modules/swagger-ui-dist'),
  );

  app.use(bodyParser.json());

  app.use(swagger.express({
    definition: {
      info: {
        title: "TodoList API",
        version: "1.0"
      },
      externalDocs : {
        url : "0.0.0.0:3000"
      },
      securityDefinitions: {
        BearerAuth: {  
          type:"apiKey",
          name:"Authorization",
          in:"header"
       }
      }
    }
  }))
});

let app = server.build();
app.listen(3000);
console.log("Server2 started on port 3000");