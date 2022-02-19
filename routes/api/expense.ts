import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import expenseController from "../../controllers/expense";
import validator from "../../middleware/validator";
const expense = Router();

expense.get("/user", auth, expenseController.getUserExpenses);
expense.get("/:id", auth, expenseController.getExpense);
expense.post(
  "/add",
  auth,
  validator.validateExpense,
  expenseController.addExpense
);
expense.put(
  "/:id",
  auth,
  validator.validateExpense,
  expenseController.updateExpense
);
expense.delete("/:id", auth, expenseController.deleteExpense);

export = expense;
