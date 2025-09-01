import React, { useState } from "react";
import "./forms.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../utils/useEventRegistration";

const EsportsForm = ({ gameName }) => {
  const [form, setForm] = useState({
    teamName: "",
    teamLeader: {
      name: "",
      email: "",
      contactNumber: "",
      aadharId: "",
      ign: "",
      collegeId: "",
      collegeName: "",
      collegeAddress: "",
    },
    players: [
      { name: "", email: "", contactNumber: "", aadharId: "", ign: "" },
      { name: "", email: "", contactNumber: "", aadharId: "", ign: "" },
      { name: "", email: "", contactNumber: "", aadharId: "", ign: "" },
      { name: "", email: "", contactNumber: "", aadharId: "", ign: "" },
    ],
    queries: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { registerEvent, submitting } = useEventRegistration({
    endpoint: `/events/${gameName.toLowerCase()}`,
    redirectUrl: "/event/ins",
    payment: true,
  });

  // ✅ Validation rules
  const validate = () => {
    const newErrors = {};
    const isValidAadhar = (aadhar) => /^\d{12}$/.test(aadhar);
    const isValidPhone = (phone) => /^\d{10}$/.test(phone);

    if (!form.teamName) newErrors.teamName = "Team name is required";

    // Leader checks
    if (!isValidAadhar(form.teamLeader.aadharId))
      newErrors.leaderAadhar = "Aadhar must be 12 digits";
    if (!isValidPhone(form.teamLeader.contactNumber))
      newErrors.leaderPhone = "Phone must be 10 digits";
    if (!form.teamLeader.ign) newErrors.leaderIgn = "IGN is required";

    // Players checks
    form.players.forEach((player, i) => {
      if (!player.name) newErrors[`player${i}Name`] = "Name required";
      if (!player.email) newErrors[`player${i}Email`] = "Email required";
      if (!isValidPhone(player.contactNumber))
        newErrors[`player${i}Phone`] = "Phone must be 10 digits";
      if (!isValidAadhar(player.aadharId))
        newErrors[`player${i}Aadhar`] = "Aadhar must be 12 digits";
      if (!player.ign) newErrors[`player${i}Ign`] = "IGN required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      teamLeader: { ...prev.teamLeader, [name]: value },
    }));
  };

  const handlePlayerChange = (index, field, value) => {
    const updated = [...form.players];
    updated[index][field] = value;
    setForm({ ...form, players: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const payload = {
      teamName: form.teamName.trim(),
      teamLeader: {
        name: form.teamLeader.name.trim(),
        email: form.teamLeader.email.trim(),
        contactNumber: form.teamLeader.contactNumber.trim(),
        aadharId: form.teamLeader.aadharId.trim(),
        ign: form.teamLeader.ign.trim(),
        collegeId: form.teamLeader.collegeId?.trim() || undefined,
        collegeName: form.teamLeader.collegeName?.trim() || undefined,
        collegeAddress: form.teamLeader.collegeAddress?.trim() || undefined,
      },
      players: form.players.map((p) => ({
        name: p.name.trim(),
        email: p.email.trim(),
        contactNumber: p.contactNumber.trim(),
        aadharId: p.aadharId.trim(),
        ign: p.ign.trim(),
      })),
      queries: form.queries?.trim() || undefined,
    };
  
    registerEvent(payload, navigate);
  };
  

  // Restrict input to digits only
  const digitOnly = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <Navbar />
      <section className="event-forms">
        <div className="form-heading">
          <h2>Register for {gameName}</h2>
        </div>

        <div className="rules">
          {gameName} tournament rules apply. IGN is mandatory.
          <br />
          <br />
          <strong>Team Size:</strong> 1 Leader + 4 Players
          <br />
          <br />
          For queries: 8688356651 / 9905000603
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Team Info */}
          <h3>Team Info</h3>
          <input
            type="text"
            placeholder="Team Name"
            value={form.teamName}
            onChange={(e) => setForm({ ...form, teamName: e.target.value })}
            required
          />
          {errors.teamName && <p className="error">{errors.teamName}</p>}

          {/* Leader Info */}
          <h3>Leader (Captain)</h3>
          <input name="name" placeholder="Leader Name" value={form.teamLeader.name} onChange={handleLeaderChange} required />
          <input name="email" type="email" placeholder="Leader Email" value={form.teamLeader.email} onChange={handleLeaderChange} required />

          <input
            name="contactNumber"
            type="text"
            placeholder="Leader Contact Number"
            value={form.teamLeader.contactNumber}
            onChange={handleLeaderChange}
            maxLength="10"
            onKeyPress={digitOnly}
            required
          />
          {errors.leaderPhone && <p className="error">{errors.leaderPhone}</p>}

          <input
            name="aadharId"
            type="text"
            placeholder="Leader Aadhar ID"
            value={form.teamLeader.aadharId}
            onChange={handleLeaderChange}
            maxLength="12"
            onKeyPress={digitOnly}
            required
          />
          {errors.leaderAadhar && <p className="error">{errors.leaderAadhar}</p>}

          <input name="ign" placeholder="Leader IGN" value={form.teamLeader.ign} onChange={handleLeaderChange} required />
          {errors.leaderIgn && <p className="error">{errors.leaderIgn}</p>}

          <input name="collegeId" placeholder="College ID" value={form.teamLeader.collegeId} onChange={handleLeaderChange}  />
          <input name="collegeName" placeholder="College Name" value={form.teamLeader.collegeName} onChange={handleLeaderChange}  />
          <input name="collegeAddress" placeholder="College Address" value={form.teamLeader.collegeAddress} onChange={handleLeaderChange}  />

          {/* Other Players */}
          <h3>Other 4 Players</h3>
          {form.players.map((player, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <h4>Player {index + 1}</h4>
              <input placeholder="Name" value={player.name} onChange={(e) => handlePlayerChange(index, "name", e.target.value)} required />
              {errors[`player${index}Name`] && <p className="error">{errors[`player${index}Name`]}</p>}

              <input type="email" placeholder="Email" value={player.email} onChange={(e) => handlePlayerChange(index, "email", e.target.value)} required />
              {errors[`player${index}Email`] && <p className="error">{errors[`player${index}Email`]}</p>}

              <input
                type="text"
                placeholder="Contact Number"
                value={player.contactNumber}
                onChange={(e) => handlePlayerChange(index, "contactNumber", e.target.value)}
                maxLength="10"
                onKeyPress={digitOnly}
                required
              />
              {errors[`player${index}Phone`] && <p className="error">{errors[`player${index}Phone`]}</p>}

              <input
                type="text"
                placeholder="Aadhar ID"
                value={player.aadharId}
                onChange={(e) => handlePlayerChange(index, "aadharId", e.target.value)}
                maxLength="12"
                onKeyPress={digitOnly}
                required
              />
              {errors[`player${index}Aadhar`] && <p className="error">{errors[`player${index}Aadhar`]}</p>}

              <input placeholder="IGN" value={player.ign} onChange={(e) => handlePlayerChange(index, "ign", e.target.value)} required />
              {errors[`player${index}Ign`] && <p className="error">{errors[`player${index}Ign`]}</p>}
            </div>
          ))}

          {/* Queries */}
          <textarea placeholder="Queries (optional)" value={form.queries} onChange={(e) => setForm({ ...form, queries: e.target.value })} rows="3" />

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : `Register & Pay for ${gameName}`}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default EsportsForm;
