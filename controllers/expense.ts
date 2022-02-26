import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Expense, { IExpense } from "../models/Expense";
import User from "../models/User";

const getUserExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate("user");

    res.json(expenses);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const getExpense = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    // Check id valid
    const expense = await Expense.findById(id).populate("user");

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

const adminGetExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    // Check valid id
    const expense = await Expense.findById(id).populate("user");

    if (!expense) {
      return res.status(404).json({ errors: [{ msg: "Invalid expense id" }] });
    }

    res.json(expense);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const addExpense = async (req: Request, res: Response, next: NextFunction) => {
  const {
    date,
    income,
    housing,
    food,
    utilities,
    healthcare,
    loans,
    subscriptions,
  } = req.body;

  try {
    // Create new expense object
    const expense = new Expense<IExpense>({
      user: new Types.ObjectId(req.user.id),
      date,
      income,
      housing,
      food,
      utilities,
      healthcare,
      loans,
      subscriptions,
    });

    await expense.save();

    await Expense.populate(expense, { path: "user" });

    res.status(201).json(expense);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const {
    date,
    income,
    housing,
    food,
    utilities,
    healthcare,
    loans,
    subscriptions,
  } = req.body;

  try {
    // Check id valid
    const expense = await Expense.findById(id).populate("user");

    if (!expense) {
      return res.status(404).json({ errors: [{ msg: "Invalid expense id" }] });
    }

    // Check user is owner
    const user = await User.findById(req.user.id);

    const isOwner = user?.id === expense.user.id;

    if (!isOwner) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Update expense
    const updatedExpense = new Expense<IExpense>({
      _id: id,
      user: new Types.ObjectId(req.user.id),
      date,
      income,
      housing,
      food,
      utilities,
      healthcare,
      loans,
      subscriptions,
    });

    const update = await Expense.findByIdAndUpdate(id, updatedExpense, {
      new: true,
    }).populate("user");

    res.status(200).json(update);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    // Delete expense
    await Expense.findByIdAndRemove(id);

    res.json({ msg: "Expense deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default {
  getUserExpenses,
  getExpense,
  adminGetExpense,
  addExpense,
  updateExpense,
  deleteExpense,
};
