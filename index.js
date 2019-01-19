const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter")

const server = express();

server.use(express.json());

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);


server.listen(5000, () => console.log("Server is running on 5000"));

