import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  auth?: unknown;
}

export const JWT_SECRET =
  process.env.JWT_SECRET ||
  "c13a006afc8633acca529cc7b2f6fff57b6ffb08cdfa0370c74237ceb7cb18920037d70030a16108a0fef2179e5f0f7f228743b08751d536f4af9446a90bfe06da88122d07ccd0d50ed2fa9b96557a1958b66a7dfd3fc15adcd8a9c1e1f4c03b7fc9f7ad219c327097817c1b36b7e684e096cb5fcf6d9d797c6c5387d7659b71181703946339a912810e530d4db79947eae2f34527ce2dda6b0bbb1b5410ccba0da88d2bbceadc47e50ab361ce7751d6f233228c88ab51cbaf43a59d56ca1e6481be745750281ad5bec0dc139810ebd0af2eaffbd2927f69c480582ef3055ab37af67a46be847a0105188aa284d70341a1d8cfc9457933c930db99da49bd0980";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.APP_ENV != "dev",
  sameSite: (process.env.APP_ENV === "dev" ? "lax" : "none") as
    | "none"
    | "lax"
    | "strict",
  maxAge: (Number(process.env.COOKIE_MAX_AGE) || 7 * 24 * 60 * 60) * 1000,
  path: "/",
};

export const toIsoDate = (timestamp: Date | string | number): string => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "----/--/--";
  }
  return date.toISOString().slice(0, 10);
};

export const GraphQlNotFoundCheck = (data: any, SchemaName: string) => {
  if (!data) {
    throw new GraphQLError(`${SchemaName} not found!`, {
      extensions: { code: "NOT_FOUND" },
    });
  } else {
    return data;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const getContext = (req: AuthenticatedRequest) => {
  return { auth: req.auth || null };
};
