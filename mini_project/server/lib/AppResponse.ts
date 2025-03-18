import { Response } from "express";
import { HTTP_STATUS_CODES } from "./Constants";

class AppResponse<T = any> {
  private statusCode: number;
  private status: string;
  private message: string;
  private data?: T;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("2") ? "Success" : "Fail";
    this.message = message;
    this.data = data;
  }

  send(res: Response) {
    return res.status(this.statusCode).json({
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }

  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = HTTP_STATUS_CODES.OK
  ) {
    return new AppResponse(statusCode, message, data).send(res);
  }
}

export default AppResponse;
