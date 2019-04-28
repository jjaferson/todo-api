
import * as express from "express";
import { controller, httpPost, interfaces, response, request, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import Types from "../types";
import { UserService } from "../services/UserService";
import { ApiOperationPost, ApiPath} from "swagger-express-ts";
import { Login } from "../models/Login";
export { Login }

@ApiPath( {
  path : "/auth",
  name : "Authentication"
} )
@controller("/auth")
export class AuthController implements interfaces.Controller{

  constructor(
    @inject(Types.IUserService) private userService: UserService
  ) { }

  @ApiOperationPost({
    description: "Authenticate users to make request to the API, " +
    "please enter an email and password of a registered user and you will get a response with the token " +
    "to be added to the headers of each request made to the API",
    summary: "Router to authenticate users on the API",
    path: "/",
    parameters: {
      body: { description: "Authenticate to the API", required: true, model: "Login" }
    },
    responses: {
        200: { description: "Success" },
        400: { description: "Parameters fail" },
        401: { description: "User not found" }
    }
  })
  @httpPost("/")
  public async authenticate(@request() request: express.Request, @response() response: express.Response) {
    const email: string = request.body.email; 
    const password: string = request.body.password; 

    if (!(email && password)) {
      response.status(400).send();
      return;
    }

    try{
      const token = await this.userService.authUser(email, password);
      response.send(token);
    }catch (error) {
      response.status(401).json({ error: error.message });
    }
  }
}