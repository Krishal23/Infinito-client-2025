import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Squash_ = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    collegeName: "", 
    collegeAddress: "", 
    gender: "male",
    category: "men_singles",
    skillLevel: "beginner",
    playingHand: "right",
    racketBrand: "",
    previousTournaments: "",
    eyewearRequired: false,
    tShirtSize: "M"
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const payload = {
        fullname: form.name,
        email: form.email,
        phoneNumber: form.phone,
        collegeName: form.collegeName,
        category: form.category,
        skillLevel: form.skillLevel,
        playingHand: form.playingHand,
        racketBrand: form.racketBrand || undefined,
        previousTournaments: form.previousTournaments || undefined,
        eyewearRequired: form.eyewearRequired,
        tShirtSize: form.tShirtSize
      };
      const res = await axiosInstance.post('/events/squash/register', payload);
      toast.success(res.data?.message || 'Registered successfully!');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ name: "", email: "", phone: "", collegeName: "", collegeAddress: "", gender: "male", category: "men_singles", skillLevel: "beginner", playingHand: "right", racketBrand: "", previousTournaments: "", eyewearRequired: false, tShirtSize: "M" });
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
          <h2>Register for Squash</h2>
        </div>

        <div className="rules">

          🎾💥 Serve, Smash, and Ace Your Way to Glory! 💥🎾
          <br />
          <br />
          Infinito is the annual Sports Festival of Indian Institute of Technology, Patna. Having begun in 2016, 'Infinito' is derived from the Latin word 'Infinitus', and stands to symbolize the infinite potential of the human body.
          Welcome to the Squash Tournament at Infinito, IIT Patna's premier sports fest! Get ready to step onto the court, feel the thrill of each serve, and battle it out in intense matches under the sun. Whether you're a seasoned player or just love the game, this is your chance to rally, lob, and volley your way to victory! 🌟
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
            Infinito 2024 Squash rulebook
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
          Jatin Aggarwal - 7814442765
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Contact number (WhatsApp)" value={form.phone} onChange={handleChange} required />
          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />
          
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="men_singles">Men Singles</option>
            <option value="women_singles">Women Singles</option>
          </select>

          <select name="skillLevel" value={form.skillLevel} onChange={handleChange} required>
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>

          <select name="playingHand" value={form.playingHand} onChange={handleChange} required>
            <option value="">Select Playing Hand</option>
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="ambidextrous">Ambidextrous</option>
          </select>

          <select name="tShirtSize" value={form.tShirtSize} onChange={handleChange} required>
            <option value="">Select T-Shirt Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <input type="text" name="racketBrand" placeholder="Racket Brand (Optional)" value={form.racketBrand} onChange={handleChange} />
          <input type="text" name="previousTournaments" placeholder="Previous Tournaments (Optional)" value={form.previousTournaments} onChange={handleChange} />
          
          <div className="radio">
            <label>
              <input type="checkbox" name="eyewearRequired" checked={form.eyewearRequired} onChange={handleChange} /> I require protective eyewear
            </label>
          </div>

          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Squash_;
