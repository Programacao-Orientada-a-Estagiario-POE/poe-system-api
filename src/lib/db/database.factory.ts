import { IDatabase, MongooseDatabase } from ".";

export class DatabaseMongooseFactory {
  static create(dbUri: string, dbName: string): IDatabase {
    return new MongooseDatabase(dbUri, dbName);
  }
}
