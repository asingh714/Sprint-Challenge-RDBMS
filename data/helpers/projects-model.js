const db = require("../dbConfig");

module.exports = {
  getProjects
}

function getProjects() {
  return db("projects")
}