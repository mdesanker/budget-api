import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const registerUser = [
  // Validate and sanitize input
  check("firstName", "First name is required").trim().notEmpty().escape(),
  check("lastName", "Last name is required").trim().notEmpty().escape(),
  check("email", "Email is required").trim().notEmpty().isEmail(),
  check("password", "Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
  check(
    "passwordConfirm",
    "Password confirmation field must have the same value as the password field"
  )
    .notEmpty()
    .custom((value, { req }) => value === req.body.password),

  // Error handling
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

const loginUser = [
  // Validate and sanitize input
  check("email").escape(),
  check("password").escape(),

  // Error handling
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

const validateExpense = [
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

  // Error handling
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

const validateTransaction = [
  // Validate and sanitize input
  check("description", "Description is required").trim().notEmpty(),
  check("merchant", "Merchant is required").trim().notEmpty(),
  check("amount", "Amount is required")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Amount must be a number"),
  check("type", "Type is required").trim().notEmpty(),
  check("category", "Category is required").trim().notEmpty(),
  check("date").isISO8601(),

  // Error handling
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

export default {
  registerUser,
  loginUser,
  validateExpense,
  validateTransaction,
};
