const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { Booking } = require("./Booking.models");
const crypto = require("crypto");
const connectDB = require("./db.config");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: 'rzp_test_sNTl9eMeo1SyQY',
  key_secret: 'zLykr6JBpWpwm3vTUxnFurpJ',
});

connectDB();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.post("/api/orders", async (req, res) => {
  try {

    const { name, email } = req.body;
    const amount = 10000; // Fixed amount in paisa (e.g., 10000 for Rs 100)

    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      // Add other necessary fields here
    });

    await Booking.create({
      order_id: order.id,
      name: name,
      email:email,
      amount: amount
    });


    console.log({ order });
    res.json({ order_id: order.id, ...order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// app.post("/api/bookings", async (req, res) => {
//   try {
//     const { name, email, payment_id, order_id } = req.body;

//     console.log("Request Body:", req.body);
//     if (!order_id) {
//       return res.status(400).json({ error: "Order ID is required" });
//     }

//     // Save the booking details in your database
//     await Booking.create({
//       name: name,
//       email: email,
//       amount: 10000, // Fixed amount in paisa (e.g., 10000 for Rs 100)
//       payment_id: payment_id,
//       order_id: order_id
//     });

//     res.status(200).json({ message: "Booking successful" });
//   } catch (error) {
//     console.error("Error storing booking details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


app.post("/api/payment-verification", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    console.log("Entered into Payment-Verification");
    // Perform signature verification
    const body_data = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', 'zLykr6JBpWpwm3vTUxnFurpJ').update(body_data).digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Signature is valid
      await Booking.findOneAndUpdate({ order_id: razorpay_order_id }, { $set: { razorpay_payment_id } });
      res.redirect(`http://localhost:3000/success?payment_id=${razorpay_payment_id}`);
    } else {
      // Signature is invalid
      res.status(400).json({ error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log(`The app is listening at http://localhost:5000`);
});
