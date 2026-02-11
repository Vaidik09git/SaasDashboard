const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalRevenue: { type: Number, default: 0 },
  netProfit: { type: Number, default: 0 },
  totalOpEx: { type: Number, default: 0 },
  // New Burn Rate & Runway Fields
  monthlyBurnRate: { type: Number, default: 0 },
  runwayMonths: { type: Number, default: 0 },
  expenseBreakdown: {
    salaries: { type: Number, default: 0 },
    marketing: { type: Number, default: 0 },
    cloud: { type: Number, default: 0 },
    rent: { type: Number, default: 0 }
  },
  processedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);