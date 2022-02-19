import app from "./app";
import request from "supertest";
import initializeTestServer from "../../utils/mongoTestConfig";
import mongoose from "mongoose";
import seedDB from "./seed";
import faker from "@faker-js/faker";
import { DateTime } from "luxon";

// GLOBAL VARIABLES
let janeToken: string;
let johnToken: string;
const janeId: string = "620f8197b39ee93778ce738b";
const johnId: string = "620f8197b39ee93778ce738c";
const invalidUserId: string = "620f8197b39ee93778c00000";
const janeExpenseId: string = "620ff22cc1e1d3cda631c3de";
const johnExpenseId: string = "620ff22cc1e1d3cda631c3df";
const invalidExpenseId: string = "620ff22cc1e1d3cda6300000";

// TEST SETUP
beforeAll(async () => {
  await initializeTestServer();
  await seedDB();

  // Login jane
  const janeLogin = await request(app).post("/auth/login").send({
    email: "jane@gmail.com",
    password: "password",
  });

  janeToken = janeLogin.body.token;

  // Login john
  const johnLogin = await request(app).post("/auth/login").send({
    email: "john@gmail.com",
    password: "password",
  });

  johnToken = johnLogin.body.token;
});

afterAll(() => {
  mongoose.connection.close();
});

// GET ROUTES
describe("GET /expense/user", () => {
  it("return array of expenses for user", async () => {
    const res = await request(app)
      .get("/expense/user")
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /expense/:id", () => {
  it("return specific expense", async () => {
    const res = await request(app)
      .get(`/expense/${janeExpenseId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.user._id).toEqual(janeId);
    expect(res.body).toHaveProperty("income");
  });

  it("return error for invalid expense id", async () => {
    const res = await request(app)
      .get(`/expense/${invalidExpenseId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(404);
    expect(res.body.errors[0].msg).toEqual("Invalid expense id");
  });

  it("return error for not user's expense", async () => {
    const res = await request(app)
      .get(`/expense/${johnExpenseId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(401);
    expect(res.body.errors[0].msg).toEqual("Invalid credentials");
  });
});

// POST ROUTES
describe("POST /expense/add", () => {
  it("return new expense", async () => {
    const res = await request(app)
      .post("/expense/add")
      .send({
        date: DateTime.now(),
        income: [{ name: "Job2", amount: 9500 }],
        housing: [{ name: "Apartment", amount: 1200 }],
        food: [
          { name: "Groceries", amount: 700 },
          { name: "Dining out", amount: 350 },
        ],
        utilities: [
          { name: "Electricity", amount: 800 },
          { name: "Water", amount: 30 },
          { name: "Gas", amount: 30 },
        ],
        healthcare: [],
        loans: [],
        subscriptions: [],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toEqual(janeId);
    expect(res.body).toHaveProperty("housing");
  });

  it("return error if field missing", async () => {
    const res = await request(app)
      .post("/expense/add")
      .send({
        date: DateTime.now(),
        income: [{ name: "Job3", amount: 9500 }],
        housing: [{ name: "", amount: 1200 }],
        food: [],
        utilities: [],
        healthcare: [],
        loans: [],
        subscriptions: [],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual(
      "Each housing source requires a name"
    );
  });
});

// PUT ROUTES
describe("PUT /expense/:id", () => {
  it("return updated expenses", async () => {
    const res = await request(app)
      .put(`/expense/${janeExpenseId}`)
      .send({
        date: DateTime.now(),
        income: [{ name: "Self-Employed", amount: 500 }],
        housing: [{ name: "Parent's basement", amount: 100 }],
        food: [{ name: "Chicken tendies", amount: 450 }],
        utilities: [],
        healthcare: [{ name: "Mountain Dew", amount: 300 }],
        loans: [],
        subscriptions: [],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(janeExpenseId);
    expect(res.body).toHaveProperty("income");
    expect(res.body.income[0].name).toEqual("Self-Employed");
  });

  it("return error if not user's expense", async () => {
    const res = await request(app)
      .put(`/expense/${johnExpenseId}`)
      .send({
        date: DateTime.now(),
        income: [{ name: "Self-Employed", amount: 500 }],
        housing: [{ name: "Parent's basement", amount: 100 }],
        food: [{ name: "Chicken tendies", amount: 450 }],
        utilities: [],
        healthcare: [{ name: "Mountain Dew", amount: 300 }],
        loans: [],
        subscriptions: [],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(401);
    expect(res.body.errors[0].msg).toEqual("Invalid credentials");
  });

  it("return error for missing field", async () => {
    const res = await request(app)
      .put(`/expense/${janeExpenseId}`)
      .send({
        date: DateTime.now(),
        income: [{ name: "Self-Employed", amount: 500 }],
        housing: [{ name: "Parent's basement", amount: 100 }],
        food: [{ name: "Chicken tendies" }],
        utilities: [],
        healthcare: [{ name: "Mountain Dew", amount: 300 }],
        loans: [],
        subscriptions: [],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual(
      "Each food source requires an amount"
    );
  });

  it("return error for invalid expense id", async () => {
    const res = await request(app)
      .put(`/expense/${invalidExpenseId}`)
      .send({
        date: DateTime.now(),
        income: [{ name: "Self-Employed", amount: 500 }],
        housing: [{ name: "Parent's basement", amount: 100 }],
        food: [{ name: "Chicken tendies", amount: 450 }],
        utilities: [],
        healthcare: [{ name: "Mountain Dew", amount: 300 }],
        loans: [],
        subscriptions: [],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(404);
    expect(res.body.errors[0].msg).toEqual("Invalid expense id");
  });
});
