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



module.exports = router;
