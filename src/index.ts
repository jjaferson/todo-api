import "reflect-metadata";
import * as bodyParser from 'body-parser';

import container from './inversify.config';

// declare metadata by @controller annotation
import './controllers/TodoController';
import { InversifyExpressServer } from 'inversify-express-utils';


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