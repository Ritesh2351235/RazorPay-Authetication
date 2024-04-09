const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
  
  },
  email: {
    type: String,
    
  },
  amount: {
    type: Number,
   
  },
  order_id: {
    type: String,
    required: true
  },
  razorpay_payment_id:{
    type:String,
    default:null
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking };
