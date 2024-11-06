const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/search', async (req, res) => {
  try {
    const query = {};
    if (req.query.name) query.name = req.query.name;
    if (req.query.occupation) query.occupation = req.query.occupation;
    if (req.query.income) query.income = parseInt(req.query.income);

    const results = await User.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
});

module.exports = router;
