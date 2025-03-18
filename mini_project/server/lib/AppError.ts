abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract status: string;
  abstract isOperational: boolean;
  abstract Errors: any[];

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AppError extends BaseError {
  statusCode: number;
  status: string;
  isOperational: boolean;
  Errors: any[];

  constructor(statusCode: number, message: string, Errors: any[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.isOperational = true;
    this.Errors = Errors || [];
  }
}
