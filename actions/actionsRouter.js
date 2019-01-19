const express = require("express");
const knex = require("knex");
const router = express.Router();
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// GET ACTIONS
router.get("/", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ error: "The actions could not be retrieved." });
    });
});

// GET ACTION WITH SPECIFIC ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db("actions")
    .where({ id: id })
    .first()
    .then(action => {
      if (action) {
        res.status(200).json({ action });
      } else {
        res
          .status(404)
          .json({ error: "The action with the specified ID was not found." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action with the specified ID does not exist." });
    });
});

// POST ACTION
router.post("/", (req, res) => {
  const action = req.body;

  if (!action.description) {
    res.status(400).json({
      error: "Please provide a description for the action."
    });
  }

  if (!action.notes) {
    res.status(400).json({
      error: "Please provide a note for the action."
    });
  }

  if (!action.project_id) {
    res.status(400).json({
      error: "Please provide a project id for which project this action is for"
    });
  }

  db("action")
    .insert(action)
    .into("actions")
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the action to the database."
      });
    });
});

// PUT - UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (!changes.description || !changes.notes || !changes.project_id) {
    res
      .status(400)
      .json({
        error:
          "Please provide a description, note and project id for the action."
      });
  }

  db("actions")
    .where({ id: id })
    .update(changes)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: "The action information could not be modified."
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db("actions")
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "The action could not be removed." });
    });
});

module.exports = router;
