import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import expenseController from "../../controllers/expense";
const expense = Router();

expense.get("/user/:id", expenseController.all);

export = expense;
