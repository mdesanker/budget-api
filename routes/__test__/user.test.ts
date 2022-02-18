import app from "./app";
import request from "supertest";
import initializeTestServer from "../../config/mongoTestConfig";
import mongoose from "mongoose";
import seedDB from "./seed";

// GLOBAL VARIABLES
let janeToken: string;
const janeId: string = "620f8197b39ee93778ce738b";
const invalidUserId: string = "620f8197b39ee93778c00000";

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
  });

  it("return error for invalid id", async () => {
    const res = await request(app).get(`/user/${invalidUserId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.errors[0].msg).toEqual("Invalid credentials");
  });
});
