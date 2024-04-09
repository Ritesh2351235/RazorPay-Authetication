const mongoose = require("mongoose")
const connectDB = async () => {
  await mongoose.connect("mongodb+srv://admin:admin@cluster0.4qg9b2z.mongodb.net/Razorpay")
  console.log(`${mongoose.connection.host} is connected`)
}

module.exports = connectDB