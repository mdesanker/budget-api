import faker from "@faker-js/faker";
import { Types } from "mongoose";
import User, { IUser } from "../../models/User";
import Expense, { IExpense } from "../../models/Expense";
import Transaction, { ITransaction } from "../../models/Transaction";
import { DateTime } from "luxon";

const users: any[] = [];
const expenses: any[] = [];
const transactions: any[] = [];

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
    _id: "620ff22cc1e1d3cda631c3de",
    user: new Types.ObjectId("620f8197b39ee93778ce738b"), // Jane
    date: faker.date.past(),
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

const generateJohnExpenses = () => {
  const expense = new Expense<IExpense>({
    _id: "620ff22cc1e1d3cda631c3df",
    user: new Types.ObjectId("620f8197b39ee93778ce738c"), // John
    date: faker.date.past(),
    income: [{ name: "PNC Bank", amount: 3500 }],
    housing: [{ name: "Apartment", amount: 600 }],
    food: [
      { name: "Groceries", amount: 400 },
      { name: "Dining out", amount: 50 },
    ],
    utilities: [
      { name: "Electricity", amount: 800 },
      { name: "Water", amount: 30 },
      { name: "Gas", amount: 30 },
    ],
    healthcare: [],
    loans: [],
    subscriptions: [{ name: "Amazon", amount: 120 }],
  });

  expenses.push(expense);
};

// TRANSACTIONS
const generateJaneTransaction = () => {
  const transaction = new Transaction<ITransaction>({
    _id: "6210cac500a322b6438c589a",
    user: new Types.ObjectId("620f8197b39ee93778ce738b"), // Jane
    description: "Friday night dinner",
    merchant: "Kroger",
    amount: -75,
    category: "Groceries",
    date: DateTime.now(),
  });

  transactions.push(transaction);
};

const generateJohnTransaction = () => {
  const transaction = new Transaction<ITransaction>({
    _id: "6210cac500a322b6438c589b",
    user: new Types.ObjectId("620f8197b39ee93778ce738c"), // John
    description: "Monthly phone bill",
    merchant: "AT&T",
    amount: -45,
    category: "Bills & Utilities",
    date: DateTime.now(),
  });

  transactions.push(transaction);
};

const generateWeekTransaction = () => {
  const transaction = new Transaction<ITransaction>({
    _id: "6210cac500a322b6438c589c",
    user: new Types.ObjectId("620f8197b39ee93778ce738b"), // Jane
    description: faker.commerce.productName(),
    merchant: faker.company.companyName(),
    amount: -faker.commerce.price(),
    category: "Groceries",
    date: DateTime.fromISO("2022-02-17T08:30:00.494Z"),
  });

  transactions.push(transaction);
};

const generateMonthTransaction = () => {
  const transaction = new Transaction<ITransaction>({
    _id: "6210cac500a322b6438c589d",
    user: new Types.ObjectId("620f8197b39ee93778ce738b"), // Jane
    description: faker.commerce.productName(),
    merchant: faker.company.companyName(),
    amount: -faker.commerce.price(),
    category: "Groceries",
    date: DateTime.fromISO("2022-02-01T08:30:00.494Z"),
  });

  transactions.push(transaction);
};

const generateYearTransaction = () => {
  const transaction = new Transaction<ITransaction>({
    _id: "6210cac500a322b6438c589e",
    user: new Types.ObjectId("620f8197b39ee93778ce738b"), // Jane
    description: faker.commerce.productName(),
    merchant: faker.company.companyName(),
    amount: -faker.commerce.price(),
    category: "Groceries",
    date: DateTime.fromISO("2021-11-12T08:30:00.494Z"),
  });

  transactions.push(transaction);
};

// SEED DB
const seedDB = async () => {
  generateJane();
  generateJohn();

  generateJaneExpenses();
  generateJohnExpenses();

  generateJaneTransaction();
  generateJohnTransaction();
  generateWeekTransaction();
  generateMonthTransaction();
  generateYearTransaction();

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

  for (let transaction of transactions) {
    try {
      await transaction.save();
    } catch (err) {
      err;
    }
  }

  // console.log(users);
  // console.log(expenses);
  // console.log(transactions);
  return;
};

export default seedDB;
