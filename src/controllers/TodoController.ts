import {interfaces, controller, httpGet} from "inversify-express-utils";
import * as express from "express";

@controller("/todo")
export class TodoController implements interfaces.Controller {

  @httpGet("/")
  public async getTodoList(){

  }

}