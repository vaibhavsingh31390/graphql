import { Request, Response, NextFunction } from "express";
import {
  ValidationError,
  DatabaseError,
  UniqueConstraintError,
} from "sequelize";

import { GraphQLError } from "graphql";

export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
};

export const catchAsyncGQl = (fn: (...args: any[]) => Promise<any>) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        throw new GraphQLError("Validation failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error: error.errors[0].message,
          },
        });
      }

      if (error instanceof UniqueConstraintError) {
        throw new GraphQLError("Unique constraint error", {
          extensions: { code: "BAD_USER_INPUT", error: error.errors },
        });
      }

      if (error instanceof DatabaseError) {
        throw new GraphQLError(error.message || "Database error", {
          extensions: { code: "INTERNAL_SERVER_ERROR", error: error.message },
        });
      }

      throw new GraphQLError(error.message || "Internal server error", {
        extensions: { code: "INTERNAL_SERVER_ERROR", error: error.message },
      });
    }
  };
};
