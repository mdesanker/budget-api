import { Request, Response, NextFunction } from "express";
import Transaction from "../models/Transaction";

const allUserTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transations = await Transaction.find({ user: req.user.id });

    console.log(transations);
    res.json(transations);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { allUserTransactions };
