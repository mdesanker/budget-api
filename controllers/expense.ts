import { Request, Response, NextFunction } from "express";

const all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check id is valid
    res.send("GET expense test");
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

export default { all };
