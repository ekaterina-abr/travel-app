import jwt from "jsonwebtoken";
import "dotenv/config";
import type { NextFunction, Response, Request } from "express";

const auth = (
  req: Request & { user?: string | jwt.JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

export default auth;
