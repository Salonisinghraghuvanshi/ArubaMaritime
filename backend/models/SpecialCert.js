// models/SpecialCertification.js
const mongoose = require('mongoose');

const specialCertificationSchema = new mongoose.Schema({
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

const SpecialCertification = mongoose.model('SpecialCertification', specialCertificationSchema);

module.exports = SpecialCertification;

