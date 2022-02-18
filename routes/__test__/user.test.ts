import app from "./app";
import request from "supertest";
import initializeTestServer from "../../config/mongoTestConfig";
import mongoose from "mongoose";
import seedDB from "./seed";

// GLOBAL VARIABLES
let janeToken: string;
const janeId: string = "620f8197b39ee93778ce738b";

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
