import { TaskDTO } from "../models/schema/TaskTypeORMSchema";

export interface ITaskDAO {

  find(id: string): Promise<TaskDTO>;
  create(taskDTO: TaskDTO): Promise<TaskDTO>;
  createTasks(tasksDTO: TaskDTO[]): Promise<TaskDTO[]>;
  findAll(): Promise<TaskDTO[]>;
  update(taskDTO: TaskDTO): Promise<TaskDTO>;
  delete(id: string): Promise<boolean>;
}