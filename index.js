const express = require("express");
const helmet = require("helmet");

const projectsRouter = require("./projects/projectsRouter");

const server = express();

server.use(express.json());

server.use("/projects", projectsRouter);


server.listen(5000, () => console.log("Server is running on 5000"));

