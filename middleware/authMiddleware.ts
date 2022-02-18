import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
  }

  // Verify token
  try {
    const decoded: any = jwt.verify(token!, process.env.KEY as string);
    console.log(decoded);

    req.user = decoded.user;
    next();
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }
  }
};

export = authMiddleware;
