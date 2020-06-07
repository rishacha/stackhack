const express = require("express");
require('dotenv').config();
// // Assign environment variables
// const port = process.env.PORT || 4000;
// const config = require('./config')
// const logger = require('./startup/logger')

// Initiliase an express server
const app = express();

// Options to pass to mongodb to avoid deprecation warnings
const options = {
  useNewUrlParser: true
};

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/passport');
require('./startup/globalExceptionHandler');

module.exports = {
  app
}