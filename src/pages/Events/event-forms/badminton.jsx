import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Badminton_ = () => {
  const [form, setForm] = useState({
    captainName: "",
    viceCaptainName: "",
    email: "",
    captainPhone: "",
    viceCaptainPhone: "",
    category: "men_singles",
    skillLevel: "beginner",
    playingHand: "right",
    racketBrand: "",
    previousTournaments: "",
    tShirtSize: "M",
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
        category: form.category,
        skillLevel: form.skillLevel,
        playingHand: form.playingHand,
        racketBrand: form.racketBrand || undefined,
        previousTournaments: form.previousTournaments || undefined,
        tShirtSize: form.tShirtSize,
        teamName: `${form.collegeName} Badminton`.replace(/\s+/g, " ").trim(),
        team: {
          teamName: `${form.collegeName} Badminton`.replace(/\s+/g, " ").trim(),
          teamSize: 2,
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
      const res = await axiosInstance.post('/events/badminton/register', payload);
      toast.success(res.data?.message || 'Registered successfully!');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ captainName: "", viceCaptainName: "", email: "", captainPhone: "", viceCaptainPhone: "", category: "men_singles", skillLevel: "beginner", playingHand: "right", racketBrand: "", previousTournaments: "", tShirtSize: "M", collegeName: "", collegeAddress: "" });
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
          <h2>Register for Badminton</h2>
        </div>

        <div className="rules">

          As of 2024, with eight amazing editions to its name, Infinito has earned its place as the the biggest and most awaited sports fest of Bihar, India.
          <br />
          <br />
          Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted
          <br />
          <br />
          <strong>Participation Fees</strong> - Rs. 1000/- per team
          <br />
          <br />
          <strong>Rulebook</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2024 Badminton rulebook
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
          Prajyot -  +91 9403394000
          <br />
          Shrika Reddy - +91 6305590331
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="captainName" placeholder="Team captain name" value={form.captainName} onChange={handleChange} required />
          <input type="text" name="viceCaptainName" placeholder="Team vice-captain name" value={form.viceCaptainName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="captainPhone" placeholder="Captain phone (WhatsApp)" value={form.captainPhone} onChange={handleChange} required />
          <input type="tel" name="viceCaptainPhone" placeholder="Vice-captain phone (WhatsApp)" value={form.viceCaptainPhone} onChange={handleChange} required />
          
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="men_singles">Men Singles</option>
            <option value="women_singles">Women Singles</option>
            <option value="men_doubles">Men Doubles</option>
            <option value="women_doubles">Women Doubles</option>
            <option value="mixed_doubles">Mixed Doubles</option>
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
          
          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div >
  );
};

export default Badminton_;
