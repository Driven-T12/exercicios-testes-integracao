import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";
import { UserInput } from "repository";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user: UserInput = {
      email: "teste@teste.com.br",
      password: "teste"
    }

    const { status, body } = await api.post("/users").send(user)
    expect(status).toBe(201)
    expect(body).toEqual({
      id: expect.any(Number),
      email: user.email,
      password: expect.any(String)
    })
    expect(body.password).not.toBe(user.password)
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user: UserInput = {
      email: "teste@teste.com.br",
      password: "teste"
    }

    await prisma.user.create({ data: user })
    const { status } = await api.post("/users").send(user)
    expect(status).toBe(409)
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user: UserInput = {
      email: "teste@teste.com.br",
      password: "teste"
    }

    const addedUser = await prisma.user.create({ data: user })
    const { status, body } = await api.get(`/users/${addedUser.id}`)
    expect(status).toBe(200)
    expect(body).toEqual({
      id: addedUser.id,
      email: addedUser.email,
      password: expect.any(String)
    })
  });

  it("should return 404 when can't find a user by id", async () => {
    const user: UserInput = {
      email: "teste@teste.com.br",
      password: "teste"
    }

    const createdUser = await prisma.user.create({ data: user })
    await prisma.user.delete({
      where: { id: createdUser.id }
    })

    const { status } = await api.get(`/users/${createdUser.id}`);
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    const userData: UserInput = {
      email: "teste@teste.com.br",
      password: "teste"
    };

    await prisma.user.createMany({
      data: [{
        ...userData
      }, {
        ...userData, email: "teste2@teste.com.br"
      }]
    });

    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String)
      })
    ]))
  });

})