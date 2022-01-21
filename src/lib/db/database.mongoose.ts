import mongoose from "mongoose";
import { IDatabase } from ".";

export class MongooseDatabase implements IDatabase {
  private readonly DB_URI;

  private readonly DB_NAME;

  private DB_CONNECTION: mongoose.Connection | undefined;

  constructor(DB_URI: string, DB_NAME: string) {
    this.DB_URI = DB_URI;
    this.DB_NAME = DB_NAME;

    mongoose.connection?.once("open", () => {
      console.info("Connection Stablished - MongoDB");
    });

    mongoose.connection?.on("error", (err) => {
      console.error(`Error to connect - MongoDB: Error: ${err.message}`);
    });
  }

  public async start() {
    if (!this.DB_CONNECTION) {
      await mongoose.connect(this.DB_URI, {
        dbName: this.DB_NAME,
      });
      this.DB_CONNECTION = mongoose.connection;
    }
  }

  public async close() {
    this.DB_CONNECTION?.close();
  }
}

export { mongoose };
