import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
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

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    // Check id valid
    const account = await User.findById(id).select("-password");

    if (!account) {
      return res.status(404).json({ errors: [{ msg: "Invalid user id" }] });
    }

    // Check user is owner
    const user = await User.findById(req.user.id).select("-password");

    const isMatch = account.id === user?.id;

    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Delete user
    await User.findByIdAndDelete(id);

    res.json({ msg: "User deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { getCurrentUser, getUser, deleteUser };
