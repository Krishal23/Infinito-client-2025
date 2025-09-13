import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "./axios";

export const useAccommodationBooking = ({ endpoint = "/accommodation", redirectUrl }) => {
  const [submitting, setSubmitting] = useState(false);

  // Load Razorpay SDK
  const loadRazorpay = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });

  const bookAccommodation = async (payload, navigate) => {
    setSubmitting(true);
    try {
      await loadRazorpay();

      // 1️⃣ Create order on backend
      const orderRes = await axiosInstance.post(`${endpoint}/create-order`, payload);
      const { orderId, amount, currency, accommodationData, key } = orderRes.data;
      console.log(key)

      // 2️⃣ Razorpay options
      const options = {
        key,
        amount: amount * 100, // in paise
        currency,
        name: "Infinito 2025 - Accommodation",
        description: "Accommodation Booking",
        order_id: orderId,
        prefill: {
          name: payload.players?.[0]?.name,
          email: payload.players?.[0]?.email,
          contact: payload.players?.[0]?.phoneNumber,
        },
        handler: async (response) => {
          try {
            // Send payment verification request to backend
            await axiosInstance.post(`${endpoint}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              accommodationData,
            });

            toast.success("Payment successful! Accommodation confirmed.");
            navigate(redirectUrl);
          } catch (err) {
            toast.error(err?.response?.data?.message || "Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
      };

      // 3️⃣ Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Accommodation booking failed");
      console.error("Booking error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return { bookAccommodation, submitting };
};
