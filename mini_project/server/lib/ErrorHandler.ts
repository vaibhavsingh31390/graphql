import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODES } from "./Constants";

type ERROR_OBJECT = {
  Code: number;
  Status: string;
  message: string;
  Error: { message: string; field?: string }[];
  ErrorStack: Object | undefined;
};

const SendErrorResponse = (
  err: any,
  req: Request,
  res: Response,
  message: string
) => {
  const errorObject: ERROR_OBJECT = {
    Code: err.statusCode,
    Status: err.status,
    message,
    Error: err,
    ErrorStack: process.env.APP_ENV === "DEV" ? err.stack : undefined,
  };

  return res.status(err.statusCode).json(errorObject);
};

// Development error handler
const DevErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SendErrorResponse(err, req, res, err.message);
};

// Production error handler
const ProdErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SendErrorResponse(err, req, res, err.message);
};

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
  err.status = err.status || "Fail";
  err.isOperational = err.isOperational || false;
  if (process.env.APP_ENV === "DEV") {
    DevErrorHandler(err, req, res, next);
  } else {
    ProdErrorHandler(err, req, res, next);
  }
};
