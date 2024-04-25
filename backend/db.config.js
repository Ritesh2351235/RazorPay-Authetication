const mongoose = require("mongoose")
const connectDB = async () => {
  await mongoose.connect(
    process.env.CONNECTION_STRING
  );
  console.log(`${mongoose.connection.host} is connected`)
}

module.exports = connectDB
