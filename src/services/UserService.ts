import { User } from "../models/User";
import { inject, injectable } from "inversify";
import Types from "../types";
import { IUserDAO } from "../repositories/IUserDAO";
import { UserDTO } from "../models/schema/UserTypeORMSchema";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import * as bcrypt from "bcryptjs";

export interface IUserService {
  listUser(): Promise<User[]>;
  getUser(id: string): Promise<User>;
  addUser(user: User): Promise<User>;
  updateUser(id: string, user: User): Promise<User>;
  removeUser(id: string): Promise<boolean>;
}

@injectable()
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

    // hash user password
    user.hashPassword();

    const userDTO = this.toUserDTO(user);
    const createdUserDTO = await this.userDAO.create(userDTO);

    return this.toUser(createdUserDTO);
  }

  async updateUser(id: string, user: User): Promise<User> {
    const oldUser = await this.userDAO.find(id);
    if (!oldUser) {
      throw Error("User not found");
    }

    const updateUser : UserDTO = oldUser;
    if (oldUser.name != user.getEmail) {
      updateUser.name = user.getEmail;
    }
    if (oldUser.email != user.getEmail) {
      updateUser.email = user.getEmail
    }
    updateUser.update_at = new Date();

    const updatedUserDTO = await this.userDAO.update(updateUser);
    return this.toUser(updatedUserDTO);
  }


  async removeUser(id: string): Promise<boolean> {
    await this.userDAO.delete(id);
    return Promise.resolve(true);
  }

  async authUser(email: string, password: string) {
    const userDTO: UserDTO = await this.userDAO.findByEmail(email);

    if (!userDTO || !bcrypt.compareSync(password, userDTO.password)) {
      throw Error("User not found");
    }

    const user = this.toUser(userDTO);
    const token: string = jwt.sign(
      {userId: user.getId, username: user.getName},
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    console.log(token);
    return token;
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