import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  shareId: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  language: {
    type: String,
    required: true,
    default: 'en'
  },
  calculations: {
    lifePathNumber: { value: Number, steps: String },
    birthdayNumber: { value: Number },
    expressionNumber: { value: Number, steps: String },
    soulUrgeNumber: { value: Number, steps: String },
    personalityNumber: { value: Number, steps: String },
    maturityNumber: { value: Number },
    personalYearNumber: { value: Number },
    karmicDebtNumbers: [Number]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Report', reportSchema);
