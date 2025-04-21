// models/IBC.js
const mongoose = require('mongoose');

const ibcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  rank: String,
  course: String,
  regulation: String,
  seamanBook: String,
  flag: String,
  expiryDate: Date,
  fileUrl: String,
  fileName: String
}, {
  timestamps: true
});

const IBC = mongoose.model('IBC', ibcSchema);

module.exports = IBC;