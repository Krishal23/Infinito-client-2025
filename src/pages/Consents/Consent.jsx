import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Consent = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    issue: "events",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.description.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    if (form.description.length > 500) {
      toast.error("Description must be <= 500 characters");
      return;
    }
    setSubmitting(true);
    try {
      await axiosInstance.post("/consent", form);
      toast.success("Submitted successfully");
      setForm({ name: "", email: "", issue: "events", description: "" });
      await axiosInstance.post("/consent", form);
      setForm({ name: "", email: "", issue: "events", description: "" });
      navigate("/"); // go to Home
    } catch (err) {
      toast.error(err?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="event-forms" style={{ maxWidth: 600, margin: "40px auto", padding: 16 }}>
        <h2 style={{ marginBottom: 16 }}>Consent Form</h2>
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <select name="issue" value={form.issue} onChange={handleChange} required>
            <option value="events">Events</option>
            <option value="accommodation">Accommodation</option>
            <option value="merch">Merch</option>
            <option value="other">Other</option>
          </select>
          <textarea name="description" placeholder="Description" rows="4" value={form.description} onChange={handleChange} required />
          <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Consent;