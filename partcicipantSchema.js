import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  usn: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  college: {
    type: String,
    required: true,
    default: 'Mangalore Institute of Technology and Engineering (MITE), Moodbidri'
  },
  registrations: [{
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    event_id: {
      type: String,
      required: true,
      trim: true
    },
    order_id: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    razorpay_payment_id: {
      type: String,
      trim: true
    },
    registration_date: {
      type: Date,
      default: Date.now
    },
    ticket_url: {
      type: String,
      trim: true,
      default: null
    }
  }]
}, {
  timestamps: true
});

export const User = mongoose.model('User', UserSchema);