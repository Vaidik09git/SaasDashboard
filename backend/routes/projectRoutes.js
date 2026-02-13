const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// NEW: GET all projects for a specific user
// This allows the sidebar to populate the "Your Projects" list after login
router.get('/:userId', async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("FETCH PROJECTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch projects for this user" });
  }
});

// Save a new project after upload
router.post('/', async (req, res) => {
  try {
    const { projectName, revenue, profit, opex, burnRate, runway, expenseBreakdown, userId } = req.body;
    
    // Validate that we have a userId to link the project to
    if (!userId) {
      return res.status(400).json({ error: "User ID is required to save a project" });
    }

    const newProject = new Project({
      userId,
      projectName,
      revenue,
      profit,
      opex,
      burnRate,
      runway,
      expenseBreakdown
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error("SAVE PROJECT ERROR:", err);
    res.status(500).json({ error: "Failed to save project data to database" });
  }
});

module.exports = router;