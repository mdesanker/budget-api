import { Request, Response, NextFunction } from "express";
import Expense from "../models/Expense";
import User from "../models/User";

const user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    res.json(expenses);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const expense = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    // Check id valid
    const expense = await Expense.findById(id).populate("user", "-password");

    if (!expense) {
      return res.status(404).json({ errors: [{ msg: "Invalid expense id" }] });
    }

    // Check user is owner
    const user = await User.findById(req.user.id);

    const isOwner = user?.id === expense.user.id;

    if (!isOwner) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Return expense
    res.json(expense);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { user, expense };
