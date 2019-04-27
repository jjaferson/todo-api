import { TaskDTO } from "../models/schema/TaskTypeORMSchema";

export interface ITaskDAO {
  
  find(id: string): Promise<TaskDTO>;
  create(task: TaskDTO): Promise<TaskDTO>;
  findAll(): Promise<TaskDTO[]>;
  update(task: TaskDTO): Promise<TaskDTO>;
  delete(id: string): Promise<boolean>;
}