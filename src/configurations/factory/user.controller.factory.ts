import { IController } from "../../application/controllers/controller.interface";
import { UserController } from "../../application/controllers/user/user.controller";
import { UserService } from "../../domain/user/service/user.service";
import { UserModel } from "../../infrastructure/database/mongo/models/user.model";
import { UserRepository } from "../../infrastructure/repository/mongo/user.repository";

export class UserControllerFactory {
  static create(): IController {
    const userRepository = new UserRepository(UserModel);
    const userService = new UserService(userRepository);
    return new UserController(userService);
  }
}
