const mongoose = require('mongoose');
const TaskModel = require('task-model');
const taskData = { name: 'TekLoon', gender: 'Male', dob: new Date(), loginUsing: 'Facebook' };

describe('Task Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

})