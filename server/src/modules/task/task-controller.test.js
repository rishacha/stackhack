import { app } from '../../server'
const { taskURL, userURL } = require('../../constants/APIURLConstants');
import { tokenHeaderName } from '../../constants/ApplicationConstants'
// import { Mongoose } from 'mongoose';
// import mongoose from 'mongoose';
const supertest = require('supertest')

const { setupDB } = require('../../test/test-setup')
setupDB('task-testing', false)

describe("GET / ", () => {
  let accessToken, request, server,taskId
  beforeAll(async (done) => {
    try {
      // server = app.listen(done)
      request = supertest(app)
      // Register
      await request.post(userURL + "/register/local")
        .set('Accept', 'application/json')
        .send({
          "username": "testuser",
          "email": "testuser@gmail.com",
          "password": "samplepassword@"
        });
      // console.log("Registration done")

      // Login user
      let res = await request.post(userURL + "/auth/login")
        .set('Accept', 'application/json')
        .send({
          "username": "testuser",
          "password": "samplepassword@"
        });
      // console.log(JSON.stringify(res))
      accessToken = res.headers[tokenHeaderName]
      // console.log("Received JWT - " + accessToken)
      done()
    } catch (err) {
      console.error("No init" + JSON.stringify(err))
    }

  });

  afterAll(async (done) => {
    // await app.close(done);
    done()
  });

  it("should create a task successfully", async (done) => {
    const response = await request.post(taskURL + "/create")
      .set('x-access-token', accessToken)
      .send({
        "taskDetails": {
          "title": "Sample Task", // string
          "labels": ["tag1", "tag2", "tag3"], // array of strings
          "desc": "Sample description of the task", // string
        }
      });
    // console.log(JSON.stringify(response.body))
    expect(response.body).toEqual({
      "message":expect.anything(),
      "taskId":expect.anything()
    });
    taskId = response.body.taskId
    expect(response.statusCode).toBe(200);
    done()
  })

  it("should respond with an array of tasks", async (done) => {
    const response = await request.get(taskURL + "/all")
      .set('x-access-token', accessToken);
    // console.log(response)
    expect(response.body.length).toEqual(1);
    // console.log(response.body)
    expect(response.statusCode).toBe(200);
    done()
  });


  it("should update the task", async (done) => {
    const response = await request.put(taskURL + "/update")
      .set('x-access-token', accessToken)
      .send({
        "taskId":taskId,
        "updateDetails":{
          "taskStatus":1,
        }
      });
    expect(response.body).toEqual({});
    expect(response.statusCode).toBe(200);
    done()
  });

  it("should delete the task", async (done) => {
    const response = await request.delete(taskURL + "/delete")
      .set('x-access-token', accessToken)
      .send({
        "taskId":taskId,
      });
    expect(response.body).toEqual({});
    expect(response.statusCode).toBe(200);
    done()
  });
});
