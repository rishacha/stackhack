const mongoose = require('mongoose');
const connection = mongoose.connection;
import { MongoMemoryServer } from 'mongodb-memory-server';
const logger = require('./logger');

let db;
if (process.env.NODE_ENV === 'test') {
  db = "TEST"
}
else {
  db = process.env.DB_URL;
}

const connectToDb = () => {
  if(process.env.NODE_ENV=== 'test'){
    mongoose.Promise = Promise
    let mongoServer = new MongoMemoryServer();
    mongoServer.getUri().then((mongoURI)=>{
      mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false, 
      })
      mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e);
          mongoose.connect(mongoURI, mongooseOpts);
        }
        console.log(e);
      });
    
      mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoURI}`);
      });
    });
  } else {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false, 
    })
    .then(() => {
      logger.info(`Connected to ${db}`)
    })
    .catch((error) => {
      logger.error(`Error in connecting to mongo db ${error}`);
      // process.exit(1);
    });
  }
}

module.exports = async function () {
  connectToDb();
};
