import { Task } from "../models/Task";
import { inject, injectable } from "inversify";
import Types from "../types";
import { TaskDTO } from "../models/schema/TaskTypeORMSchema";
import { ITaskDAO } from "../repositories/ITaskDAO";

export interface ITaskService {
  listTask(): Promise<Task[]>;
  getTask(id: string): Promise<Task>;
  addTask(task: Task): Promise<Task>;
  updateTask(tast: Task): Promise<Task>;
  removeTask(id: string): Promise<boolean>;
}

@injectable()
export class TaskService implements ITaskService{

  constructor(
    @inject(Types.ITaskDAO) private taskDAO: ITaskDAO
  ) {}

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
      taskDTO.user,
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
      user: task.getUser,
      _id: task.getId,
    }
  }


}