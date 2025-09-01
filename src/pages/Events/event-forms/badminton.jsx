import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../utils/useEventRegistration";

const Badminton = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "Men", // default
    captainName: "",
    captainEmail: "",
    captainPhone: "",
    captainAadhaar: "",
    viceName: "",
    viceEmail: "",
    vicePhone: "",
    viceAadhaar: "",
    players: [
      { name: "", email: "", phoneNumber: "", aadhaar: "" },
      { name: "", email: "", phoneNumber: "", aadhaar: "" },
      { name: "", email: "", phoneNumber: "", aadhaar: "" }
    ],
    collegeName: "",
    collegeAddress: "",
    coachName: "",
    coachEmail: "",
    coachPhone: ""
  });

  const { registerEvent, submitting } = useEventRegistration({
    endpoint: "/events/badminton",
    redirectUrl: "/event/ins",
    payment: true,
  });

  const isValidAadhaar = (val) => /^\d{12}$/.test(val.trim());
  const isValidPhone = (val) => /^\d{10}$/.test(val.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlayerChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.players];
      updated[index][field] = value;
      return { ...prev, players: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidAadhaar(form.captainAadhaar) || !isValidPhone(form.captainPhone)) {
      toast.error("Please enter valid Aadhaar & phoneNumber for Captain");
      return;
    }
    if (!isValidAadhaar(form.viceAadhaar) || !isValidPhone(form.vicePhone)) {
      toast.error("Please enter valid Aadhaar & phoneNumber for Vice-Captain");
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (
        !form.players[i].name.trim() ||
        !form.players[i].email.trim() ||
        !isValidPhone(form.players[i].phoneNumber) ||
        !isValidAadhaar(form.players[i].aadhaar)
      ) {
        toast.error(`Please fill valid details for all Player`);
        return;
      }
    }
    

    const payload = {
      category: form.category,
      captain: {
        fullname: form.captainName,
        email: form.captainEmail,
        phoneNumber: form.captainPhone,
        aadharId: form.captainAadhaar,
      },
      viceCaptain: {
        fullname: form.viceName,
        email: form.viceEmail,
        phoneNumber: form.vicePhone,
        aadharId: form.viceAadhaar,
      },
      players: form.players.map((p, idx) => ({
        fullname: p.name,
        email: p.email,
        phoneNumber: p.phoneNumber,
        aadharId: p.aadhaar,
      })),
      collegeName: form.collegeName,
      collegeAddress: form.collegeAddress,
      coach: {
        name: form.coachName,
        email: form.coachEmail,
        phoneNumber: form.coachPhone,
      },
    };
    

    registerEvent(payload, navigate);
  };

  return (
    <div className="div">
      <Navbar />
      <section className="event-forms">
        <div className="form-heading">
          <h2>Register for Badminton</h2>
        </div>

        <div className="rules">
          🏸 Welcome to Infinito 2024 Badminton Tournament! 🏸
          <br /><br />
          <strong>Participation Fees</strong> - Rs. 1000/- per team
          <br /><br />
          <strong>Rulebook</strong> - <a href="infinito.iitp.ac.in" target="_blank" rel="noopener noreferrer">Infinito 2024 Badminton rulebook</a>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Category */}
          <div className="form-section">
            <strong>Category</strong>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>

          {/* Captain */}
          <div className="form-section">
            <strong>Captain Details</strong>
            <input type="text" name="captainName" placeholder="Captain Name" value={form.captainName} onChange={handleChange} required />
            <input type="email" name="captainEmail" placeholder="Captain Email" value={form.captainEmail} onChange={handleChange} required />
            <input type="text" name="captainPhone" placeholder="Captain phoneNumber (10 digits)" value={form.captainPhone} onChange={handleChange} required />
            <input type="text" name="captainAadhaar" placeholder="Captain Aadhaar (12 digits)" value={form.captainAadhaar} onChange={handleChange} required />
          </div>

          {/* Vice-Captain */}
          <div className="form-section">
            <strong>Vice-Captain Details</strong>
            <input type="text" name="viceName" placeholder="Vice-Captain Name" value={form.viceName} onChange={handleChange} required />
            <input type="email" name="viceEmail" placeholder="Vice-Captain Email" value={form.viceEmail} onChange={handleChange} required />
            <input type="text" name="vicePhone" placeholder="Vice-Captain phoneNumber (10 digits)" value={form.vicePhone} onChange={handleChange} required />
            <input type="text" name="viceAadhaar" placeholder="Vice-Captain Aadhaar (12 digits)" value={form.viceAadhaar} onChange={handleChange} required />
          </div>

          {/* Players */}
          <div className="form-section">
            <strong>Other 3 Players</strong>
            {form.players.map((player, idx) => (
              <div key={idx} className="player-inputs">
                <input type="text" placeholder={`Player ${idx + 1} Name`} value={player.name} onChange={(e) => handlePlayerChange(idx, "name", e.target.value)} required />
                <input type="email" placeholder={`Player ${idx + 1} Email`} value={player.email} onChange={(e) => handlePlayerChange(idx, "email", e.target.value)} required />
                <input type="text" placeholder={`Player ${idx + 1} phoneNumber`} value={player.phoneNumber} onChange={(e) => handlePlayerChange(idx, "phoneNumber", e.target.value)} required />
                <input type="text" placeholder={`Player ${idx + 1} Aadhaar`} value={player.aadhaar} onChange={(e) => handlePlayerChange(idx, "aadhaar", e.target.value)} required />
              </div>
            ))}
          </div>

          {/* College */}
          <div className="form-section">
            <strong>College Details</strong>
            <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange}  />
            <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange}  />
          </div>

          {/* Coach */}
          <div className="form-section">
            <strong>Coach Details</strong>
            <input type="text" name="coachName" placeholder="Coach Name" value={form.coachName} onChange={handleChange}  />
            <input type="email" name="coachEmail" placeholder="Coach Email" value={form.coachEmail} onChange={handleChange}  />
            <input type="text" name="coachPhone" placeholder="Coach phoneNumber (10 digits)" value={form.coachPhone} onChange={handleChange}  />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Register & Pay"}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Badminton;
