const logger = require('./logger');

process.on('uncaughtException', (ex) => {
  logger.error(`Application Uncaught Exception message : ${ex.message} : ${ex}`);
  logger.error(ex.stack);
});

process.on('unhandledRejection', (ex) => {
  logger.error(`Application Unhandled Rejection message :  ${ex.message} : ${ex}`);
});
