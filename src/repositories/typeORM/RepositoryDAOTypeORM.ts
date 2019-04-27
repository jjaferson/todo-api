import { injectable } from "inversify";
import { DatabaseConnection } from "./DatabaseConnectionTypeORM";
import { Repository, ObjectType, MongoRepository } from "typeorm";

@injectable()
export abstract class RepositoryDAOTypeORM<T> {

  protected async _getRepository(entity: ObjectType<T>): Promise<MongoRepository<T>>{
    const connection = await DatabaseConnection.getDBConnection();
    return connection.getMongoRepository(entity);
  }

}