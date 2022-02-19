import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import transactionController from "../../controllers/transaction";
import validator from "../../middleware/validator";
const transaction = Router();

transaction.get("/user", auth, transactionController.allUserTransactions);
transaction.get("/:id", auth, transactionController.getTransaction);
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

export = transaction;
