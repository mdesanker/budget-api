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
    const res = await request(app).get("/auth/");

    expect(res.statusCode).toEqual(200);
  });
});
