const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Analysis = require('../models/Analysis');

// Save analysis results
router.post('/save-revenue', auth, async (req, res) => {
  try {
    const newAnalysis = new Analysis({
      userId: req.user,
      totalRevenue: req.body.totalRevenue,
      fileName: req.body.fileName
    });
    await newAnalysis.save();
    res.json(newAnalysis);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;