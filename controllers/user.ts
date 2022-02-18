import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const current = async (req: Request, res: Response, next: NextFunction) => {
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

const user = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    // Check id valid
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    res.json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { current, user };
