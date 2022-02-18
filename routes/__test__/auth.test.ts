import app from "./app";
import request from "supertest";
import initializeTestServer from "../../config/mongoTestConfig";
import mongoose from "mongoose";
import seedDB from "./seed";

// GLOBAL VARIABLES

// TEST SETUP
beforeAll(async () => {
  await initializeTestServer();
  await seedDB();
});

afterAll(() => {
  mongoose.connection.close();
});

// POST ROUTES
describe("POST /auth/register", () => {
  it("return token for new user", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "Michael",
      lastName: "TypeScript",
      email: "michael@email.com",
      password: "password",
      passwordConfirm: "password",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("return error for password mismatch", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "Michael",
      lastName: "TypeScript",
      email: "michael@email.com",
      password: "password",
      passwordConfirm: "drowssap",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual(
      "Password confirmation field must have the same value as the password field"
    );
  });

  it("return error for missing field", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "",
      lastName: "TypeScript",
      email: "michael@email.com",
      password: "password",
      passwordConfirm: "password",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toEqual("First name is required");
  });

  it("return error for email already associated with account", async () => {
    const res = await request(app).post("/auth/register").send({
      firstName: "Mike",
      lastName: "JavaScript",
      email: "michael@email.com",
      password: "password",
      passwordConfirm: "password",
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body.errors[0].msg).toEqual("Email already in use");
  });
});

describe("POST /auth/login", () => {
  it("return token for logged in user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "michael@email.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("return error for missing field", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "",
      password: "password",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error[0].msg).toEqual("Invalid credentials");
  });

  it("return error for invalid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "michael@email.com",
      password: "drowssap",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error[0].msg).toEqual("Invalid credentials");
  });
});
