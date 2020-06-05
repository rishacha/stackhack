import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
const TaskModel = require('./task-model');
const taskData = {  
    "taskId":"1", // string or MongoId
    "userId":"1", // string
    "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
    // "dueDate":Date.now(), // timestamp
    "creationDate":Date.now(), // timestamp
    "taskDetails":{
        "title":"Sample Task", // string
        "labels":["tag1","tag2","tag3"], // array of strings
        "desc":"Sample description of the task", // string
    }
};

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

describe('Task Model Test', () => {
    let mongoServer;
    const opts = { 
        // useMongoClient: true 
        useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true
    }; // remove this option if you use mongoose 5 and above
    beforeAll(async () => {
        mongoServer = new MongoMemoryServer();
        const mongoUri = await mongoServer.getUri();
        // console.log("Before all")
        await mongoose.connect(mongoUri, opts, (err) => {
        //   console.log("Hello?");
          if (err) console.error(err);
        });
        // console.log("Test?")
      });
    it('should create the task model successfully', async () => {
        
        try {
            var taskModelInstance = new TaskModel(taskData);
            await taskModelInstance.save();

        } catch(err) {
            console.error(err)
        }
        
    });


    it('should return all tasks', async () => {
        
        try {
            let task = await TaskModel.find({});
            console.log("Task "+task)
            expect(task[0].toJSON()).toEqual({
                ...taskData,
                _id: expect.anything(),
                creationDate: expect.anything(),
                __v: expect.anything()
            })
        } catch(err) {
            console.error(err)
        }
        
    });  

    afterAll(async () => {
        // console.log("Test")
        await mongoose.disconnect();
        await mongoServer.stop();
    });
})