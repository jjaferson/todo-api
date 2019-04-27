import { User } from "../models/User";
import { inject } from "inversify";
import Types from "../types";
import { IUserDAO } from "../repositories/IUserDAO";
import { UserDTO } from "../models/schema/UserTypeORMSchema";

export interface IUserService {
  listUser(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  addUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  removeUser(id: string): Promise<boolean>;
}

export class UserService implements IUserService{

  constructor(
    @inject(Types.IUserDAO) private userDAO: IUserDAO
  ) {}

  async listUser(): Promise<User[]> {
    const usersDTO = await this.userDAO.findAll();
    return usersDTO.map(this.toUser);
  }  
  
  async getUser(id: string): Promise<User> {
    const userDTO = await this.userDAO.find(id);
    return this.toUser(userDTO);
  }

  async addUser(user: User): Promise<User> {
    const userDTO = this.toUserDTO(user);
    const createdUserDTO = await this.userDAO.create(userDTO);
    return this.toUser(createdUserDTO);
  }

  async updateUser(user: User): Promise<User> {
    const userDTO = this.toUserDTO(user);
    const updatedUserDTO = await this.userDAO.update(userDTO);
    return this.toUser(updatedUserDTO);
  }


  async removeUser(id: string): Promise<boolean> {
    await this.userDAO.delete(id);
    return Promise.resolve(true);
  }


  private toUser(userDTO: UserDTO): User {
    return new User(
      userDTO.name,
      userDTO.email,
      null,
      userDTO.created_at,
      userDTO.update_at,
      userDTO._id
    )
  }

  private toUserDTO(user: User): UserDTO {
    return {
      _id: user.getId,
      email: user.getEmail,
      name: user.getName,
      password: user.getPassword,
    }
  }

}