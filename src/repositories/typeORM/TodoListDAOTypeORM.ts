import { injectable } from "inversify";
import { RepositoryDAOTypeORM } from "./RepositoryDAOTypeORM";
import { TodoListDTO, TodoListTypeORMSchema } from "../../models/schema/TodoListTypeORMSchema";
import { ITodoListDAO } from "../ITodoListDAO";

@injectable()
export class TodoListDAOTypeORM extends RepositoryDAOTypeORM<TodoListDTO> implements ITodoListDAO{
  
  async find(id: string): Promise<TodoListDTO> {
    const repo = await this._getRepository(TodoListTypeORMSchema);
    return repo.findOne(id, {relations: ['tasks']})
  }  
  
  async create(list: TodoListDTO): Promise<TodoListDTO> {
    const repo = await this._getRepository(TodoListTypeORMSchema);
    return repo.save(list);
  }

  async findAll(): Promise<TodoListDTO[]> {
    const repo = await this._getRepository(TodoListTypeORMSchema);
    return repo.find({relations: ['tasks', 'tasks.user']});
  }

  async update(list: TodoListDTO): Promise<TodoListDTO> {
    const repo = await this._getRepository(TodoListTypeORMSchema);
    await repo.update(list._id, list);
    return this.find(list._id);
  }

  async delete(id: string): Promise<boolean> {
    const repo = await this._getRepository(TodoListTypeORMSchema);
    await repo.delete(id);
    return Promise.resolve(true);
  }



}