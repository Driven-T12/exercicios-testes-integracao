import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe("GET /fibonacci", () => {
  it("should return status 400 when elements is not a number", async () => {
    const { status } = await api.get("/fibonacci?elements=notANumber")
    expect(status).toBe(400)
  })

  it("should return status 400 when elements is not present", async () => {
    const { status } = await api.get("/fibonacci")
    expect(status).toBe(400)
  })

  it("should return status 400 when elements is a negative number", async () => {
    const { status } = await api.get("/fibonacci?elements=-2")
    expect(status).toBe(400)
  })

  it("should return status 200 and a fibonacci sequence with n elements", async () => {
    const { status, body } = await api.get("/fibonacci?elements=10")
    expect(status).toBe(200)
    expect(body).toHaveLength(10)
    expect(body).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
  })
})