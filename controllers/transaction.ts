import { Request, Response, NextFunction } from "express";

const allUserTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send("GET transactions test");
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { allUserTransactions };
