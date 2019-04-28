import { Entity, ObjectIdColumn, Column, ObjectID, Index } from "typeorm";

export interface UserDTO {
  _id: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  update_at?: Date;
}

@Entity('user')
export  class UserTypeORMSchema implements UserDTO {
  
  @ObjectIdColumn()
  _id: string;  

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  name: string;
  
  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column()
  update_at: Date;
}