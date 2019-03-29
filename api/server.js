const middleware = require("../config/middleware");
const express = require("express");
const server = express();
middleware(server);

const projectsRouter = require("../routes/projects-router");


module.exports = server;
