import { Task } from "../Task";
import { ObjectIdColumn, Column, Entity } from "typeorm";
import { TaskTypeORMSchema, TaskDTO } from "./TaskTypeORMSchema";

export interface TodoListDTO {
  _id?: string;
  subject: string;
  tasks: TaskDTO[];
  created_at: Date;
  update_at: Date;
}

@Entity()
export class TodoListTypeORMSchema implements TodoListDTO {

  @ObjectIdColumn()
  _id?: string;  
  
  @Column()
  subject: string;

  @Column(type=> TaskTypeORMSchema)
  tasks: TaskDTO[];

  @Column()
  created_at: Date;

  @Column()
  update_at: Date;
}