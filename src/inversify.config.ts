import { Container } from "inversify";
import { IUserDAO } from "./repositories/IUserDAO";
import { UserDAOTypeORM } from "./repositories/typeORM/UserDAOTypeORM";
import Types from "./types";
import { ITaskDAO } from "./repositories/ITaskDAO";
import { TaskDAOTypeORM } from "./repositories/typeORM/TaskDAOTypeORM";
import { ITaskService, TaskService } from "./services/TaskService";

let container = new Container();

// DAO 
container.bind<IUserDAO>(Types.IUserDAO).to(UserDAOTypeORM);
container.bind<ITaskDAO>(Types.ITaskDAO).to(TaskDAOTypeORM);

// Service
container.bind<ITaskService>(Types.ITaskService).to(TaskService);

export default container;