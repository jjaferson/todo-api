import {interfaces, controller, httpGet, httpPost, request, response, injectHttpContext} from "inversify-express-utils";
import * as express from "express";
import { inject } from "inversify";
import Types from "../types";
import { ITaskService } from "../services/TaskService";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { ApiPath, ApiOperationPost, ApiOperationGet, SwaggerDefinitionConstant } from "swagger-express-ts";
import { TodoList } from "../models/TodoList";
export { TodoList, Task }

@ApiPath( {
  path : "/todo",
  name : "Todo List"
})
@controller("/todo")
export class TodoController implements interfaces.Controller {

  @injectHttpContext private readonly _httpContext: interfaces.HttpContext;
  
  constructor(
    @inject(Types.ITaskService) private taskService: ITaskService,
  ) {}
  

  @ApiOperationGet({
    description: "List of Todolist",
    path: "/",
    summary: "Router to display a list of todoList",
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'TodoList'
      }
    },
  })  
  @httpGet("/", Types.JWTAuthMiddleware)
  public async getTodoList(){
    const user: User = this._httpContext.user.details;
    return this.taskService.listTodoList(user);
  }

  @ApiOperationPost({
    description: "Create a new todo list with tasks",
    summary: "Router to create a new todo list with tasks",
    path: "/",
    parameters: {
      body: { description: "new todo list", required: true, model: "TodoList" }
    },
    responses: {
        200: { description: "Success" },
        400: { description: "Parameters fail" },
        401: { description: "User not found" }
    },
    security: {
      ApiKeyAuth: []
    }
  })
  @httpPost("/", Types.JWTAuthMiddleware)
  public async createTodoList(@request() req: express.Request, @response() res: express.Response){
    
    if (!req.body.subject) {
      res.status(400).send();
      return;
    }

    if (req.body.tasks) {
      const validateTask: boolean = req.body.tasks.every(task => {
        return (task.title && task.description);
      })
      if (!validateTask) {
        res.status(400).send();
        return;
      }
    }

    try {
      const user: User = this._httpContext.user.details;
      let tasks: Task[] = null;

      if (req.body.tasks) {
        tasks = req.body.tasks.map(task => new Task(
          task.title,
          task.description,
          user,
          new Date(),
          new Date(),
        ));
      }

      this.taskService.createTodoList(
        new TodoList(
          req.body.subject,
          tasks
        )
      )
      res.sendStatus(201);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  public async createTasks(@request() req: express.Request, @response() res: express.Response) {
    try {

      const user: User = this._httpContext.user.details;
      const todoList: TodoList = await this.taskService.getTodoList(req.body.todoListId);

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