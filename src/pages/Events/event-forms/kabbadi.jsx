import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Kabbadi_ = () => {
  const [form, setForm] = useState({
    captainName: "",
    viceCaptainName: "",
    email: "",
    captainPhone: "",
    viceCaptainPhone: "",
    collegeName: "",
    collegeAddress: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        fullname: form.captainName,
        email: form.email,
        phoneNumber: form.captainPhone,
        collegeName: form.collegeName,
        category: "men",
        weight: 70,
        height: "5'8",
        position: "raider",
        teamPreference: "create_new",
        experience: "beginner",
        teamName: `${form.collegeName} Kabaddi`.replace(/\s+/g, " ").trim(),
        team: {
          teamName: `${form.collegeName} Kabaddi`.replace(/\s+/g, " ").trim(),
          teamSize: 7,
          members: [
            {
              fullname: form.captainName,
              email: form.email,
              phoneNumber: form.captainPhone,
              role: "Captain"
            },
            {
              fullname: form.viceCaptainName,
              email: form.email,
              phoneNumber: form.viceCaptainPhone,
              role: "Vice Captain"
            }
          ]
        }
      };
      const res = await axiosInstance.post('/events/kabaddi/register', payload);
      toast.success(res.data?.message || 'Registered');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ captainName: "", viceCaptainName: "", email: "", captainPhone: "", viceCaptainPhone: "", collegeName: "", collegeAddress: "" });
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
          <h2>Register for Kabbadi   </h2>
        </div>

        <div className="rules">
          Prepare for an adrenaline-fueled spectacle as fearless athletes engage in a battle of body and mind in the ancient sport of Kabaddi. Witness lightning-fast raids, breathtaking tackles, and a symphony of strategy as heroes risk it all in pursuit of glory!
          <br />
          <br />
          Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
          <br />
          <br />
          <strong>Participation Fees</strong> Rs. 3000/- per team
          <br />
          <br />
          <strong>Rulebook</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2024 Kabbadi rulebook
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
          Akhilesh Ingole: +91 9404549742

        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="captainName" placeholder="Team captain name" value={form.captainName} onChange={handleChange} required />
          <input type="text" name="viceCaptainName" placeholder="Team vice-captain name" value={form.viceCaptainName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="captainPhone" placeholder="Captain phone (WhatsApp)" value={form.captainPhone} onChange={handleChange} required />
          <input type="tel" name="viceCaptainPhone" placeholder="Vice-captain phone (WhatsApp)" value={form.viceCaptainPhone} onChange={handleChange} required />
          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div >
  );
};

export default Kabbadi_;
