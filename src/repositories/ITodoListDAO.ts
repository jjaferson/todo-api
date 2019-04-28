import { TodoListDTO } from "../models/schema/TodoListTypeORMSchema";

export interface ITodoListDAO {
  find(id: string): Promise<TodoListDTO>;
  create(list: TodoListDTO): Promise<TodoListDTO>;
  findAll(): Promise<TodoListDTO[]>;
  update(list: TodoListDTO): Promise<TodoListDTO>;
  delete(id: string): Promise<boolean>;
}