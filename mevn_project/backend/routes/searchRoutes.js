// backend/routes/searchRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/search", async (req, res) => {
  try {
    const query = {};

    // Apply case-insensitive and partial matching for name
    if (req.query.name) {
      console.log(`Searching for name: ${req.query.name}`);
      query.name = { $regex: req.query.name, $options: "i" }; // MongoDB syntax for regex with case-insensitive option
    }

    // Apply exact matches for email, occupation, and income as before
    if (req.query.email) query.email = req.query.email;
    if (req.query.occupation) query.occupation = req.query.occupation;
    if (req.query.income) query.income = parseInt(req.query.income);

    const results = await User.find(query);
    console.log("Search results:", results); // Log results to verify
    res.json(results);
  } catch (error) {
    console.error("Error occurred in /search route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
