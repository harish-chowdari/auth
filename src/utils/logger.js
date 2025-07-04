// logger.js
const { createLogger, format, transports } = require('winston');
const path = require('path');

// Custom log format: timestamp, level, message, and error stack (if any)
const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${message} ${stack || ''}`;
});

// Combined format for all transports
const combineFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  logFormat
);

// Create logger for development only
const logger = createLogger({
  level: 'debug',
  format: combineFormat,
  transports: [
    // Console transport with colorization
    new transports.Console({
      format: format.combine(format.colorize(), combineFormat),
      handleExceptions: true
    }),
    // File transport for all logs
    new transports.File({
      filename: path.join(__dirname, 'logs', 'app.log'),
      maxsize: 100 * 1024 * 1024, // 100 MB per file
      maxFiles: 1,
      tailable: true,
      handleExceptions: true
    })
  ],
  exceptionHandlers: [
    new transports.Console({
      format: format.combine(format.colorize(), combineFormat)
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs', 'exceptions.log'),
      maxsize: 100 * 1024 * 1024,
      maxFiles: 1,
      tailable: true
    })
  ],
  rejectionHandlers: [
    new transports.Console({
      format: format.combine(format.colorize(), combineFormat)
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs', 'rejections.log'),
      maxsize: 100 * 1024 * 1024,
      maxFiles: 1,
      tailable: true
    })
  ],
  exitOnError: false // Prevent exiting on handled exceptions
});

// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = logger;
