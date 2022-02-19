import { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";
import Transaction from "../models/Transaction";
import User from "../models/User";

const allUserTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transations = await Transaction.find({ user: req.user.id }).sort({
      date: "desc",
    });

    res.json(transations);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Check id is valid
    const transaction = await Transaction.findById(id).populate(
      "user",
      "-password"
    );

    if (!transaction) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Invalid transaction id" }] });
    }

    // Check user is owner
    const user = await User.findById(req.user.id);

    const isOwner = user?.id === transaction.user.id;

    if (!isOwner) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Return transaction
    res.json(transaction);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const getUserTransactionsTimePeriod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { days } = req.params;

  const isNum = parseInt(days);

  if (!isNum || isNum <= 0) {
    return res.status(422).json({ errors: [{ msg: "Invalid time period" }] });
  }

  try {
    const now: Date = new Date();

    const transations = await Transaction.find({
      user: req.user.id,
      date: {
        $gte: new Date(now.getTime() - 1000 * 60 * 60 * 24 * parseInt(days)),
        $lt: new Date(),
      },
    }).sort({ date: "desc" });

    res.json(transations);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default {
  allUserTransactions,
  getTransaction,
  getUserTransactionsTimePeriod,
};
