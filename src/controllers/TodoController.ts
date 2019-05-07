import {interfaces, controller, httpGet, httpPost, request, response, injectHttpContext, requestParam, queryParam} from "inversify-express-utils";
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
    description: "Get all the tasks regardless the TODO list",
    path: "/tasks",
    summary: "Get all the tasks",
    parameters: {
      query: {
        title: {
          type:  SwaggerDefinitionConstant.Parameter.Type.STRING,
          description: "You can query tasks by their title"
        }
      }
    },
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Task'
      },
    },
    security: {
      ApiKeyAuth: []
    }
  })  
  @httpGet("/tasks", Types.JWTAuthMiddleware)
  public async getTasks(
    @queryParam("title") title: string
  ) {
    let tasks: Task[] = await this.taskService.listTask();

    if (title) {
      tasks = tasks.filter(task => {
        return task.getTitle.toLowerCase().includes(title.toLowerCase())
      })
    }
    return tasks;
  }


  @ApiOperationGet({
    description: "Get all the tasks of a given TODO List",
    path: "/{id}/tasks",
    summary: "Get all the tasks of a given TODO List",
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
          description: "ID of the TODO List"
        }
      },
      query: {
        title: {
          type:  SwaggerDefinitionConstant.Parameter.Type.STRING,
          description: "You can query tasks by their title"
        }
      }
    },
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Task'
      },
    },
    security: {
      ApiKeyAuth: []
    }
  })
  @httpGet("/:id/tasks", Types.JWTAuthMiddleware)
  public async getTasksFromList(   
    @requestParam("id") id: string, 
    @queryParam("title") title: string,
    @request() req: express.Request, 
    @response() res: express.Response){

      try {
        const todoList: TodoList = await this.taskService.getTodoList(id);
        let tasks: Task[] = todoList.getTasks;

        if (title) {
          tasks = tasks.filter(task => {
            return task.getTitle.toLowerCase().includes(title.toLowerCase())
          })
        }

        return tasks;
      }catch(error) {
        res.status(400).json({ error: error.message });
      }

  }

  @ApiOperationPost({
    description: "Add a task to a given TODO list",
    summary: "Add a task to a given TODO list",
    path: "/{id}/task",
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
          description: "ID of the TODO List"
        }
      },      
      body: { description: "new todo list", required: true, model: "Task" }
    },
    responses: {
        200: { description: "Success" },
        400: { description: "Parameters fail" },
        401: { description: "Something went wrong" }
    },
    security: {
      ApiKeyAuth: []
    }
  })
  @httpPost("/:id/task", Types.JWTAuthMiddleware)
  public async createTasks(
    @requestParam("id") id: string, 
    @request() req: express.Request, 
    @response() res: express.Response) {

    try {
      const user: User = this._httpContext.user.details;

      await this.taskService.addTask(id,
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

  @ApiOperationGet({
    description: "Get a given TODO List",
    path: "/{id}",
    summary: "Get a given TODO List with its tasks",
    parameters: {
      path: {
        id: {
          type: SwaggerDefinitionConstant.Parameter.Type.STRING,
          required: true,
          description: "ID of the TODO List"
        }
      }
    },
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: 'TodoList'
      },
    },
    security: {
      ApiKeyAuth: []
    }
  })
  @httpGet("/:id", Types.JWTAuthMiddleware)
  public async getListWithTasks(
    @requestParam("id") id: string,
    @request() req: express.Request, 
    @response() res: express.Response) {

    try {
      return this.taskService.getTodoList(id);
    }catch(error) {
      res.status(400).json({ error: error.message });
    }
  }

  @ApiOperationGet({
    description: "Get all TODO lists",
    path: "/",
    summary: "Get all TODO lists with its tasks",
    responses: {
      200: {
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'TodoList'
      }
    },
    security: {
      ApiKeyAuth: []
    }
  })  
  @httpGet("/", Types.JWTAuthMiddleware)
  public async getTodoList(){
    const user: User = this._httpContext.user.details;
    return this.taskService.listTodoList(user);
  }

  @ApiOperationPost({
    description: "Create a new TODO list with tasks",
    summary: "Create a new TODO list with tasks",
    path: "/",
    parameters: {
      body: { description: "new todo list", required: true, model: "TodoList" }
    },
    responses: {
        200: { description: "Success" },
        400: { description: "Parameters fail" },
        401: { description: "Something went wrong" }
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

}