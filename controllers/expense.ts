import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { Types } from "mongoose";
import Expense, { IExpense } from "../models/Expense";
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

const add = [
  // Validate and sanitize input
  check("date").isISO8601(),
  check("income.*.name", "Each income source requires a name")
    .trim()
    .notEmpty(),
  check("income.*.amount", "Each income source requires an amount")
    .trim()
    .notEmpty()
    .isNumeric(),
  check("housing.*.name", "Each housing source requires a name")
    .trim()
    .notEmpty(),
  check("housing.*.amount", "Each housing source requires an amount")
    .trim()
    .notEmpty()
    .isNumeric(),
  check("food.*.name", "Each food source requires a name").trim().notEmpty(),
  check("food.*.amount", "Each food source requires an amount")
    .trim()
    .notEmpty()
    .isNumeric(),
  check("utilities.*.name", "Each utility source requires a name")
    .trim()
    .notEmpty(),
  check("utilities.*.amount", "Each utility source requires an amount")
    .trim()
    .notEmpty()
    .isNumeric(),
  check("healthcare.*.name", "Each healthcare source requires a name")
    .trim()
    .notEmpty(),
  check("healthcare.*.amount", "Each healthcare source requires an amount")
    .trim()
    .notEmpty()
    .isNumeric(),
  check("loans.*.name", "Each loan source requires a name").trim().notEmpty(),
  check("loans.*.amount", "Each loan source requires an amount")
    .trim()
    .notEmpty()
    .isNumeric(),
  check("subscriptions.*.name", "Each subscription source requires a name")
    .trim()
    .notEmpty(),
  check("subscriptions.*.amount", "Each subscription source requires an amount")
    .trim()
    .notEmpty()
    .isNumeric(),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

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

      res.status(201).json(expense);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).send("Server error");
      }
    }
  },
];

export default { user, expense, add };
