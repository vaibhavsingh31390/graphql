import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./Helpers";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  const tokenFromCookie = req.cookies?.["session-token"];
  const token = tokenFromHeader || tokenFromCookie;
  if (!token) {
    return next();
  }
  try {
    const decoded = verifyToken(token);
    (req as any).auth = decoded;
  } catch (error) {
    console.error("Invalid token:", error);
  }
  next();
};
