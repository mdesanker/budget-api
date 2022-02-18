import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import userController from "../../controllers/user";
const user = Router();

user.get("/detail", auth, userController.user);

export = user;
