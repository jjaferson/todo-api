import {interfaces, controller, httpGet} from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import { IUserDAO } from "../repositories/IUserDAO";
import Types from "../types";
import { ITaskService } from "../services/TaskService";

@controller("/todo")
export class TodoController implements interfaces.Controller {

  constructor(
    @inject(Types.ITaskService) private taskService: ITaskService
  ) {}

  @httpGet("/")
  public async getTodoList(){
    return this.taskService.listTask();
  }

}