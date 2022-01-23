import express from "express";
import path from "path";

import { authorizationMiddleware } from "../configurations/authorization";

import { name, version } from "../../package.json";
import {
  swaggerAppCustomizer,
  validationAppCustomizer,
  validatorMiddleware,
} from "../lib/middleware";
import { IDatabase } from "../lib/db";
import { HealthControllerFactory } from "../configurations/factory/health.controller.factory";

const OPEN_API_SPEC_FILE_LOCATION = path.join(
  __dirname,
  "../",
  "contracts/poe-system-api.yaml"
);
const PORT = Number(process.env.PORT);
function configApp(dbInstance: IDatabase) {
  const config = {
    port: PORT,
    customizers: [swaggerAppCustomizer, validationAppCustomizer],
    controllers: [],
    database: dbInstance,
    controllersBeforeMiddlewares: [
      HealthControllerFactory.create({
        name,
        version,
        port: PORT,
      }),
    ],
    middleWaresToStart: [
      express.json(),
      express.urlencoded({ extended: true }),
    ],
    middleWares: [
      authorizationMiddleware,
      ...validatorMiddleware(OPEN_API_SPEC_FILE_LOCATION),
    ],
    apiSpecLocation: OPEN_API_SPEC_FILE_LOCATION,
  };

  return config;
}

export { configApp };
