const app = require("../index"); // Import the main Express app
const serverless = require("serverless-http");

module.exports.handler = serverless(app); // Wrap your Express app with serverless-http
