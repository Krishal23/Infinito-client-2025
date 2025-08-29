import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Basketball_ = () => {
  const [form, setForm] = useState({
    captainName: "",
    viceCaptainName: "",
    email: "",
    captainPhone: "",
    viceCaptainPhone: "",
    category: "men",
    position: "any",
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
        teamName: `${form.collegeName} Basketball`.replace(/\s+/g, " ").trim(),
        team: {
          teamName: `${form.collegeName} Basketball`.replace(/\s+/g, " ").trim(),
          teamSize: 5,
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
      const res = await axiosInstance.post('/events/basketball/register', payload);
      toast.success(res.data?.message || 'Registered successfully!');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ captainName: "", viceCaptainName: "", email: "", captainPhone: "", viceCaptainPhone: "", category: "men", position: "any", height: "", teamPreference: "create_new", jerseySize: "M", experience: "beginner", collegeName: "", collegeAddress: "" });
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
          <h2>Register for Basketball</h2>
        </div>

        <div className="rules">

          The ref calls for a jump ball. You are now in possession, guarded by three, with nowhere to go you attempt a fadeaway. Did it go through the hoop, rebound of the backboard or was it just an airball?
          There's only one way to figure that out - Register in the latest edition of INFINITO and bring out the MJ in you with those alley-oops and dunks.
          <br />
          <br />
          Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
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
            Infinito 2024 Basketball rulebook
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
          Rishabh Singraur - 7764070448
          <br />
          Abhimanyu - 8969195838
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
            <option value="point_guard">Point Guard</option>
            <option value="shooting_guard">Shooting Guard</option>
            <option value="small_forward">Small Forward</option>
            <option value="power_forward">Power Forward</option>
            <option value="center">Center</option>
            <option value="any">Any Position</option>
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

export default Basketball_;
