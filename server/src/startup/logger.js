const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, json } = format;
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const { getEnvVariable } = require('../utils/getEnvVariable');
const { httpContext } = require('../middleware/uniqueReqUUID');

// Wrap Winston logger to print reqId in each log
var formatMessage = function (message) {
  var reqId = httpContext.get('reqId');
  reqId = reqId ? reqId : '';
  return { text: message, requestId: reqId };
};

// Winston Transport to daily change the log file
let allLevelTransport;
let errorTransport;

if(process.env.NODE_ENV=='test'){
  errorTransport = new transports.Console({ level: 'error'});
  allLevelTransport = new transports.Console( {level:'all'});
} else {
  errorTransport = new (DailyRotateFile)({
    filename: path.join(getEnvVariable('LOG_FILE_PATH'), 'integration-error-%DATE%.log'),
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH',
  });
  allLevelTransport = new (DailyRotateFile)({
    filename: path.join(getEnvVariable('LOG_FILE_PATH'), 'integration-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '15m',
    maxFiles: '30d',
  });
}

// logger instance
const winstonLogger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: 'VMS LOGS' }),
    timestamp(),
    json(),
    // myFormat
  ),
  transports: [
    allLevelTransport,
    errorTransport
  ]
});

if (process.env.NODE_ENV !== 'production1') {
  winstonLogger.add(new transports.Console({
    format: format.combine(
      format.json(),
    ),
  }));
}

var logger = {
  log: function (level, message) {
    winstonLogger.log(level, formatMessage(message));
  },
  error: function (message) {
    winstonLogger.error(formatMessage(message));
  },
  warn: function (message) {
    winstonLogger.warn(formatMessage(message));
  },
  verbose: function (message) {
    winstonLogger.verbose(formatMessage(message));
  },
  info: function (message) {
    winstonLogger.info(formatMessage(message));
  },
  debug: function (message) {
    winstonLogger.debug(formatMessage(message));
  },
  silly: function (message) {
    winstonLogger.silly(formatMessage(message));
  }
};

module.exports = logger;

// if (process.env.NODE_ENV === 'test') {
//   return createLogger({
//     transports: [ new transports.Console({ level: 'error'}) ]
//   });
// }

// Additional task when new file is created.
// transport.on('rotate', function(oldFilename, newFilename) {
//   // do something fun
// });

// Format of custom printing message - If required
// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `{${timestamp} [${label}] ${level}: ${message}}`;
// });