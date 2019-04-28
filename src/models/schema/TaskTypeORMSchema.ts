import { ObjectID, Entity, ObjectIdColumn, Column } from "typeorm";
import { User } from "../User";
import { UserDAOTypeORM } from "../../repositories/typeORM/UserDAOTypeORM";
import { UserTypeORMSchema, UserDTO } from "./UserTypeORMSchema";
import { TodoList } from "../TodoList";
import { TodoListTypeORMSchema } from "./TodoListTypeORMSchema";

export interface TaskDTO {
  _id?: string;
  title: string;
  description: string;
  user: UserDTO;
  created_at?: Date;
  updated_at?: Date;
}

@Entity()
export class TaskTypeORMSchema implements TaskDTO {
  
  @ObjectIdColumn()
  _id?: string;  

  @Column()
  title: string;

  @Column()
  description: string;

  @Column(type => UserTypeORMSchema)
  user: UserDTO;

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  
}