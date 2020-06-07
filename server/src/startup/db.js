const mongoose = require('mongoose');
const connection = mongoose.connection;
const logger = require('./logger');


let db;
if (process.env.NODE_ENV === 'test') {
  db = "TEST"
}
else {
  db = process.env.DB_URL;
}

const connectToDb = async () => {
  if(!process.env.NODE_ENV=== 'test'){
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
  await connectToDb();
};
