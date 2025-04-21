import mongoose from 'mongoose';

const seamanDocSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  rank: {
    type: String,
    trim: true
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
  expiryDate: {
    type: Date,
    default: null
  },
  fileUrl: {
    type: String,
    default: null
  },
  fileName: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

seamanDocSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const SeamanDoc = mongoose.model('SeamanDoc', seamanDocSchema);

export default SeamanDoc;