import { ObjectID, Entity, ObjectIdColumn, Column } from "typeorm";
import { User } from "../User";

export interface TaskDTO {
  _id?: string;
  title: string;
  description: string;
  user: User;
  created_at?: Date;
  updated_at?: Date;
}

@Entity('task')
export class TaskTypeORMSchema implements TaskDTO {
  
  @ObjectIdColumn()
  _id?: string;  

  @Column()
  title: string;

  @Column()
  description: string;

  @Column(type => User)
  user: User;

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  
}