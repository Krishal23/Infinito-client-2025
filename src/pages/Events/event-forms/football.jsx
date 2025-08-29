import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlayerModal = ({ onClose, onAdd }) => {
  const [player, setPlayer] = useState({
    name: "",
    aadharId: "",
    collegeId: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(player);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Team Member</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            name="name"
            placeholder="Player Name"
            value={player.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="aadharId"
            placeholder="Aadhar ID"
            value={player.aadharId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="collegeId"
            placeholder="College ID (if any)"
            value={player.collegeId}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={player.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={player.email}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Player</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Football_ = () => {
  const [form, setForm] = useState({
    captainName: "",
    viceCaptainName: "",
    email: "",
    captainPhone: "",
    viceCaptainPhone: "",
    category: "men",
    position: "any",
    preferredFoot: "right",
    teamPreference: "create_new",
    jerseySize: "M",
    shoeSize: "",
    experience: "beginner",
    collegeName: "",
    collegeAddress: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const handleAddPlayer = (player) => {
    setMembers([...members, { ...player, role: "Player" }]);
  };

  const handleRemovePlayer = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const allMembers = [
        {
          name: form.captainName,
          email: form.email,
          phoneNumber: form.captainPhone,
          role: "Captain"
        },
        {
          name: form.viceCaptainName,
          email: form.email,
          phoneNumber: form.viceCaptainPhone,
          role: "Vice Captain"
        },
        ...members
      ];

      if (allMembers.length < 11) {
        toast.error("A football team needs at least 11 players including captain and vice captain");
        return;
      }

      const payload = {
        event: "football",
        captainName: form.captainName,
        email: form.email,
        phoneNumber: form.captainPhone,
        collegeName: form.collegeName,
        category: form.category,
        position: form.position,
        preferredFoot: form.preferredFoot,
        teamPreference: form.teamPreference,
        jerseySize: form.jerseySize,
        shoeSize: form.shoeSize,
        experience: form.experience,
        teamName: `${form.collegeName} FC`.replace(/\s+/g, " ").trim(),
        captain: {
          name: form.captainName,
          email: form.email,
          phoneNumber: form.captainPhone
        },
        viceCaptain: {
          name: form.viceCaptainName,
          email: form.email,
          phoneNumber: form.viceCaptainPhone
        },
        members: allMembers
      };
      const res = await axiosInstance.post('/events/football/register', payload);
      toast.success(res.data?.message || 'Registered successfully!');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ captainName: "", viceCaptainName: "", email: "", captainPhone: "", viceCaptainPhone: "", category: "men", position: "any", preferredFoot: "right", teamPreference: "create_new", jerseySize: "M", shoeSize: "", experience: "beginner", collegeName: "", collegeAddress: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="div">
      <Navbar />
      <section className="event-forms">
        <div className="form-heading">
          <h2>Register for Football</h2>
        </div>

        <div className="rules">

          Lace up your boots, put those shin guards on and take the pitch. While you try to put the ball in the back of the net, your opponents push towards a clean sheet. With a multitude of exciting talent participating, do you think you got what it takes to survive the group of death?
          <br />
          <br />
          Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
          <br />
          <br />
          <strong>Participation Fees</strong> Rs. 5000/- per team
          <br />
          <br />
          <strong>Rulebook</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2024 Football rulebook
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
          Ritesh Kumar - +91 8708151519
          <br />
          Riya Singh - +91 9598407607540
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
            <option value="goalkeeper">Goalkeeper</option>
            <option value="defender">Defender</option>
            <option value="midfielder">Midfielder</option>
            <option value="forward">Forward</option>
            <option value="any">Any Position</option>
          </select>

          <select name="preferredFoot" value={form.preferredFoot} onChange={handleChange} required>
            <option value="">Select Preferred Foot</option>
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="both">Both</option>
          </select>

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

          <input type="text" name="shoeSize" placeholder="Shoe Size (e.g., 8, 9, 10)" value={form.shoeSize} onChange={handleChange} required />

          <select name="experience" value={form.experience} onChange={handleChange} required>
            <option value="">Select Experience Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>

          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />

          <div className="team-members-section">
            <h3>Team Members ({members.length + 2}/11)</h3>
            <div className="members-list">
              <div className="member-item">
                <span>Captain: {form.captainName}</span>
              </div>
              <div className="member-item">
                <span>Vice Captain: {form.viceCaptainName}</span>
              </div>
              {members.map((member, index) => (
                <div key={index} className="member-item">
                  <span>{member.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowPlayerModal(true)}
              className="add-player-btn"
            >
              Add Player
            </button>
          </div>

          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>

      {showPlayerModal && (
        <PlayerModal
          onClose={() => setShowPlayerModal(false)}
          onAdd={handleAddPlayer}
        />
      )}
      <Footer />
    </div>
  );
};

export default Football_;
