import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./config/mongoConfig";

import authRouter from "./routes/api/auth";

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

const PORT = (process.env.PORT as string) || (process.env.DEV_PORT as string);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
