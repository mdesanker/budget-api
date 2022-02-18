import { Router } from "express";
import auth from "../../middleware/authMiddleware";
import userController from "../../controllers/user";
const user = Router();

user.get("/", userController.user);

export = user;
