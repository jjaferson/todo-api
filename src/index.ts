import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

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
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);