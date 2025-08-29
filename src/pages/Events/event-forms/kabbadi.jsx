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
    captainEmail: "",
    captainPhone: "",
    captainAadharId: "",
    captainCollegeId: "",
    viceCaptainName: "",
    viceCaptainEmail: "",
    viceCaptainPhone: "",
    viceCaptainAadharId: "",
    viceCaptainCollegeId: "",
    category: "men",
    collegeName: "",
    collegeAddress: "",
    players: []
  });

  const [playerForm, setPlayerForm] = useState({
    name: "",
    email: "",
    phone: "",
    aadharId: "",
    collegeId: "",
    position: "raider" // or "defender" or "all_rounder"
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlayerChange = (e) => {
    setPlayerForm({ ...playerForm, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = () => {
    if (!playerForm.name || !playerForm.aadharId) {
      toast.error("Player name and Aadhar ID are required");
      return;
    }

    setForm(prev => ({
      ...prev,
      players: [...prev.players, { ...playerForm, role: "Player" }]
    }));

    // Reset player form
    setPlayerForm({
      name: "",
      email: "",
      phone: "",
      aadharId: "",
      collegeId: "",
      position: "raider"
    });
  };

  const handleRemovePlayer = (index) => {
    setForm(prev => ({
      ...prev,
      players: prev.players.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (form.players.length < 5) { // Minimum 7 players including captain and vice-captain
        toast.error("Please add at least 5 more players");
        return;
      }

      const payload = {
        fullname: form.captainName,
        email: form.captainEmail,
        phoneNumber: form.captainPhone,
        collegeName: form.collegeName,
        category: "men",
        teamPreference: "create_new",
        teamName: `${form.collegeName} Kabaddi`.replace(/\s+/g, " ").trim(),
        team: {
          teamName: `${form.collegeName} Kabaddi`.replace(/\s+/g, " ").trim(),
          teamSize: 7,
          members: [
            {
              fullname: form.captainName,
              email: form.captainEmail,
              phoneNumber: form.captainPhone,
              aadharId: form.captainAadharId,
              collegeId: form.captainCollegeId,
              role: "Captain"
            },
            {
              fullname: form.viceCaptainName,
              email: form.viceCaptainEmail,
              phoneNumber: form.viceCaptainPhone,
              aadharId: form.viceCaptainAadharId,
              collegeId: form.viceCaptainCollegeId,
              role: "Vice Captain"
            },
            ...form.players.map(player => ({
              ...player,
              fullname: player.name
            }))
          ]
        }
      };
      const res = await axiosInstance.post('/events/kabaddi/register', payload);
      toast.success(res.data?.message || 'Registered');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({
        captainName: "",
        captainEmail: "",
        captainPhone: "",
        captainAadharId: "",
        captainCollegeId: "",
        viceCaptainName: "",
        viceCaptainEmail: "",
        viceCaptainPhone: "",
        viceCaptainAadharId: "",
        viceCaptainCollegeId: "",
        category: "men",
        collegeName: "",
        collegeAddress: "",
        players: []
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
          <h3>Captain Details</h3>
          <input type="text" name="captainName" placeholder="Team captain name" value={form.captainName} onChange={handleChange} required />
          <input type="email" name="captainEmail" placeholder="Captain email" value={form.captainEmail} onChange={handleChange} required />
          <input type="tel" name="captainPhone" placeholder="Captain phone (WhatsApp)" value={form.captainPhone} onChange={handleChange} required />
          <input type="text" name="captainAadharId" placeholder="Captain Aadhar ID" value={form.captainAadharId} onChange={handleChange} required />
          <input type="text" name="captainCollegeId" placeholder="Captain College ID (if any)" value={form.captainCollegeId} onChange={handleChange} />

          <h3>Vice-Captain Details</h3>
          <input type="text" name="viceCaptainName" placeholder="Team vice-captain name" value={form.viceCaptainName} onChange={handleChange} required />
          <input type="email" name="viceCaptainEmail" placeholder="Vice-captain email" value={form.viceCaptainEmail} onChange={handleChange} required />
          <input type="tel" name="viceCaptainPhone" placeholder="Vice-captain phone (WhatsApp)" value={form.viceCaptainPhone} onChange={handleChange} required />
          <input type="text" name="viceCaptainAadharId" placeholder="Vice-captain Aadhar ID" value={form.viceCaptainAadharId} onChange={handleChange} required />
          <input type="text" name="viceCaptainCollegeId" placeholder="Vice-captain College ID (if any)" value={form.viceCaptainCollegeId} onChange={handleChange} />
          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />

          <h3>Add Players</h3>
          <div className="player-form">
            <input type="text" name="name" placeholder="Player name" value={playerForm.name} onChange={handlePlayerChange} />
            <input type="email" name="email" placeholder="Player email" value={playerForm.email} onChange={handlePlayerChange} />
            <input type="tel" name="phone" placeholder="Player phone" value={playerForm.phone} onChange={handlePlayerChange} />
            <input type="text" name="aadharId" placeholder="Player Aadhar ID" value={playerForm.aadharId} onChange={handlePlayerChange} />
            <input type="text" name="collegeId" placeholder="Player College ID (if any)" value={playerForm.collegeId} onChange={handlePlayerChange} />
            <select name="position" value={playerForm.position} onChange={handlePlayerChange}>
              <option value="raider">Raider</option>
              <option value="defender">Defender</option>
              <option value="all_rounder">All Rounder</option>
            </select>
            <button type="button" onClick={handleAddPlayer}>Add Player</button>
          </div>

          <h3>Team Players ({form.players.length}/5 minimum required)</h3>
          <div className="player-list">
            {form.players.map((player, index) => (
              <div key={index} className="player-item">
                <span>{player.name} - {player.position} - Aadhar: {player.aadharId}</span>
                <button type="button" onClick={() => handleRemovePlayer(index)}>Remove</button>
              </div>
            ))}
          </div>

          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div >
  );
};

export default Kabbadi_;
