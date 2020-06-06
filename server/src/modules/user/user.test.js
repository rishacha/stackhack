const request = require('supertest');
const mongoose = require('mongoose');
const constant = require('../../constants/APIURLConstants').userURL;

describe('User module Tests', () => {

    beforeAll(() => {
      server = require('../../server').app;
      mongoId = mongoose.Types.ObjectId();
      accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMyZTZhMzI1YTZiM2I3NTJlMDg2YmMiLCJlbWFpbCI6ImFkbWluQHZtcy5haSIsImNsaWVudF9uYW1lIjoidm1zIiwiY2xpZW50X2Fjcm9ueW0iOiJWTVMiLCJpYXQiOjE1ODIwMDgxODAsImV4cCI6MTU4MjA5NDU4MH0.XVB8oQDlwbn6nfCZaLFR2VJ1hnS6ezwPBbDT4N8m5fE';
    });

    afterAll(async () => {
      server.close();
    });

    describe('/POST', () => {
        it('should return 200 for valid request and 400 for already in use request', async () => {
          let res = await request(server)
            .post(constant + "/register/local")
            .set('Accept', 'application/json')
            .send({
                "username": "testuser",
                "email" : "testuser@gmail.com",
                "password" : "samplepassword@"
            });
          expect(res.status).toBe(200);
        });

        it('should return 200 for valid request and 400 for already in use request', async () => {
          let res = await request(server)
            .post(constant + "/register/local")
            .set('Accept', 'application/json')
            .set('x-access-token', accessToken )
            .send({
                "username1": "testuser",
                "email" : "testuser@gmail.com",
                "password" : "samplepassword@"
            });
          expect(res.status).toBe(400);
        });

        it('should return 200 for valid request and 400 for already in use request', async () => {
          let res = await request(server)
            .post(constant + "/register/local")
            .set('Accept', 'application/json')
            .set('x-access-token', accessToken )
            .send({
                "username": "testuser",
                "email" : "testuser@gmail.com",
                "password" : "samplepassword@"
            });
          expect(res.status).toBe(400);
        });

        it('should return 200 for valid request and 400 for already in use request', async () => {
          let res = await request(server)
            .post(constant + "/auth/login")
            .set('Accept', 'application/json')
            .set('x-access-token', accessToken )
            .send({
                "username": "testuse1r",
                "email" : "testuser@gmail.com",
                "password" : "samplepassword@"
            });
          expect(res.status).toBe(400);
        });

        it('should return 200 for valid request and 400 for already in use request', async () => {
          let res = await request(server)
            .post(constant + "/auth/login")
            .set('Accept', 'application/json')
            .set('x-access-token', accessToken )
            .send({
                "username": "testuser",
                "password" : "samplepassword@"
            });
          expect(res.status).toBe(200);
        });

        it('should return 200 for valid request and 400 for already in use request', async () => {
          let res = await request(server)
            .post(constant + "/auth/login")
            .set('Accept', 'application/json')
            .set('x-access-token', accessToken )
            .send({
                "username": "testuser123",
                "password" : "samplepassword@"
            });
          expect(res.status).toBe(400);
        });
    });

})