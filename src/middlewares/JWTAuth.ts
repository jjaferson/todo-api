import { BaseMiddleware } from "inversify-express-utils";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { injectable } from "inversify";

@injectable()
export class JWTAuthMiddleware extends BaseMiddleware {

  handler(req: express.Request, res: express.Response, next: express.NextFunction): void {
    let token = <string> req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
      res.status(401).json("Auth token is not supplied");
      return;
    }

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    
    let jwtPayload;

    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch(error) {
      res.status(401).json("Auth token is not supplied");
      return;
    }

    // send a new token every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
      expiresIn: "1h"
    });
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
  }

}