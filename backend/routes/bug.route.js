const express = require('express');
const Bug = require('../models/Bug');
const router = express.Router();

// Routes
router.get('/', async (req, res) => {
    try {
      const bugs = await Bug.find().sort({ createdAt: -1 });
      res.json(bugs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const bug = new Bug(req.body);
      await bug.save();
      res.status(201).json(bug);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const bug = await Bug.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!bug) return res.status(404).json({ error: 'Bug not found' });
      res.json(bug);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const bug = await Bug.findByIdAndDelete(req.params.id);
      if (!bug) return res.status(404).json({ error: 'Bug not found' });
      res.json({ message: 'Bug deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  module.exports = router;