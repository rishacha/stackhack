import request from 'supertest'
import server from '../../server'

describe("GET / ", () => {
  let app, accessToken
  beforeAll(() => {
    app = server.app;
    accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZWRhM2JhODAwZDg2Y2E5MjdlMDIwZWQiLCJ1c2VybmFtZSI6InByYWtoYXIiLCJpYXQiOjE1OTEzNjE2MTEsImV4cCI6MTU5MTQ0ODAxMX0.ts1tY0yrehOGv_K07K_dPRRv3-zf-CyXj4GBYNfoK-k';
  });

  afterAll(async () => {
    app.close();
  });

  it("It should respond with an array of tasks", async () => {
    const response = await request(app)
                                .get("/api/v1/task/all")
                                .set('x-access-token', accessToken );
    expect(response.body).toEqual(["Elie", "Matt", "Joel", "Michael"]);
    expect(response.statusCode).toBe(200);
  });
});
