import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

async function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ msg: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return res.status(403).json({ msg: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Authentication failed" });
  }
}

export { userMiddleware };
