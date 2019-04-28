import {interfaces, controller, httpGet, httpPost, request, response, injectHttpContext} from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import Types from "../types";
import { ITaskService } from "../services/TaskService";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { IUserService } from "../services/UserService";

@controller("/todo")
export class TodoController implements interfaces.Controller {


  @injectHttpContext private readonly _httpContext: interfaces.HttpContext;
  
  constructor(
    @inject(Types.ITaskService) private taskService: ITaskService,
    @inject(Types.IUserService) private userSerivce: IUserService
  ) {}

  @httpGet("/", Types.JWTAuthMiddleware)
  public async getTodoList(){
    return this.taskService.listTask();
  }

  @httpPost("/", Types.JWTAuthMiddleware)
  public async createTasks(@request() req: express.Request, @response() res: express.Response) {
    try {

      const user: User = this._httpContext.user.details;
      
      await this.taskService.addTask(
        new Task(
          req.body.title,
          req.body.description,
          user,
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