const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLauchData = {
    mission: "USS Enterprise",
    rocket: "NNC 170-c",
    target: "Kepler-186 f",
    launchDate: "January 4, 2018",
  };
  const launchWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NNC 170-c",
    target: "Kepler-186 f",
  };
  const launchWithInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NNC 170-c",
    target: "Kepler-186 f",
    launchDate: "haha",
  };
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLauchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLauchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchWithoutDate);
  });
  test("It should catch missing require properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "messing launches properties",
    });
  });
  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toStrictEqual({
      error: "Invalid launch Date ",
    });
  });
});
