import app, { response } from "./app";
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
const janeTransactionId: string = "6210cac500a322b6438c589a";
const johnTransactionId: string = "6210cac500a322b6438c589b";
const invalidTransactionId: string = "6210cac500a322b643800000";

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
describe("GET /transaction/user", () => {
  it("return all transactions for current user", async () => {
    const res = await request(app)
      .get("/transaction/user")
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].user).toEqual(janeId);
  });
});

describe("GET /transaction/:id", () => {
  it("return transaction by id", async () => {
    const res = await request(app)
      .get(`/transaction/${janeTransactionId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(janeTransactionId);
    expect(res.body.user._id).toEqual(janeId);
    expect(res.body).toHaveProperty("description");
  });

  it("return error for invalid transaction id", async () => {
    const res = await request(app)
      .get(`/transaction/${invalidTransactionId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(404);
    expect(res.body.errors[0].msg).toEqual("Invalid transaction id");
  });

  it("return error for not user's transaction", async () => {
    const res = await request(app)
      .get(`/transaction/${johnTransactionId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(401);
    expect(res.body.errors[0].msg).toEqual("Invalid credentials");
  });
});

describe("GET /transaction/user/:days", () => {
  it("return user transactions for today", async () => {
    const res = await request(app)
      .get(`/transaction/user/1`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(1);
    expect(res.body[0].user).toEqual(janeId);
  });

  it("return user transactions previous week", async () => {
    const res = await request(app)
      .get(`/transaction/user/7`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(2);
    expect(res.body[0].user).toEqual(janeId);
  });

  it("return user transactions previous month", async () => {
    const res = await request(app)
      .get(`/transaction/user/30`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(3);
    expect(res.body[0].user).toEqual(janeId);
  });

  it("return error for invalid number entry", async () => {
    const res = await request(app)
      .get(`/transaction/user/-9`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual("Invalid time period");
  });

  it("return error for invalid letter entry", async () => {
    const res = await request(app)
      .get(`/transaction/user/abc9`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual("Invalid time period");
  });
});
