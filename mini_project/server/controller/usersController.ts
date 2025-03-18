import { NextFunction, Request, Response } from "express";
import AppResponse from "../lib/AppResponse";
import { catchAsync, catchAsyncGQl } from "../lib/CatchAsync";
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

export const fetchAllUsersQl = catchAsyncGQl(
  async (): Promise<User[] | null> => {
    const users = await User.findAll();
    return users;
  }
);

export const fetchUserByIdQl = catchAsyncGQl(
  async (id: string | number): Promise<User | null> => {
    const user = await User.findByPk(id);
    return user;
  }
);

export const fetchUserByCompanyIdQl = catchAsyncGQl(
  async (id: string | number): Promise<User[] | null> => {
    const users = await User.findAll({
      where: {
        companyId: id,
      },
    });
    return users;
  }
);

export const createUser = catchAsyncGQl(
  async (
    name: string,
    email: string,
    password: string,
    companyId: string
  ): Promise<User | null> => {
    const user = await User.create({
      companyId,
      name,
      email,
      password,
    });
    return user;
  }
);

export const deleteUser = catchAsyncGQl(
  async (id: string): Promise<User | Error | null> => {
    const user = await User.findByPk(id);
    if (!user) return new Error(`user:${id} not found`);
    await user.destroy();
    return user;
  }
);

export const updateUser = catchAsyncGQl(
  async (
    id: string,
    updates: Partial<{ title: string; description: string; companyId: string }>
  ): Promise<User | Error | null> => {
    const user = await User.findByPk(id);
    if (!user) return new Error(`User:${id} not found`);
    await user.update(updates);
    return user;
  }
);
