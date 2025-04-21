import mongoose from 'mongoose';

const vesselSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  shipName: {
    type: String,
    required: [true, 'Ship name is required'],
    trim: true
  },
  imoNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return !v || /^\d{7}$/.test(v);
      },
      message: 'IMO number must be 7 digits'
    }
  },
  portOfRegistry: {
    type: String,
    trim: true
  },
  callSign: {
    type: String,
    trim: true
  },
  grossTonnage: {
    type: String,
    trim: true
  },
  mmsiNo: {
    type: String,
    trim: true
  },
  certificateNumber: {
    type: String,
    trim: true
  },
  dateOfIssue: {
    type: Date,
    default: null
  },
  validTill: {
    type: Date,
    default: null
  },
  remark: {
    type: String,
    trim: true
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

// Validate that validTill is after dateOfIssue
vesselSchema.pre('save', function (next) {
  if (this.validTill && this.dateOfIssue && this.validTill < this.dateOfIssue) {
    next(new Error('Valid till date cannot be before date of issue'));
  } else {
    this.updatedAt = Date.now();
    next();
  }
});

const Vessel = mongoose.model('Vessel', vesselSchema);

export default Vessel;