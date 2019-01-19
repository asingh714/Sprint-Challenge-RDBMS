const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());

server.listen(5000, () => console.log("Server is running on 5000"));

