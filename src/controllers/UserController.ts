import * as express from "express";
import { controller, httpPost, interfaces, response, request, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import Types from "../types";
import { IUserService } from "../services/UserService";
import { User } from "../models/User";
import { Request, Response } from "express";

@controller("/user")
export class UserController implements interfaces.Controller  {

  constructor(
    @inject(Types.IUserService) private userService: IUserService
  ) {}

  @httpGet("/")
  public async listUsers(){
    return this.userService.listUser();
  }

  @httpPost("/")
  public async createUser(@request() req: Request, @response() res: Response) {
    try{
      await this.userService.addUser(
        new User(
          req.body.name,
          req.body.email,
          req.body.password,
          new Date(),
          new Date()
        )
      );
      res.sendStatus(201);
    } catch(error) {
      res.status(400).json({ error: error.message });
    }
  }

}