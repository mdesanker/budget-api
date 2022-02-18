import { Request, Response, NextFunction } from "express";
import Expense from "../models/Expense";

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

export default { user };
