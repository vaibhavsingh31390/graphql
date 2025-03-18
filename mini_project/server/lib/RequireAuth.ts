import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "./Constants";
import { AppError } from "./AppError";

export const RequireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    return next(new AppError(HTTP_STATUS_CODES.UNAUTHORIZED, "Unauthorised."));
  }
  next();
};
