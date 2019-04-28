import { inject, injectable } from "inversify";
import { interfaces } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import Types from "../types";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
import config from "../config/config";
import * as jwt from "jsonwebtoken";

@injectable()
export class AuthProvider implements interfaces.AuthProvider {

  @inject(Types.IUserService) private readonly userService: UserService

  constructor( 
  ) {}

  async getUser(req: Request, res: Response, next: NextFunction): Promise<interfaces.Principal> {
    let token = <string> req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
      const principal = new Principal(null);
      return principal;
    }

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    try {
      let jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      const { userId, username } = jwtPayload;
      const user: User = await this.userService.getUser(userId);
      const principal = new Principal(user);
      return principal;

    } catch(error) {
      const principal = new Principal(null);
      return principal;
    }
    
  }

}

export class Principal implements interfaces.Principal {
  details: any;  

  public constructor(details: any) {
    this.details = details;
}

  isAuthenticated(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  isResourceOwner(resourceId: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  isInRole(role: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  
}