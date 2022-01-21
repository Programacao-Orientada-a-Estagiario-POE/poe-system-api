import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/exceptions";

export const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Authorization field is missing");
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Token is missing");
  }

  throw new UnauthorizedError();
};
