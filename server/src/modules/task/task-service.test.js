import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Task DAO Test', () => {
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