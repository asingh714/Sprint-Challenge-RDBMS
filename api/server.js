const middleware = require("../config/middleware");
const express = require("express");
const server = express();
middleware(server);

const projectsRouter = require("../routes/projects-router");

server.use("/api/projects", projectsRouter);

module.exports = server;
