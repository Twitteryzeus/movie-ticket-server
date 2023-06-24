const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the minimum log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamps to log entries
    winston.format.simple() // Use a simple log format
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
  ]
});

module.exports = logger;