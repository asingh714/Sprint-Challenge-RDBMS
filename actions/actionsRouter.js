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
        })
    }
  
    db("action")
      .insert(action).into('actions')
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the action to the database."
        });
      });
});


module.exports = router;
