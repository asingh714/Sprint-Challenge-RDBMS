const express = require("express");
const router = express.Router();

const db = require("../data/dbConfig");

router.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "The projects could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const project = req.body;

  if (
    !project.name ||
    !project.description ||
    project.is_completed === undefined
  ) {
    res.status(400).json({
      error:
        "Please provide a name, description and is_completed for the project."
    });
  } else {
    db("projects")
      .insert(project)
      .then(ids => {
        const id = ids[0];
        db("projects")
          .where({ id })
          .first()
          .then(project => {
            res.status(201).json(project);
          })
          .catch(error => {
            res.status(500).json({
              error:
                "There was an error while saving the project to the database."
            });
          });
      });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id })
    .first()
    .then(project => {
      if (project) {
        db("actions")
          .where({ project_id: id })
          .then(actions => {
            project.actions = actions;
            res.status(200).json(project);
          });
      } else {
        res
          .status(404)
          .json({ error: "The project with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The project with the specified ID could not be retrieved."
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (
    !changes.name ||
    !changes.description ||
    changes.is_completed === undefined
  ) {
    res.status(400).json({
      error:
        "Please provide a name, description and is_completed for the project."
    });
  } else {
    db("projects")
      .where({ id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({
              message: "The project with the specified ID does not exist."
            });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The project information could not be modified."
        });
      });
  }
});

module.exports = router;
