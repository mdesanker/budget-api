import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get user
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { user };
