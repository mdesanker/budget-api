import { Router } from "express";
import authController from "../../controllers/auth";
import validator from "../../middleware/validator";
const auth = Router();

auth.post("/register", validator.registerUser, authController.registerUser);
auth.post("/login", validator.loginUser, authController.loginUser);

export = auth;
