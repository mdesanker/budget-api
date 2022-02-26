import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import transactionController from "../../controllers/transaction";
import validator from "../../middleware/validator";
const transaction = Router();

transaction.get("/user", auth, transactionController.allUserTransactions);
transaction.get("/:id", auth, transactionController.getTransaction);
transaction.get("/admin/:id", transactionController.adminGetTransaction);
transaction.get(
  "/user/:days",
  auth,
  transactionController.getUserTransactionsTimePeriod
);
transaction.post(
  "/add",
  auth,
  validator.validateTransaction,
  transactionController.addTransaction
);
transaction.put(
  "/edit/:id",
  auth,
  validator.validateTransaction,
  transactionController.editTransaction
);
transaction.delete("/:id", auth, transactionController.deleteTransaction);

export = transaction;
