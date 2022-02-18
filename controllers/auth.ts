import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Check account exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
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
};

export default { registerUser, loginUser };
