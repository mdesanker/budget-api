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

// PUT ROUTES
describe("PUT /user/update", () => {
  it("return updated expenses user", async () => {
    const res = await request(app)
      .put("/user/update")
      .send({
        income: [
          {
            name: "Job",
            amount: "65000",
          },
        ],
        housing: [
          {
            name: "rent",
            amount: "700",
          },
        ],
        food: [
          {
            name: "groceries",
            amount: "500",
          },
          {
            name: "dining",
            amount: "100",
          },
        ],
        utilities: [
          {
            name: "electricity",
            amount: "200",
          },
          {
            name: "gas",
            amount: "45",
          },
        ],
        healthcare: [
          {
            name: "HSA",
            amount: "15",
          },
        ],
        loans: [
          {
            name: "car",
            amount: "300",
          },
        ],
        subscriptions: [
          {
            name: "amazon",
            amount: "120",
          },
          {
            name: "cell",
            amount: "45",
          },
          {
            name: "internet",
            amount: "55",
          },
        ],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.income[0].amount).toEqual(65000);
    expect(res.body.subscriptions.length).toEqual(3);
  });

  it("clear expense details with empty arrays", async () => {
    const res = await request(app)
      .put("/user/update")
      .send({
        income: [],
        housing: [],
        food: [],
        utilities: [],
        healthcare: [],
        loans: [],
        subscriptions: [],
      })
      .set("x-auth-token", janeToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body.income).toEqual([]);
    expect(res.body.subscriptions.length).toEqual(0);
  });
});
