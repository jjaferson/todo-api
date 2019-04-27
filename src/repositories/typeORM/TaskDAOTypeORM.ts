import { ITaskDAO } from "../ITaskDAO";
import { Repository } from "typeorm";
import { TaskDTO, TaskTypeORMSchema } from "../../models/schema/TaskTypeORMSchema";
import { RepositoryDAOTypeORM } from "./RepositoryDAOTypeORM";

export class TaskDAOTypeORM extends RepositoryDAOTypeORM<TaskDTO> implements ITaskDAO{

  async find(id: string): Promise<TaskDTO> {
    const repo = await this._getRepository(TaskTypeORMSchema);
    return repo.findOne(id)
  } 
  
  async findAll(): Promise<TaskDTO[]> {
    const repo = await this._getRepository(TaskTypeORMSchema);
    return repo.find();
  }
  
  async create(task: TaskDTO): Promise<TaskDTO> {
    const repo = await this._getRepository(TaskTypeORMSchema);
    return repo.save(task);
  }

  async update(task: TaskDTO): Promise<TaskDTO> {
    const repo = await this._getRepository(TaskTypeORMSchema);
    await repo.update(task._id, task);
    return this.find(task._id);
  }
  
  async delete(id: string): Promise<boolean> {
    const repo = await this._getRepository(TaskTypeORMSchema);
    await repo.delete(id);
    return Promise.resolve(true);
  }

}