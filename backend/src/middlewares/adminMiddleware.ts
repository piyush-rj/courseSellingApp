import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

declare module "express-serve-static-core" {
  interface Request {
    adminId?: string;
  }
}

async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(403).json({ msg: "No token provided" });
      return;
    }
  
    const token = authHeader.replace("Bearer ", "");
  
    try {
      const decoded = jwt.verify(token, SECRET) as JwtPayload;
  
      if (!decoded || typeof decoded !== "object" || !decoded.adminId) {
        res.status(403).json({ msg: "Invalid token" });
        return;
      }
  
      req.adminId = decoded.adminId;
      next();
    } catch (err) {
      res.status(403).json({ msg: "Authentication failed" });
    }
  }
  
export { adminMiddleware };
