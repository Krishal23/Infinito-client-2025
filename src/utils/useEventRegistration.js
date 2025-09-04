import { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "./axios";

export const useEventRegistration = ({ endpoint, redirectUrl, payment = false }) => {
  const [submitting, setSubmitting] = useState(false);

  const loadRazorpay = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });

  const registerEvent = async (payload, navigate) => {
    console.log(payload)
    setSubmitting(true);
    try {
      if (payment) {
        await loadRazorpay();

        const orderRes = await axiosInstance.post(`${endpoint}/create-order`,payload);
        const { order, key } = orderRes.data;

        const options = {
          key,
          amount: order.amount,
          currency: order.currency,
          name: "Infinito 2025",
          description: payload.team ? payload.team.teamName : "Event Registration",
          order_id: order.id,
          prefill: {
            name: payload.fullname,
            email: payload.email,
            // contact: payload.phoneNumber,
          },
          handler: async (response) => {
            try {
              await axiosInstance.post(`${endpoint}/verify-payment`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationData: payload,
              });
              toast.success("Payment successful! Registration confirmed.");
              navigate(redirectUrl);
            } catch (err) {
              toast.error(err?.response?.data?.message || "Payment verification failed.");
            }
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (resp) => {
          toast.error("Payment failed. Please try again.");
        });
        rzp.open();
      } else {
        const res = await axiosInstance.post(endpoint, payload);
        toast.success(res.data?.message || "Registered successfully!");
        navigate(redirectUrl);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return { registerEvent, submitting };
};
