import { Request, Response, NextFunction } from "express";

const user = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("GET user test");
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { user };
