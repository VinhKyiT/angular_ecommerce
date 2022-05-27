const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  db.query(`SELECT c.id, c.title FROM categories c`, (err, results) => {
    if (err) console.log(err);
    else {
      console.log({ results });
      res.json(results);
    }
  });
});

// GET CATEGORY BY ID
router.get("/:cateId", async (req, res) => {
  const { cateId } = req.params;
  db.query(
    `SELECT c.id, c.title FROM categories c WHERE c.id = ${cateId}`,
    (err, results) => {
      if (err) console.log(err);
      else res.json(results[0]);
    }
  );
});

module.exports = router;
