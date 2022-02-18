import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import expenseController from "../../controllers/expense";
import validator from "../../utils/validator";
const expense = Router();

expense.get("/user", auth, expenseController.user);
expense.get("/:id", auth, expenseController.expense);
expense.post("/add", auth, validator.validateExpense, expenseController.add);

export = expense;
