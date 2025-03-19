import { cookies } from "next/headers";
import { jwtVerify } from "jose";

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

export const getAndSanitizeCookie = (
  setCookieHeader: string | null
): string | null => {
  if (!setCookieHeader) {
    return null;
  }
  const decodedCookieHeader = decodeURIComponent(setCookieHeader);
  const tokenPart = decodedCookieHeader.split(";")[0];
  const sessionToken = tokenPart.split("=")[1];
  return sessionToken?.trim() || null;
};

export const verifyToken = async (token: string) => {
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "");
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return false;
  }
};

export const getValidSession = async () => {
  const jwtCookie = (await cookies()).get("session-token");
  if (!jwtCookie) {
    return false;
  }
  const decodedToken = await verifyToken(jwtCookie.value);
  if (!decodedToken) {
    return false;
  }
  return decodedToken;
};
