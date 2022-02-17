import { Request, Response, NextFunction } from "express";

const register = [
  // Validate and sanitize input

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("GET auth test");
  },
];

export default { register };
