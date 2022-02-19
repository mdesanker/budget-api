import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import transactionController from "../../controllers/transaction";
const transaction = Router();

transaction.get("/user", auth, transactionController.allUserTransactions);
transaction.get("/:id", auth, transactionController.getTransaction);

export = transaction;
