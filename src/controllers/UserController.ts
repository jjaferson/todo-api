import * as express from "express";
import { controller, httpPost, interfaces, response, request, httpGet, httpPut, queryParam } from "inversify-express-utils";
import { inject } from "inversify";
import Types from "../types";
import { IUserService } from "../services/UserService";
import { User } from "../models/User";
import { Request, Response } from "express";
import { ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiPath, ApiOperationPut } from "swagger-express-ts";
export { User }

@ApiPath( {
  path : "/user",
  name : "User"
} )
@controller("/user")
export class UserController implements interfaces.Controller  {

  constructor(
    @inject(Types.IUserService) private userService: IUserService
  ) {}

  @ApiOperationGet({
    description: "Get list of users registred on the system",
    path: "/",
    summary: "Get list of users registred on the system",
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'User'
      },
    },
  })
  @httpGet("/")
  public async listUsers(){
    return this.userService.listUser();
  }

  @ApiOperationPost({
    description: "Register a new user",
    summary: "Router to register new user",
    path: "/",
    parameters: {
      body: { description: "New user", required: true, model: "User" }
    },
    responses: {
        200: { description: "Success" },
        400: { description: "Parameters fail" },
        401: { description: "User not found" }
    }
  })
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

  @ApiOperationPut({
    description: "Update an exiting user",
    summary: "Router to update an exiting user",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          description : "Id of user",
          type : SwaggerDefinitionConstant.Parameter.Type.STRING,
          required : true
        }
      },
      body: { description: "Data to be updated", required: true, model: "User" }
    },
    responses: {
        200: { description: "Success" },
        400: { description: "Parameters fail" },
        401: { description: "User not found" }
    }
  })
  @httpPut("/")
  public async updateUser(
    @queryParam("id") id: string, 
    @request() req: Request,
    @response() res: Response) {

    try{
      await this.userService.updateUser(id,
        new User(
          req.body.name,
          req.body.email
        )
      );
      res.sendStatus(201);
    } catch(error) {
      res.status(400).json({ error: error.message });
    }
  }

}