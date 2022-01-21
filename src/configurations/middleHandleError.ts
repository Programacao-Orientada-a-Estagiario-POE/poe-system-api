/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { OpenApiHttpError } from "../helpers/exceptions";

export const middlewareHandleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof OpenApiHttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof Error) {
    console.error(
      JSON.stringify({
        eventName: "server.error",
        message: err.message,
        stack: err.stack,
      })
    );
  }

  return res
    .status(500)
    .json({ message: "Ops! Unexpected error 🚩, please contact tech team!" });
};
