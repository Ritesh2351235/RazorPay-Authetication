import React, { useState } from "react";
import axios from "axios";

const Product = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const CheckoutHandler = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        name: formData.name,
        email: formData.email,
      });
  
      console.log(response.data.order_id);
  
      const order_id = response.data.order_id;
  
      // Proceed to payment with the received order ID
      const options = {
        key: "rzp_test_sNTl9eMeo1SyQY",
        amount: "50000",
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order_id,
        callback_url: "http://localhost:5000/api/payment-verification",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: "9000090000"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle error
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">ACCOMMODATION</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div className="text-left">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            </div>
            <div className="mt-2">
              <input id="name" name="name" value={formData.name} onChange={handleInputChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
              </div>
              <div className="mt-2">
                <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleInputChange} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <button type="submit" onClick={CheckoutHandler} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Book Accommodation</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Product;
