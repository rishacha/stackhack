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
        useUnifiedTopology: true,
        useFindAndModify:false
    }; // remove this option if you use mongoose 5 and above
    beforeAll(async () => {
        try {
            mongoServer = new MongoMemoryServer();
            const mongoUri = await mongoServer.getUri();

            // Create Connection
            await mongoose.connect(mongoUri, opts, (err) => {
            
            if (err) console.error(err);
            });
            
            // Seed the db
            await TaskModel.insertMany([
                {  
                    "taskId":"t1", // string or MongoId
                    "userId":"u1", // string
                    "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
                    // "dueDate":Date.now(), // timestamp
                    "creationDate":Date.now(), // timestamp
                    "taskDetails":{
                        "title":"Sample T1 U1", // string
                        "labels":["tag1","tag2","tag3"], // array of strings
                        "desc":"Sample description of the task", // string
                    }
                },
                {  
                    "taskId":"t2", // string or MongoId
                    "userId":"u1", // string
                    "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
                    // "dueDate":Date.now(), // timestamp
                    "creationDate":Date.now(), // timestamp
                    "taskDetails":{
                        "title":"Sample T2 U1", // string
                        "labels":["tag1","tag2","tag3"], // array of strings
                        "desc":"Sample description of the task", // string
                    }
                },
                {  
                    "taskId":"t3", // string or MongoId
                    "userId":"u2", // string
                    "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
                    // "dueDate":Date.now(), // timestamp
                    "creationDate":Date.now(), // timestamp
                    "taskDetails":{
                        "title":"Sample T1 U2", // string
                        "labels":["tag1","tag2","tag3"], // array of strings
                        "desc":"Sample description of the task", // string
                    }
                },
                {  
                    "taskId":"t4", // string or MongoId
                    "userId":"u2", // string
                    "taskStatus":0, // 0 - New, 1 - In-Progress, 2 - Completed (int)
                    // "dueDate":Date.now(), // timestamp
                    "creationDate":Date.now(), // timestamp
                    "taskDetails":{
                        "title":"Sample T2 U2", // string
                        "labels":["tag1","tag2","tag3"], // array of strings
                        "desc":"Sample description of the task", // string
                    }
                }
            ])
        } catch (err){
            console.error("Error in Model Init ! "+err.message)
        }
        
    });
    // Delete
    it("should delete a task with a particular UserID + TaskID",async () => {
        await TaskModel.deleteOne(
            {
                "taskId":"t4",
                "userId":"u2"
            }
        );

        let taskList = await TaskModel.find({"userId":"u2"})
        expect(taskList.length).toEqual(1)
    });

    // Create
    it('should create the task model successfully for a User', async () => {
        var taskModelInstance = new TaskModel(taskData);
        await taskModelInstance.save();
        let taskList = await TaskModel.find({"userId":"1"})
        expect(taskList.length).toEqual(1)
    });

    //Read 
    it('should get all tasks for a User', async () => {
        var taskModelInstance = new TaskModel(taskData);
        await taskModelInstance.save();
        let taskList = await TaskModel.find({"userId":"u1"})
        expect(taskList.length).toEqual(2)
    });

    // Seek
    it('should find a particular task by UserID+Task ID', async () => {
        let task = await TaskModel.find(
            {
                "taskId":"t1",
                "userId":"u1"
            }
        );
        expect(task.length).toEqual(1)
        expect(task[0].toJSON()).toEqual({
            ...taskData,
            _id: expect.anything(),
            "taskId":expect.stringMatching("t1"),
            "userId":expect.stringMatching("u1"),
            creationDate: expect.anything(),
            __v: expect.anything(),
            "taskDetails": expect.anything()
        })
    });  

    // Update
    it("should update the task with a TaskId and UserId",async ()=>{
        await TaskModel.findOneAndUpdate({
            "taskId":"t2",
            "userId":"u1"
        },{  
            "taskStatus":1, // 0 - New, 1 - In-Progress, 2 - Completed (int)
            "dueDate":Date.now(), // timestamp
            "creationDate":Date.now(), // timestamp
            "taskDetails":{
                "title":"Sample Task 2 Updated", // string
                "labels":["tag1","tag2","tag3","updatedTag"], // array of strings
                "desc":"Sample updated description of the task", // string
            }
        },{upsert:true})
        let tasks = await TaskModel.find(
            {
                "taskId":"t2",
                "userId":"u1"
            }
        );
        expect(tasks.length).toEqual(1)
        // console.log(JSON.stringify(tasks[0].toJSON()))
        expect(tasks[0].toJSON()).toEqual({
            _id: expect.anything(),
            "taskId":expect.stringMatching("t2"),
            "userId":expect.stringMatching("u1"),
            dueDate:expect.anything(),
            taskStatus:1,
            creationDate: expect.anything(),
            __v: expect.anything(),
            "taskDetails": {
                "title":expect.stringMatching("Sample Task 2 Updated"), // string
                "labels":expect.arrayContaining(["tag1","tag2","tag3","updatedTag"]), // array of strings
                "desc":expect.stringMatching("Sample updated description of the task"), // string
            }
        })
    })
    
    // Upsert a task?

    afterAll(async () => {
        // console.log("Test")
        await mongoose.disconnect();
        await mongoServer.stop();
    });
})