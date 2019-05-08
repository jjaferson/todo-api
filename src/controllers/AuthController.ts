
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
    summary: "Authenticate users on the API",
    description: "Authenticate users to make request to the API.<br><br> " +
    "To generate a token enter an email and password of a registered user and a JWT Token will be sent in the response of the request. " +
    "The JWT token needs to be added to each request that requires authentication.<br><br>" + 
    "*Do not forget to add <b>Bearer</b> before the token as the authentication type.<br>" + 
    "eg.: -H Authorization: Bearer [JWT Token]",
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