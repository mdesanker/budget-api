import app from "./app";
import request from "supertest";
import initializeTestServer from "../../config/mongoTestConfig";
import mongoose from "mongoose";

// GLOBAL VARIABLES

// TEST SETUP
beforeAll(async () => {
  await initializeTestServer();
});

afterAll(() => {
  mongoose.connection.close();
});

// POST ROUTES
describe("POST /auth/register", () => {
  it("return new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: {
          firstName: "Michael",
          lastName: "TypeScript",
        },
        email: "michael@email.com",
        password: "password",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name.firstName).toEqual("Michael");
    expect(res.body.name.lastName).toEqual("TypeScript");
  });

  it("return error for missing field", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: {
          firstName: "",
          lastName: "TypeScript",
        },
        email: "michael@email.com",
        password: "password",
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual("First name is required");
  });
});
