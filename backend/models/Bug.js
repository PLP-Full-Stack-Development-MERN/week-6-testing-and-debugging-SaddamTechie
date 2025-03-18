const mongoose = require('mongoose');
// Bug Schema
const bugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { 
      type: String, 
      enum: ['open', 'in-progress', 'resolved'], 
      default: 'open' 
    },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Bug = mongoose.model('Bug', bugSchema);

  module.exports = Bug;