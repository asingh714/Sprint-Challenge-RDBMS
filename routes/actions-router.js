const express = require("express");
const router = express.Router();

const db = require("../data/dbConfig");

router.get("/", (req, res) => {
  db("actions")
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "The actions could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const action = req.body;

  if (
    !action.description ||
    !action.notes ||
    action.is_completed === undefined ||
    action.project_id === undefined
  ) {
    res.status(400).json({
      error:
        "Please provide a description, notes, is_completed and project_id for the action."
    });
  } else {
    db("actions")
      .insert(action)
      .then(ids => {
        const id = ids[0];
        db("actions")
          .where({ id })
          .first()
          .then(action => {
            res.status(201).json(action);
          })
          .catch(error => {
            res.status(500).json({
              error:
                "There was an error while saving the action to the database."
            });
          });
      });
  }
});

module.exports = router;
