const app = require("../index"); // Your main Express app
const serverless = require("serverless-http");

module.exports.handler = serverless(app);
