const express = require("express");
const router = express.Router();

const projects = require("../data/helpers/projects-model");


router.get("/", (req, res) => {
  projects.getProjects()
  .then(projects => {
    res.status(200).json(projects)
  }) 
  .catch(error => {
    res.status(500).json({ error: "The projects could not be retrieved." })
  })
})

module.exports = router;
