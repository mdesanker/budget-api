import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const register = [
  // Validate and sanitize input
  check("firstName", "First name is required").trim().notEmpty().escape(),
  check("lastName", "Last name is required").trim().notEmpty().escape(),
  check("email", "Email is required").trim().notEmpty().isEmail(),
  check("password", "Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
  check(
    "passwordConfirm",
    "Password confirmation field must have the same value as the password field"
  )
    .notEmpty()
    .custom((value, { req }) => value === req.body.password),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    // Handle input errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      // Check email is uique
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ errors: [{ msg: "Email already in use" }] });
      }

      // Create new user
      const user = new User<IUser>({
        name: {
          firstName,
          lastName,
        },
        email,
        password,
      });

      user.password = await bcrypt.hash(password, 10);

      await user.save();

      // Generate jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, process.env.KEY as string, {
        expiresIn: "6h",
      });

      res.status(201).json({ token });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).send("Server error");
      }
    }
  },
];

const login = [
  // Validate and sanitize input
  check("email").escape(),
  check("password").escape(),

  // Process input
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      // Check account exists
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Generate token
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, process.env.KEY as string, {
        expiresIn: "6h",
      });

      res.json({ token });
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.status(500).send("Server error");
      }
    }
  },
];

export default { register, login };
