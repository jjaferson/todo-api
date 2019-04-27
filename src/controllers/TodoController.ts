import {interfaces, controller, httpGet} from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import { IUserDAO } from "../repositories/IUserDAO";
import Types from "../types";

@controller("/todo")
export class TodoController implements interfaces.Controller {

  constructor() {}

  @httpGet("/")
  public async getTodoList(){
  }

}