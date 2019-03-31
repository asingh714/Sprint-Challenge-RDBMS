const middleware = require("../config/middleware");
const express = require("express");
const server = express();
middleware(server);

const projectsRouter = require("../routes/projects-router");
const actionsRouter = require("../routes/actions-router");

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
