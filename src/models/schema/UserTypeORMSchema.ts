import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

export interface UserDTO {
  _id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  update_at: Date;
}

@Entity('user')
export  class UserTypeORMSchema implements UserDTO {
  
  @ObjectIdColumn()
  _id: number;  

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column()
  update_at: Date;
}