import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./utils/mongoConfig";

import authRouter from "./routes/api/auth";
import userRouter from "./routes/api/user";
import expenseRouter from "./routes/api/expense";
import transactionRouter from "./routes/api/transaction";

const app = express();

connectDB();

app.use(
  cors({
    origin: [/\localhost/, /\mdesanker.github.io/],
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/expense", expenseRouter);
app.use("/transaction", transactionRouter);

app.get("/", (req: Request, res: Response) =>
  res.send("REST API for Budget Tracking App")
);

const PORT = (process.env.PORT as string) || (process.env.DEV_PORT as string);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
