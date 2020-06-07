/* global beforeAll beforeEach afterEach afterAll */
const { seedDatabase } = require('./seeds')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.promise = global.Promise
import { MongoMemoryServer } from 'mongodb-memory-server';

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
        } catch (error) {
            // Sometimes this error happens, but you can safely ignore it
            if (error.message === 'ns not found') return
            // This error occurs when you use it.todo. You can
            // safely ignore this error too
            if (error.message.includes('a background operation is currently running')) return
            console.log(error.message)
        }
    }
}

module.exports = {
    setupDB(databaseName, runSaveMiddleware = false) {
        // console.log("Inside setup db")
        let mongoServer;
        const opts = { 
            // useMongoClient: true 
            useNewUrlParser: true, 
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        }; // remove this option if you use mongoose 5 and above

        // Connect to Mongoose
        beforeAll(async () => {
            try {
                mongoServer = new MongoMemoryServer();
                const mongoUri = await mongoServer.getUri();
    
                // Create Connection
                await mongoose.connect(mongoUri, opts, (err) => {
                    if (err) console.error(err);
                });
                
                await seedDatabase(runSaveMiddleware)
        
            } catch (err){
                console.error("Error in Model Init ! "+err.message)
            }
        })

        // // Seeds database before each test
        // beforeEach(async () => {
        //     await seedDatabase(runSaveMiddleware)
        // })

        // // Cleans up database between each test
        // afterEach(async () => {
        //     await removeAllCollections()
        // })

        // Disconnect Mongoose
        afterAll(async () => {
            await dropAllCollections()
            // await mongoose.connection.close()
            await mongoose.disconnect()
            await mongoServer.stop()
        })


        // afterAll(async () => {
        //     // console.log("Test")
        //     await mongoose.disconnect();
        //     await mongoServer.stop();
        // });
    }
}