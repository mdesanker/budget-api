import express from "express";
import authRouter from "../api/auth";

const app = express();

app.use("/auth", authRouter);

export default app;
