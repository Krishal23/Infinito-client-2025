import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Tt_ = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", collegeName: "", collegeAddress: "", gender: "male" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        event: "table_tennis",
        name: form.name,
        email: form.email,
        phoneNumber: form.phone,
        collegeName: form.collegeName,
        collegeAddress: form.collegeAddress,
        gender: form.gender
      };
      const res = await axiosInstance.post('/events/table-tennis/register', payload);
      toast.success(res.data?.message || 'Registered');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ name: "", email: "", phone: "", collegeName: "", collegeAddress: "", gender: "male" });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="div">
      <Navbar />
      <section className="event-forms">
        <div className="form-heading">
          <h2>Register for Table Tennis   </h2>
        </div>

        <div className="rules">


          As of 2024, with five amazing editions to its name, Infinito has earned its place as the the biggest and most awaited sports fest of Bihar, India.
          <br />
          <br />

          Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
          <br />
          <br />
          Note: BRING YOUR KIT WITH YOU
          <br />
          <br />
          <strong>Participation Fees</strong> Rs 1200/-
          <br />
          <br />
          <strong>Rulebook</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2024 Table Tennis rulebook
          </a>
          <br />
          <br />
          <strong>Registration Guidelines</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2k24 Guidelines
          </a>
          <br />
          <br />
          For any queries, kindly contact -
          <br />
          Anirudh Reddy - 8919450229
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Contact number (WhatsApp)" value={form.phone} onChange={handleChange} required />
          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />
          <div className="radio">
            Gender:
            <label>
              <input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} /> Female
            </label>
          </div>
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div >
  );
};

export default Tt_;
