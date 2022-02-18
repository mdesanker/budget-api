import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validateExpense = [
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

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    next();
  },
];

export default { validateExpense };
