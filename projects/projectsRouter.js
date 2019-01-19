const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// GET PROJECTS
router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ error: "The projects could not be retrieved." });
    });
});

// GET PROJECT with specific ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db("projects")
    .where({ id: id })
    .first()
    .then(project => {
      if (project) {
        db("actions")
          .where({ project_id: id })
          .then(actions => {
            project.actions = actions;
            res.status(200).json({ project });
          })
          .catch(error => res.status(500).json(error));
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID was not found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project with the specified ID does not exist." });
    });
});

// POST PROJECT
router.post("/", (req, res) => {
  const project = req.body;

  if (!project.name) {
    res.status(400).json({
      error: "Please provide a name for the project."
    });
  }

  if (!project.description) {
    res.status(400).json({
      error: "Please provide a description for the project."
    });
  }

  db("projects")
    .insert(project)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database."
      });
    });
});



module.exports = router;
