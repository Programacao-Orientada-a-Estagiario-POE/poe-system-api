import "./configurations/dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import { name, version } from "../package.json";

import { authorizationMiddleware } from "./configurations/authorization";

import { DatabaseMongooseFactory } from "./lib/db";
import { App } from "./app";
import {
  swaggerAppCustomizer,
  validationAppCustomizer,
  validatorMiddleware,
} from "./lib/middleware";
import { HealthControllerFactory } from "./configurations/factory/health.controller.factory";
import { UserControllerFactory } from "./configurations/factory/user.controller.factory";

const OPEN_API_SPEC_FILE_LOCATION = path.join(
  __dirname,
  "contracts/poe-system-api.yaml"
);
const PORT = Number(process.env.PORT);

const app = new App({
  port: PORT,
  customizers: [swaggerAppCustomizer, validationAppCustomizer],
  controllers: [],
  controllersBeforeMiddlewares: [
    HealthControllerFactory.create({
      name,
      version,
      port: PORT,
    }),
    UserControllerFactory.create(),
  ],
  middleWaresToStart: [express.json(), express.urlencoded({ extended: true })],
  middleWares: [
    cors(),
    authorizationMiddleware,
    ...validatorMiddleware(OPEN_API_SPEC_FILE_LOCATION),
  ],
  database: DatabaseMongooseFactory.create(
    String(process.env.DATABASE_URI),
    String(process.env.DATABASE_NAME)
  ),
  apiSpecLocation: OPEN_API_SPEC_FILE_LOCATION,
});

app.databaseSetup();
app.listen();
