import { Router } from "express";
import authController from "../../controllers/auth";
const auth = Router();

auth.get("/", authController.register);

export = auth;
