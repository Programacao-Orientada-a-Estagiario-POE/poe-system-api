import express, { Application, RequestHandler } from "express";
import { IController } from "./application/controllers/controller.interface";
import { IDatabase } from "./lib/db";

class App {
  public app: Application;

  public port: number;

  public apiSpecLocation: string;

  private readonly database: IDatabase;

  private readonly newRelic: any;

  constructor(appInit: {
    port: number;
    middleWaresToStart?: Array<RequestHandler>;
    middleWares: Array<RequestHandler>;
    controllersBeforeMiddlewares?: Array<IController>;
    controllers: Array<IController>;
    database: IDatabase;
    apiSpecLocation: string;
    customizers: Array<
      (application: Application, fileDestination: string) => void
    >;
  }) {
    this.app = express();
    this.port = appInit.port;

    this.database = appInit.database;
    this.apiSpecLocation = appInit.apiSpecLocation;

    if (appInit.middleWaresToStart) {
      this.middlewares(appInit.middleWaresToStart);
    }

    if (appInit.controllersBeforeMiddlewares) {
      this.routes(appInit.controllersBeforeMiddlewares, "/public");
    }

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.customizers(appInit.customizers);
  }

  private customizers(
    customizers: Array<(application: Application, apiSpecFile: string) => void>
  ) {
    customizers.forEach((customizer) =>
      customizer(this.app, this.apiSpecLocation)
    );
  }

  private middlewares(middleWares: Array<RequestHandler>) {
    middleWares.forEach((middleWare) => this.app.use(middleWare));
  }

  private routes(controllers: Array<IController>, pathRoute = "/") {
    this.newRelic?.startSegment();
    controllers.forEach((controller) =>
      this.app.use(pathRoute, controller.getRoutes())
    );
  }

  public async databaseSetup() {
    await this.database.start();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`App listening on the http://localhost:${this.port}`, {
        eventName: "App.listen",
        process: "Application",
      });
    });
  }
}

export { App };
