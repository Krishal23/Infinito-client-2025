import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Volleyball_ = () => {
  const [form, setForm] = useState({
    captainName: "",
    viceCaptainName: "",
    email: "",
    captainPhone: "",
    viceCaptainPhone: "",
    category: "men",
    position: "setter",
    height: "",
    teamPreference: "create_new",
    jerseySize: "M",
    experience: "beginner",
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
        position: form.position,
        height: form.height,
        teamPreference: form.teamPreference,
        jerseySize: form.jerseySize,
        experience: form.experience,
        teamName: `${form.collegeName} Volleyball`.replace(/\s+/g, " ").trim(),
        team: {
          teamName: `${form.collegeName} Volleyball`.replace(/\s+/g, " ").trim(),
          teamSize: 6,
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
      const res = await axiosInstance.post('/events/volleyball/register', payload);
      toast.success(res.data?.message || 'Registered successfully!');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ captainName: "", viceCaptainName: "", email: "", captainPhone: "", viceCaptainPhone: "", category: "men", position: "setter", height: "", teamPreference: "create_new", jerseySize: "M", experience: "beginner", collegeName: "", collegeAddress: "" });
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
          <h2>Register for VolleyBall</h2>
        </div>

        <div className="rules">

          🏐🔥 Spike, Set, and Serve Your Way to Victory! 🔥🏐
          <br />
          <br />

          Welcome to the Volleyball Tournament at Infinito – IIT Patna's most thrilling and action-packed sports fest! Get ready to bump, set, and smash your way through intense matches as you and your team battle for ultimate glory on the court! 💥
          <br />
          <br />
          Whether you're a seasoned spiker or just love the energy of a great game, this is your chance to join the volleyball action and create unforgettable moments with your squad!
          <br />
          <br />
          Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted
          <br />
          <br />
          <strong>Participation Fees</strong> Boys -  Rs. 3600/- per team , Girls - Rs Rs. 3000/- per team
          <br />
          <br />
          <strong>Rulebook</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2024 Volleyball rulebook
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
          Abhinav Srivastava - 9204698703
          <br />
          Abhinandan Porwal - 6306796285
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <input type="text" name="captainName" placeholder="Team captain name" value={form.captainName} onChange={handleChange} required />
          <input type="text" name="viceCaptainName" placeholder="Team vice-captain name" value={form.viceCaptainName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="captainPhone" placeholder="Captain phone (WhatsApp)" value={form.captainPhone} onChange={handleChange} required />
          <input type="tel" name="viceCaptainPhone" placeholder="Vice-captain phone (WhatsApp)" value={form.viceCaptainPhone} onChange={handleChange} required />

          <div className="radio">
            Category:
            <label>
              <input type="radio" name="category" value="men" checked={form.category === 'men'} onChange={handleChange} /> Men
            </label>
            <label>
              <input type="radio" name="category" value="women" checked={form.category === 'women'} onChange={handleChange} /> Women
            </label>
          </div>

          <select name="position" value={form.position} onChange={handleChange} required>
            <option value="">Select Position</option>
            <option value="setter">Setter</option>
            <option value="outside_hitter">Outside Hitter</option>
            <option value="middle_blocker">Middle Blocker</option>
            <option value="opposite">Opposite</option>
            <option value="libero">Libero</option>
            <option value="universal">Universal</option>
          </select>

          <input type="text" name="height" placeholder="Height (e.g., 5'8&quot;)" value={form.height} onChange={handleChange} required />

          <select name="teamPreference" value={form.teamPreference} onChange={handleChange} required>
            <option value="">Select Team Preference</option>
            <option value="create_new">Create New Team</option>
            <option value="join_existing">Join Existing Team</option>
            <option value="no_preference">No Preference</option>
          </select>

          <select name="jerseySize" value={form.jerseySize} onChange={handleChange} required>
            <option value="">Select Jersey Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <select name="experience" value={form.experience} onChange={handleChange} required>
            <option value="">Select Experience Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>

          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />
          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div >
  );
};

export default Volleyball_;
