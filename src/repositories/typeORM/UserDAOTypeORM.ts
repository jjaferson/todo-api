import { IUserDAO } from "../IUserDAO";
import { UserDTO, UserTypeORMSchema } from "../../models/schema/UserTypeORMSchema";
import { injectable } from "inversify";
import { RepositoryDAOTypeORM } from "./RepositoryDAOTypeORM";

@injectable()
export class UserDAOTypeORM extends RepositoryDAOTypeORM<UserDTO> implements IUserDAO{
  
  async findByEmail(email: string): Promise<UserDTO> {
    const repo = await this._getRepository(UserTypeORMSchema);
    return repo.findOne({email: email});
  }

  async find(id: string): Promise<UserDTO> {
    const repo = await this._getRepository(UserTypeORMSchema);
    return repo.findOne(id)
  } 
  
  async findAll(): Promise<UserDTO[]> {
    const repo = await this._getRepository(UserTypeORMSchema);
    return repo.find();
  }
  
  async create(user: UserDTO): Promise<UserDTO> {
    const repo = await this._getRepository(UserTypeORMSchema);
    return repo.save(user);
  }

  async update(user: UserDTO): Promise<UserDTO> {
    const repo = await this._getRepository(UserTypeORMSchema);
    await repo.update(user._id, user);
    return this.find(user._id);
  }
  
  async delete(id: string): Promise<boolean> {
    const repo = await this._getRepository(UserTypeORMSchema);
    await repo.delete(id);
    return Promise.resolve(true);
  }
}