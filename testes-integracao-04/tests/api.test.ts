import app from "app";
import supertest from "supertest";

const api = supertest(app)

describe("GET /health", () => {
    it("should return status 200 when GET /health works", async () => {
        const result = await api.get("/health")
        expect(result.status).toBe(200)
        expect(result.text).toBe("OK!")
    })
})