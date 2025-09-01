import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../utils/useEventRegistration";

const LawnTennis = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "Men", // default
    players: [
      { name: "", email: "", phoneNumber: "", aadhaar: "" },
      { name: "", email: "", phoneNumber: "", aadhaar: "" },
    ],
    collegeName: "",
    collegeAddress: "",
    coachName: "",
    coachEmail: "",
    coachPhone: "",
  });

  const { registerEvent, submitting } = useEventRegistration({
    endpoint: "/events/lawn_tennis",
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

    for (let i = 0; i < 2; i++) {
      const p = form.players[i];
      if (!p.name.trim() || !p.email.trim() || !isValidPhone(p.phoneNumber) || !isValidAadhaar(p.aadhaar)) {
        toast.error(`Please fill valid details for Player ${i + 1}`);
        return;
      }
    }

    if (form.coachPhone && !isValidPhone(form.coachPhone)) {
      toast.error("Please enter a valid Coach phoneNumber number");
      return;
    }

    const payload = {
      category: form.category,
      players: form.players.map((p) => ({
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
          <h2>Register for Lawn Tennis</h2>
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

          {/* Players */}
          <div className="form-section">
            <strong>Players (2)</strong>
            {form.players.map((player, idx) => (
              <div key={idx} className="player-inputs">
                <input
                  type="text"
                  placeholder={`Player ${idx + 1} Name`}
                  value={player.name}
                  onChange={(e) => handlePlayerChange(idx, "name", e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder={`Player ${idx + 1} Email`}
                  value={player.email}
                  onChange={(e) => handlePlayerChange(idx, "email", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder={`Player ${idx + 1} phoneNumber`}
                  value={player.phoneNumber}
                  onChange={(e) => handlePlayerChange(idx, "phoneNumber", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder={`Player ${idx + 1} Aadhaar`}
                  value={player.aadhaar}
                  onChange={(e) => handlePlayerChange(idx, "aadhaar", e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          {/* College */}
          <div className="form-section">
            <strong>College Details</strong>
            <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} />
            <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} />
          </div>

          {/* Coach */}
          <div className="form-section">
            <strong>Coach Details (optional)</strong>
            <input type="text" name="coachName" placeholder="Coach Name" value={form.coachName} onChange={handleChange} />
            <input type="email" name="coachEmail" placeholder="Coach Email" value={form.coachEmail} onChange={handleChange} />
            <input type="text" name="coachPhone" placeholder="Coach phoneNumber (10 digits)" value={form.coachPhone} onChange={handleChange} />
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

export default LawnTennis;
