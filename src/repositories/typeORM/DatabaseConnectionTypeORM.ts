import { Connection, getConnection, createConnection, ConnectionOptions } from "typeorm";

export class DatabaseConnection {

  private static dbConnection: Promise<Connection>;

  constructor() {
    DatabaseConnection.dbConnection = null;
  }

  public static getDBConnection(): Promise<Connection>{
    try {
      DatabaseConnection.dbConnection = Promise.resolve(getConnection());
      console.log("getConnection")
      return DatabaseConnection.dbConnection;
    }catch(e) {
      console.log("getConnection error")
      DatabaseConnection.dbConnection = null;
    }

    if (!DatabaseConnection.dbConnection) {
      console.log("Create new connection")
      DatabaseConnection.dbConnection = createConnection();
    }
    return DatabaseConnection.dbConnection;
  }

}