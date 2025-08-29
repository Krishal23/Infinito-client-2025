import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Lawn_ = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    aadharId: "",
    category: "men_singles",
    playingHand: "right",
    skillLevel: "beginner",
    collegeName: "",
    collegeAddress: "",
    previousTournaments: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        fullname: form.fullname,
        email: form.email,
        phoneNumber: form.phone,
        aadharId: form.aadharId,
        collegeName: form.collegeName,
        category: form.category,
        skillLevel: form.skillLevel,
        playingHand: form.playingHand,
        previousTournaments: form.previousTournaments || undefined,
        team: {
          teamName: `${form.collegeName} Lawn Tennis`.replace(/\s+/g, " ").trim(),
          teamSize: form.category.includes('doubles') ? 2 : 1,
          members: [
            {
              fullname: form.fullname,
              email: form.email,
              phoneNumber: form.phone,
              aadharId: form.aadharId,
              role: "Captain"
            }
          ]
        }
      };
      const res = await axiosInstance.post('/events/lawn-tennis/register', payload);
      toast.success(res.data?.message || 'Registered');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({
        fullname: "",
        email: "",
        phone: "",
        aadharId: "",
        category: "men_singles",
        playingHand: "right",
        skillLevel: "beginner",
        collegeName: "",
        collegeAddress: "",
        previousTournaments: ""
      });
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
          <h2>Register for Lawn Tennis   </h2>
        </div>

        <div className="rules">

          🎾💥 Serve, Smash, and Ace Your Way to Glory! 💥🎾
          <br />
          Welcome to the Lawn Tennis Tournament at Infinito, IIT Patna's premier sports fest! Get ready to step onto the court, feel the thrill of each serve, and battle it out in intense matches under the sun. Whether you're a seasoned player or just love the game, this is your chance to rally, lob, and volley your way to victory! 🌟
          <br />
          <br />
          Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
          <br />
          <br />
          <strong>Participation Fees</strong> Rs 800/- per team
          <br />
          <br />
          <strong>Rulebook</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2024 Lawn Tennis rulebook
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
          Pranshu Deep - 8248558408
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Contact (WhatsApp)" value={form.phone} onChange={handleChange} required />
          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />
          <div className="radio">
            Category:
            <label>
              <input type="radio" name="category" value="men_singles" checked={form.category === 'men_singles'} onChange={handleChange} /> Men's Singles
            </label>
            <label>
              <input type="radio" name="category" value="women_singles" checked={form.category === 'women_singles'} onChange={handleChange} /> Women's Singles
            </label>
            <label>
              <input type="radio" name="category" value="men_doubles" checked={form.category === 'men_doubles'} onChange={handleChange} /> Men's Doubles
            </label>
            <label>
              <input type="radio" name="category" value="women_doubles" checked={form.category === 'women_doubles'} onChange={handleChange} /> Women's Doubles
            </label>
            <label>
              <input type="radio" name="category" value="mixed_doubles" checked={form.category === 'mixed_doubles'} onChange={handleChange} /> Mixed Doubles
            </label>
          </div>

          <select name="playingHand" value={form.playingHand} onChange={handleChange} required>
            <option value="">Select Playing Hand</option>
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="ambidextrous">Ambidextrous</option>
          </select>

          <select name="skillLevel" value={form.skillLevel} onChange={handleChange} required>
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>

          <input
            type="text"
            name="previousTournaments"
            placeholder="Previous Tournaments (Optional)"
            value={form.previousTournaments}
            onChange={handleChange}
          />
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div >
  );
};

export default Lawn_;
