import "reflect-metadata";
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

// declare metadata by @controller annotation
import './controllers/TodoController';
import './controllers/UserController';

import container from './inversify.config';

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);