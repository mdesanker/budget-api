import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import userController from "../../controllers/user";
const user = Router();

user.get("/detail", auth, userController.getCurrentUser);
user.get("/:id", userController.getUser);
user.delete("/:id", auth, userController.deleteUser);

export = user;
