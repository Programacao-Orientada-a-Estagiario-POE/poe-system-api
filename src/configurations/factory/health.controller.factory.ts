import { IController } from "../../application/controllers/controller.interface";
import { HealthController } from "../../application/controllers/health/health.controller";

export class HealthControllerFactory {
  static create({
    name,
    version,
    port,
  }: {
    name: string;
    version: string;
    port: number;
  }): IController {
    return new HealthController({
      name,
      version,
      port,
    });
  }
}
