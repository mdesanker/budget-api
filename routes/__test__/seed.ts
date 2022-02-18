import faker from "@faker-js/faker";
import { Types } from "mongoose";
import User, { IUser } from "../../models/User";
import Expense, { IExpense } from "../../models/Expense";

const users: any[] = [];
const expenses: any[] = [];

// USERS
const generateJane = () => {
  const user = new User<IUser>({
    _id: "620f8197b39ee93778ce738b",
    name: {
      firstName: "Jane",
      lastName: "Smith",
    },
    email: "jane@gmail.com",
    password: "$2a$10$dexhl0xuphcSioluvPGFk.FsLMe3uhhy/AjKCYeeBnaXRDfXrumZ.", // "password" hashed
  });

  users.push(user);
};

const generateJohn = () => {
  const user = new User<IUser>({
    _id: "620f8197b39ee93778ce738c",
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    email: "john@gmail.com",
    password: "$2a$10$dexhl0xuphcSioluvPGFk.FsLMe3uhhy/AjKCYeeBnaXRDfXrumZ.", // "password" hashed
  });

  users.push(user);
};

// EXPENSES
const generateJaneExpenses = () => {
  const expense = new Expense<IExpense>({
    user: new Types.ObjectId("620f8197b39ee93778ce738b"), // Jane
    date: faker.date.recent(),
    income: [{ name: "Job1", amount: 5000 }],
    housing: [{ name: "Apartment", amount: 700 }],
    food: [
      { name: "Groceries", amount: 400 },
      { name: "Dining out", amount: 200 },
    ],
    utilities: [
      { name: "Electricity", amount: 130 },
      { name: "Water", amount: 50 },
      { name: "Gas", amount: 35 },
    ],
    healthcare: [{ name: "HDHP", amount: 15 }],
    loans: [{ name: "Car", amount: 300 }],
    subscriptions: [
      { name: "Amazon", amount: 120 },
      { name: "Spotify", amount: 10 },
    ],
  });

  expenses.push(expense);
};

// SEED DB
const seedDB = async () => {
  generateJane();
  generateJohn();

  generateJaneExpenses();

  for (let user of users) {
    try {
      await user.save();
    } catch (err) {
      err;
    }
  }

  for (let expense of expenses) {
    try {
      await expense.save();
    } catch (err) {
      err;
    }
  }

  // console.log(users);
  console.log(expenses);
  return;
};

export default seedDB;
