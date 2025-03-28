import { Request, Response } from "express";
import { fetchJobByUserIdQl } from "../controller/jobsController";
import {
  createUser,
  deleteUser,
  fetchAllUsersQl,
  fetchUserByIdQl,
  loginUser,
  updateUser,
} from "../controller/usersController";
import {
  COOKIE_OPTIONS,
  generateToken,
  getContext,
  hashPassword,
  toIsoDate,
} from "../lib/Helpers";
import { Job, User } from "../model";

export const userResolvers = {
  user: async (_parent: any, args: { id: string }) => {
    const user = await fetchUserByIdQl(args.id);
    return user;
  },
  users: async () => {
    const users = await fetchAllUsersQl();
    return users;
  },
  me: async (_parent: any, _args: {}, { req }: { req: Request }) => {
    const { auth } = getContext(req, true);
    const user = await fetchUserByIdQl((auth as any).userId);
    return user;
  },
};

export const userMutation = {
  createUser: async (
    _parent: any,
    { input }: { input: { name: string; email: string; password: string } },
    { res }: { res: Response }
  ) => {
    const hashedPassword = await hashPassword(input.password);
    const user = await createUser(input.name, input.email, hashedPassword);
    const token = generateToken(user.id);
    res.cookie("session-token", token, COOKIE_OPTIONS);
    return user;
  },
  loginUser: async (
    _parent: any,
    { input }: { input: { email: string; password: string } },
    { res }: { res: Response }
  ) => {
    const user = await loginUser(input.email, input.password);
    const token = generateToken((user as any).id);
    res.cookie("session-token", token, COOKIE_OPTIONS);
    return user;
  },
  deleteUser: async (_parent: any, { id }: { id: string }) => {
    const job = await deleteUser(id);
    return job;
  },
  updateUser: async (
    _parent: any,
    { id, input }: { id: string; input: { email?: string; password?: string } }
  ) => {
    const job = await updateUser(id, input);
    return job;
  },
};

export const userFieldsMod = {
  User: {
    jobs: async (user: any): Promise<Job[] | null> => {
      return await fetchJobByUserIdQl(user.id);
    },
    date: (job: any) => toIsoDate(job.createdAt),
  },
};
