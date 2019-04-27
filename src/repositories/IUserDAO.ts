import { UserDTO } from "../models/schema/UserTypeORMSchema";

export interface IUserDAO {
  find(id: string): Promise<UserDTO>;
  create(user: UserDTO): Promise<UserDTO>;
  findAll(): Promise<UserDTO[]>;
  update(user: UserDTO): Promise<UserDTO>;
  delete(id: string): Promise<boolean>;
}