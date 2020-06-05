import request from 'supertest'
import app from '../../server'


describe("GET / ", () => {
    it("It should respond with an array of tasks", async () => {
      const response = await request(app).get("/api/v1/task/all");
      expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
      expect(response.statusCode).toBe(200);
    });
  });
  