const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectName: { type: String, required: true },
  revenue: { type: Number },
  profit: { type: Number },
  opex: { type: Number },
  burnRate: { type: Number },
  runway: { type: Number },
  expenseBreakdown: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);