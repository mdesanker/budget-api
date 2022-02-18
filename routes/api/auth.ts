import { Router } from "express";
import authController from "../../controllers/auth";
const auth = Router();

auth.post("/register", authController.register);

export = auth;
