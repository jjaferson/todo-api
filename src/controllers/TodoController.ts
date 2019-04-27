import {interfaces, controller, httpGet, httpPost, request, response} from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import Types from "../types";
import { ITaskService } from "../services/TaskService";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { IUserService } from "../services/UserService";

@controller("/todo")
export class TodoController implements interfaces.Controller {

  constructor(
    @inject(Types.ITaskService) private taskService: ITaskService,
    @inject(Types.IUserService) private userSerivce: IUserService
  ) {}

  @httpGet("/")
  public async getTodoList(){
    return this.taskService.listTask();
  }

  @httpPost("/")
  public async createTasks(@request() req: express.Request, @response() res: express.Response) {
    try{
      const user: User = await this.userSerivce.getUser(req.body.userId);

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