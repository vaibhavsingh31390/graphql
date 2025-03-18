import { NextFunction, Request, Response } from "express";
import AppResponse from "../lib/AppResponse";
import { catchAsync } from "../lib/CatchAsync";
import { User } from "../model";
import { AppError } from "../lib/AppError";

export const fetchAllUsersRest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();
    if (!users.length) {
      return next(new AppError(404, "Users not found."));
    }
    return AppResponse.success(res, "Users fetched successfully", users);
  }
);

export const fetchAllUsersQl = async (): Promise<User[] | null> => {
  const users = await User.findAll();
  return users;
};

export const fetchUserByIdQl = async (
  id: string | number
): Promise<User | null> => {
  const user = await User.findByPk(id);
  return user;
};

export const fetchUserByCompanyIdQl = async (
  id: string | number
): Promise<User[] | null> => {
  const users = await User.findAll({
    where: {
      companyId: id,
    },
  });
  return users;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  const companyId = "2";
  const user = await User.create({
    companyId,
    name,
    email,
    password,
  });
  return user;
};
