const mongoose = require("mongoose")
const connectDB = async () => {
  await mongoose.connect("Your mongoose cluster link")
  console.log(`${mongoose.connection.host} is connected`)
}

module.exports = connectDB
