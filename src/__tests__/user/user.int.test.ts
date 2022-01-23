import request from "supertest";
import { app } from "../../../jest/setup-integration-tests";
import { USER_MOCK } from "../mocks/user.mock";

describe("User - Integration Test", () => {
  describe("POST /public/api/user", () => {
    const NEW_USER_MOCK = {
      name: "CarlaBruna",
      email: "carlabruna@random.com",
      password: "123123@123",
    };

    it("should create a user", async (done) => {
      const response = await request(app.app)
        .post("/public/api/user")
        .send(NEW_USER_MOCK);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: "Usuário criado com sucesso!",
      });
      done();
    });
    it("should not create a user when email already registred", async (done) => {
      const response = await request(app.app)
        .post("/public/api/user")
        .send(USER_MOCK);

      expect(response.statusCode).toBe(422);
      expect(response.body).toEqual({
        message:
          "Email já em uso, por favor tente recuperar a senha ou use um email diferente",
      });
      done();
    });
  });
});
