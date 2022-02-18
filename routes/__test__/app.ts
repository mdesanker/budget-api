import express from "express";
import authRouter from "../api/auth";
import userRouter from "../api/user";
import expenseRouter from "../api/expense";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/expense", expenseRouter);

export = app;
