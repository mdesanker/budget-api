import app from "./app";
import request from "supertest";
import initializeTestServer from "../../utils/mongoTestConfig";
import mongoose from "mongoose";
import seedDB from "./seed";

// GLOBAL VARIABLES
let janeToken: string;
let johnToken: string;
const janeId: string = "620f8197b39ee93778ce738b";
const johnId: string = "620f8197b39ee93778ce738c";
const invalidUserId: string = "620f8197b39ee93778c00000";
const johnTransactionId: string = "6210cac500a322b6438c589b";
const johnExpenseId: string = "620ff22cc1e1d3cda631c3df";

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
describe("GET /user/detail", () => {
  it("return details for current user", async () => {
    const res = await request(app)
      .get("/user/detail")
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(janeId);
    expect(res.body.name.firstName).toEqual("Jane");
    expect(res.body.email).toEqual("jane@gmail.com");
    expect(res.body).not.toHaveProperty("password");
  });
});

describe("GET /user/:id", () => {
  it("return details for user", async () => {
    const res = await request(app).get(`/user/${janeId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(janeId);
    expect(res.body.name.firstName).toEqual("Jane");
    expect(res.body).not.toHaveProperty("password");
  });

  it("return error for invalid id", async () => {
    const res = await request(app).get(`/user/${invalidUserId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.errors[0].msg).toEqual("Invalid credentials");
  });
});

// PUT ROUTES
describe("PUT /user/update", () => {
  it("return updated user name and email", async () => {
    const res = await request(app)
      .put("/user/update")
      .send({
        firstName: "Janet",
        lastName: "Smith",
        email: "janet@gmail.com",
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name.firstName).toEqual("Janet");
    expect(res.body.email).toEqual("janet@gmail.com");
    expect(res.body._id).toEqual(janeId);
    expect(res.body).not.toHaveProperty("password");
  });

  it("return updated user if email doesn't change", async () => {
    const res = await request(app)
      .put("/user/update")
      .send({
        firstName: "Janetta",
        lastName: "Smurf",
        email: "janet@gmail.com",
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name.firstName).toEqual("Janetta");
    expect(res.body.email).toEqual("janet@gmail.com");
    expect(res.body._id).toEqual(janeId);
    expect(res.body).not.toHaveProperty("password");
  });

  it("return error for empty field", async () => {
    const res = await request(app)
      .put("/user/update")
      .send({
        firstName: "",
        lastName: "Smith",
        email: "janet@gmail.com",
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual("First name is required");
  });

  it("return error for email not unique", async () => {
    const res = await request(app)
      .put("/user/update")
      .send({
        firstName: "Janet",
        lastName: "Smith",
        email: "john@gmail.com",
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(409);
    expect(res.body.errors[0].msg).toEqual("Email already in use");
  });
});

// DELETE ROUTES
describe("DELETE /user/:id", () => {
  it("return error if invalid id", async () => {
    const res = await request(app)
      .delete(`/user/${invalidUserId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(404);
    expect(res.body.errors[0].msg).toEqual("Invalid user id");
  });

  it("return error if not the user", async () => {
    const res = await request(app)
      .delete(`/user/${johnId}`)
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(401);
    expect(res.body.errors[0].msg).toEqual("Invalid credentials");
  });

  it("return delete confirmation", async () => {
    const res = await request(app)
      .delete(`/user/${johnId}`)
      .set("x-auth-token", johnToken);

    const check = await request(app).get(`/user/${johnId}`);

    const transaction = await request(app).get(
      `/transaction/admin/${johnTransactionId}`
    );

    const expense = await request(app).get(`/expense/admin/${johnExpenseId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toEqual("User deleted");
    expect(check.statusCode).toEqual(404);
    expect(check.body.errors[0].msg).toEqual("Invalid credentials");
    expect(transaction.statusCode).toEqual(404);
    expect(transaction.body.errors[0].msg).toEqual("Invalid transaction id");
    expect(expense.statusCode).toEqual(404);
    expect(expense.body.errors[0].msg).toEqual("Invalid transaction id");
  });
});
