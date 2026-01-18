import "dotenv/config";
import jwt from "jsonwebtoken";
import { type IUserSchemeInstance } from "../models/user.ts";
import type { IApolloContext } from "../types.ts";
import type { CookieOptions } from "express";

export const sessionCookieName = "session";
export const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
};

export const signJWT = (user: IUserSchemeInstance) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;
  } catch (err) {
    console.log("Failed to verify session");
    return null;
  }
};

export const createSession = async (
  user: IUserSchemeInstance,
  setSession: IApolloContext["setSession"]
) => {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const token = signJWT(user);
  setSession(token, expiresAt);
  return token;
};

export const deleteSession = async (
  setSession: IApolloContext["setSession"]
) => {
  setSession("", new Date(0));
};

export const verifySession = async (
  session: IApolloContext["session"]
): Promise<{ isAuth: boolean; userId?: number }> => {
  const sessionPayload = verifyJWT(session);

  if (!sessionPayload?.userId) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: sessionPayload.userId };
};
