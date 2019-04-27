import { Container } from "inversify";
import { IUserDAO } from "./repositories/IUserDAO";
import { UserDAOTypeORM } from "./repositories/typeORM/UserDAOTypeORM";
import Types from "./types";

let container = new Container();

// DAO 
container.bind<IUserDAO>(Types.IUserDAO).to(UserDAOTypeORM);

export default container;