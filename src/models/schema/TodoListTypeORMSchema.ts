import { Task } from "../Task";
import { ObjectIdColumn, Column, Entity } from "typeorm";

export interface TodoListDTO {
  _id?: string;
  subject: string;
  tasks: Task[];
  created_at: Date;
  update_at: Date;
}

@Entity('todo_list')
export class TodoListTypeORMSchema implements TodoListDTO {

  @ObjectIdColumn()
  _id?: string;  
  
  @Column()
  subject: string;

  @Column(type=> Task)
  tasks: Task[];

  @Column()
  created_at: Date;

  @Column()
  update_at: Date;
}