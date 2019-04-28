import { Task, User } from "../models/Task";
import { inject, injectable } from "inversify";
import Types from "../types";
import { TaskDTO } from "../models/schema/TaskTypeORMSchema";
import { ITaskDAO } from "../repositories/ITaskDAO";
import { ITodoListDAO } from "../repositories/ITodoListDAO";
import { TodoList } from "../models/TodoList";
import { TodoListDTO } from "../models/schema/TodoListTypeORMSchema";

export interface ITaskService {
  listTask(): Promise<Task[]>;
  getTask(id: string): Promise<Task>;
  addTask(task: Task): Promise<Task>;
  updateTask(tast: Task): Promise<Task>;
  removeTask(id: string): Promise<boolean>;
  createTodoList(todoList: TodoList): Promise<TodoList>;
  updateTodoList(id: string, todoList: TodoList): Promise<TodoList>;
  getTodoList(id: string): Promise<TodoList>;
  listTodoList(user?: User): Promise<TodoList[]>;
  removeTodoList(id: string): Promise<boolean>;
}

@injectable()
export class TaskService implements ITaskService{

  constructor(
    @inject(Types.ITaskDAO) private taskDAO: ITaskDAO,
    @inject(Types.ITodoListDAO) private todoListDAO: ITodoListDAO
  ) {}

  async createTodoList(todoList: TodoList): Promise<TodoList> {
    const todoListDTO: TodoListDTO = this.toTodoListDTO(todoList);

    if (todoList.getTasks) {
      const tasks: TaskDTO[] = await this.taskDAO.createTasks(
        todoList.getTasks.map(this.toTaskDTO)
      );
      todoListDTO.tasks = tasks;
    }
    const createdTaskDTO: TodoListDTO = await this.todoListDAO.create(todoListDTO);
    return this.toTodoList(createdTaskDTO);
  }
  
  async updateTodoList(id: string, todoList: TodoList): Promise<TodoList> {
    const oldTodoList = await this.todoListDAO.find(id);
    if (!oldTodoList) {
      throw Error("todo list doesn't exist");
    }

    const updateTodoList : TodoListDTO = oldTodoList;
    if (todoList.getSubject) {
      updateTodoList.subject = todoList.getSubject;
    }

    if (todoList.getTasks) {
      updateTodoList.tasks = todoList.getTasks.map(this.toTaskDTO);
    }

    updateTodoList.update_at = new Date();

    const updatedTodoListDTO = await this.todoListDAO.update(updateTodoList);
    return this.toTodoList(updatedTodoListDTO);
  }

  async getTodoList(id: string): Promise<TodoList> {
    const todoListDTO: TodoListDTO = await this.todoListDAO.find(id);
    return this.toTodoList(todoListDTO);
  }

  async listTodoList(user?: User): Promise<TodoList[]> {
    let todoListsDTO: TodoListDTO[] = await this.todoListDAO.findAll();

    if (user) {
      todoListsDTO = todoListsDTO.filter(
        todoListDTO => todoListDTO.tasks.filter(
          task => task.user._id === user.getId
        )
      )
    }
    return todoListsDTO.map(this.toTodoList);
  }

  async removeTodoList(id: string): Promise<boolean> {
    return this.todoListDAO.delete(id);
  }

  async listTask(): Promise<Task[]> {
    const tasksDTO = await this.taskDAO.findAll()
    return tasksDTO.map(this.toTask);
  }  
  
  async getTask(id: string): Promise<Task> {
    const taskDTO = await this.taskDAO.find(id);
    return this.toTask(taskDTO);
  }

  async addTask(task: Task): Promise<Task> {
    const taskDTO: TaskDTO = this.toTaskDTO(task);
    const createdTaskDTO: TaskDTO = await this.taskDAO.create(taskDTO);

    return this.toTask(createdTaskDTO);
  }

  async updateTask(task: Task): Promise<Task> {
    const taskDTO: TaskDTO = this.toTaskDTO(task);
    const updatedTaskDTO: TaskDTO = await this.taskDAO.update(taskDTO);

    return this.toTask(updatedTaskDTO);

  }
  removeTask(id: string): Promise<boolean> {
    return this.taskDAO.delete(id);
  }

  private toTask(taskDTO: TaskDTO): Task {
    return new Task(
      taskDTO.title,
      taskDTO.description,
      new User(
        taskDTO.user.name,
        taskDTO.user.email,
        null,
        taskDTO.user.created_at,
        taskDTO.user.update_at,
        taskDTO.user._id
      ),
      taskDTO.created_at,
      taskDTO.updated_at,
      taskDTO._id
    );
  }

  private toTaskDTO(task: Task): TaskDTO {
    return {
      title: task.getTitle,
      description: task.getDescription,
      created_at: task.getCreatedAt,
      updated_at: task.getUpdatedAt,
      user: {
        _id: task.getUser.getId,
        email: task.getUser.getEmail,
        name: task.getUser.getName,
        created_at: task.getUser.getCreatedAtDate,
        update_at: task.getUser.getUpdatedAtDate,
        password: null
      },
      _id: task.getId
    }
  }

  private toTodoListDTO(todoList: TodoList): TodoListDTO {
    return {
      _id: todoList.getId,
      subject: todoList.getSubject,
      created_at: todoList.getCreatedAt,
      update_at: todoList.getUpdatedAt,
      tasks: todoList.getTasks.map(this.toTaskDTO)
    }
  }

  private toTodoList(todolistDTO: TodoListDTO): TodoList {
    const toTask = (taskDTO: TaskDTO): Task => {
      return new Task(
        taskDTO.title,
        taskDTO.description,
        new User(
          taskDTO.user.name,
          taskDTO.user.email,
          null,
          taskDTO.user.created_at,
          taskDTO.user.update_at,
          taskDTO.user._id
        ),
        taskDTO.created_at,
        taskDTO.updated_at,
        taskDTO._id
      );
    }

    return new TodoList(
      todolistDTO.subject,
      todolistDTO.tasks.map(toTask),
      todolistDTO.created_at,
      todolistDTO.update_at
    );
  }


}