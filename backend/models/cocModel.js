import mongoose from 'mongoose';

const cocSchema = new mongoose.Schema({
  certificateNumber: {
    type: String,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    index: true
  },
  dateOfBirth: {
    type: Date
  },
  nationality: {
    type: String,
    trim: true
  },
  rank: {
    type: String,
    trim: true,
    index: true
  },
  course: {
    type: String,
    trim: true
  },
  regulation: {
    type: String,
    trim: true
  },
  seamanBook: {
    type: String,
    trim: true
  },
  flag: {
    type: String,
    trim: true
  },
  issueDate: {
    type: Date
  },
  expiryDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Valid', 'Expired', 'Suspended', 'Revoked', ''],
    default: ''
  },
  fileUrl: {
    type: String
  },
  fileName: {
    type: String
  }
}, {
  timestamps: true
});

// Create text indexes for search functionality
cocSchema.index({
  certificateNumber: 'text',
  name: 'text',
  rank: 'text',
  nationality: 'text',
  seamanBook: 'text'
});

const COC = mongoose.model('COC', cocSchema);

export default COC;