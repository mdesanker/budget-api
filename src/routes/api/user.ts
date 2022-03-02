import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import userController from "../../controllers/user";
import validator from "../../middleware/validator";
const user = Router();

user.get("/detail", auth, userController.getCurrentUser);
user.get("/:id", userController.getUser);
user.put("/update", auth, validator.updateUser, userController.updateUser);
user.delete("/:id", auth, userController.deleteUser);

export = user;
