import * as bodyParser from 'body-parser';
import "reflect-metadata";

import { Container } from 'inversify';

// declare metadata by @controller annotation
import './controllers/TodoController';
import { InversifyExpressServer } from 'inversify-express-utils';

// set up container
let container = new Container();

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