import request from 'supertest'
import server from '../../server'
const {taskURL,userURL} = require('../../constants/APIURLConstants');
import {tokenHeaderName} from '../../constants/ApplicationConstants'

describe("GET / ", () => {
  let app, accessToken
  beforeAll(async () => {
    app = server.app;
    // Register
    await request(app)
            .post(userURL + "/register/local")
            .set('Accept', 'application/json')
            .send({
                "username": "testuser",
                "email" : "testuser@gmail.com",
                "password" : "samplepassword@"
            });
    
    // Login user
    let res = await request(app)
            .post(userURL + "/auth/login")
            .set('Accept', 'application/json')
            .send({
                "username": "testuser",
                "password" : "samplepassword@"
            });
    accessToken = res.headers[tokenHeaderName]
    console.log("Received JWT - "+ accessToken)
    // Seed Mongo
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
