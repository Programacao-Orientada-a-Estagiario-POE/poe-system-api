import express, { Router, Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import { UserService } from "../../../domain/user/service/user.service";
import { IController } from "../controller.interface";

class UserController implements IController {
  private router: Router = express.Router();

  private readonly userService: UserService;

  private initRoutes() {
    this.router.get("/api/user/:userId", this.getUserById);
    this.router.post("/api/user", this.createUser);
    this.router.put("/api/user", this.updateUser);
  }

  constructor(userService: UserService) {
    this.userService = userService;
    this.initRoutes();
  }

  public getRoutes(): Router {
    return this.router;
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body as any;

      const result = await this.userService.createUser({
        name,
        email,
        password,
      });

      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const user = await this.userService.getUserById(
        new Types.ObjectId(userId)
      );

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body as any;

      await this.userService.updateUser({ name, email, password });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export { UserController };
