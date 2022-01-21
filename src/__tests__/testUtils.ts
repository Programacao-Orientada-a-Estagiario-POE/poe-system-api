import { App } from "../app";
import { DatabaseMongooseFactory, mongoose } from "../lib/db";
import { configApp } from "./configApp";

export async function bootstrapTest() {
  const DATABASE_URI = String(process.env.DATABASE_URI);
  const DB_NAME = String(process.env.DB_NAME);
  const dbInstance = DatabaseMongooseFactory.create(DATABASE_URI, DB_NAME);

  await dbInstance.start();

  const app = new App(configApp(dbInstance));

  return {
    dbInstance,
    app,
  };
}

export async function seedDatabaseTest() {
  const { db } = mongoose.connection;
}

export async function dropDatabaseTest() {
  const { db } = mongoose.connection;
}
