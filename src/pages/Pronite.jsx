import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import colleges from "./Events/forms-centralized/components/collegeData";

const FIXED_PRICE = 500;

const handleUploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file); // the file
  formData.append("upload_preset", "pronite_payments"); // your unsigned preset in Cloudinary

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dty5nvjnc/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Cloudinary upload failed");

    const data = await res.json();
    console.log("Uploaded URL:", data.secure_url);
    return data.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};



export default function ProniteRegistration() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [address, setAddress] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const college = colleges.find(c => c.name === collegeName);
    if (college && college.address) setAddress(college.address);
  }, [collegeName]);

  // Step 1 validation
  const validateStep1 = () => {
    const e = {};
    if (!/^[A-Za-z\s]{3,50}$/.test(name.trim())) e.name = "Name: 3-50 letters only";
    if (!/^[\w.-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,6}$/.test(email.trim())) e.email = "Enter a valid email";
    if (!/^\d{12}$/.test(adhaar.trim())) e.adhaar = "Aadhaar must be 12 digits";
    if (!/^\d{10}$/.test(phone.trim())) e.phone = "Phone must be 10 digits";
    if (!address.trim()) e.address = "Address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Step 2 validation
  const validateStep2 = () => {
    const e = {};
    if (!transactionId.trim()) e.transactionId = "Transaction ID is required";
    if (!paymentProof) e.paymentProof = "Payment proof is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (step === 1 && !validateStep1()) return; setStep(step + 1); };
  const prev = () => setStep(s => Math.max(1, s - 1));
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep2()) return;

  setSubmitting(true);
  setMessage(null);

  try {
    let paymentProofUrl = "";
    if (paymentProof) {
      paymentProofUrl = await handleUploadToCloudinary(paymentProof);
    //   console.log("Uploaded URL:", paymentProofUrl);
    }

    const payload = {
      name,
      email,
      adhaar,
      phone,
      collegeName,
      address,
      transactionId,
      amountPaid: FIXED_PRICE,
      paymentProof: paymentProofUrl, 
    };

    const res = await axiosInstance.post("/pronite/register", payload);
    // console.log("Response:", res.data);
    navigate("/my-pronite");
  } catch (err) {
    console.error("AxiosError", err);
    setMessage({ type: "error", text: err.response?.data?.msg || "Registration failed" });
  } finally {
    setSubmitting(false);
  }
};




  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('./eveBG.jpg')" }}>
      {/* <div className="absolute inset-0 bg-black/50"></div> */}
      {submitting && <Loader message="Processing your registration..." />}
      <Navbar />

      <div className="relative z-10 m-2 max-w-3xl mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl min-h-[80vh] pt-20">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700">Pronite Registration</h1>
        <Link
            to="/my-pronite"
            className="inline-block px-4 py-2 rounded-lg mb-2
  bg-gradient-to-b from-[#4b0f2a]/80 to-[#5c2c29]/80 
  hover:from-[#6b1f3a]/90 hover:to-[#7c3c39]/90
  text-white transition-all duration-300 
  text-lg font-medium shadow-lg hover:shadow-xl"
          >My Passes
          </Link>

        {message && (
          <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message.text}
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          <div className={`flex-1 text-center py-2 rounded-l-lg ${step === 1 ? "bg-blue-600 text-white font-bold" : "bg-gray-200 text-gray-700"}`}>1. Personal Info</div>
          <div className={`flex-1 text-center py-2 rounded-r-lg ${step === 2 ? "bg-blue-600 text-white font-bold" : "bg-gray-200 text-gray-700"}`}>2. Payment</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Full Name</label>
                <input type="text" value={name} maxLength={50} onChange={e => setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <input type="email" value={email} maxLength={50} onChange={e => setEmail(e.target.value.replace(/\s/g, ""))}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Aadhaar</label>
                <input type="text" value={adhaar} maxLength={12} onChange={e => setAdhaar(e.target.value.replace(/\D/g, ""))}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.adhaar && <p className="text-red-600 text-sm mt-1">{errors.adhaar}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Phone</label>
                <input type="text" value={phone} maxLength={10} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">College (Optional)</label>
                <select value={collegeName} onChange={e => setCollegeName(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select College</option>
                  {colleges.map((c, idx) => <option key={idx} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700">Address</label>
                <textarea value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-lg font-semibold">Amount to Pay: <span className="text-blue-600">₹{FIXED_PRICE}</span></p>

              <div className="text-center p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="mb-2 font-medium">Scan this QR to pay</p>
                <img src="/gymkhanaQR.jpg" alt="QR Code" className="w-48 mx-auto" />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Transaction ID</label>
                <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.transactionId && <p className="text-red-600 text-sm mt-1">{errors.transactionId}</p>}
              </div>

              <div>
                <label className="block font-medium text-gray-700">Upload Payment Proof</label>
                <input type="file" accept="image/png, image/jpeg, application/pdf" onChange={e => setPaymentProof(e.target.files[0])} className="w-full mt-1"/>
                {errors.paymentProof && <p className="text-red-600 text-sm mt-1">{errors.paymentProof}</p>}
                {paymentProof && <p className="text-green-700 text-sm mt-1">File selected: {paymentProof.name}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && <button type="button" onClick={prev} className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100">&larr; Back</button>}
            {step < 2 && <button type="button" onClick={next} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next &rarr;</button>}
            {step === 2 && <button type="submit" disabled={submitting} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">{submitting ? "Submitting..." : "Confirm & Submit"}</button>}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
