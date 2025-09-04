import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import CollegeSelector from "../components/CollegeSelector";
import { useEventRegistration } from "../../../../utils/useEventRegistration";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import FormSection from "../components/FormSection";

/* ---------------- Field-level validation + blur/touch ---------------- */
const EsportsPersonInput = ({ title, personData, onChange, isRequired }) => {
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "contactNumber" || name === "aadharId") && value !== "" && !/^\d*$/.test(value)) return;
    onChange(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validators = {
    name: (v) => /^[A-Za-z\s.'-]{2,30}$/.test(v),
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    contactNumber: (v) => /^\d{10}$/.test(v),
    aadharId: (v) => /^\d{12}$/.test(v),
    // ign: (v) => /^[A-Za-z0-9._-]{3,20}$/.test(v),
  };

  const getError = (field, value) => {
    if (!touched[field]) return null;
    if (!validators[field](value)) {
      switch (field) {
        case "name": return "Name must be 2–30 letters/spaces only.";
        case "email": return "Enter a valid email address.";
        case "contactNumber": return "Enter a valid 10-digit mobile number.";
        case "aadharId": return "Enter a valid 12-digit Aadhaar number.";
        // case "ign": return "IGN must be 3–20 characters (letters, numbers, ., _, -).";
        default: return "Invalid input.";
      }
    }
    return null;
  };

  return (
    <div className="player-form">
      {title && <h4>{title}</h4>}

      <div className="field">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={personData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required={isRequired}
        />
        {getError("name", personData.name) && <p className="error-text">{getError("name", personData.name)}</p>}
      </div>

      <div className="field">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required={isRequired}
        />
        {getError("email", personData.email) && <p className="error-text">{getError("email", personData.email)}</p>}
      </div>

      <div className="field">
        <input
          type="tel"
          name="contactNumber"
          placeholder="Contact (10 digits)"
          value={personData.contactNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength="10"
          required={isRequired}
        />
        {getError("contactNumber", personData.contactNumber) && (
          <p className="error-text">{getError("contactNumber", personData.contactNumber)}</p>
        )}
      </div>

      <div className="field">
        <input
          type="text"
          name="aadharId"
          placeholder="Aadhaar (12 digits)"
          value={personData.aadharId}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength="12"
          required={isRequired}
        />
        {getError("aadharId", personData.aadharId) && <p className="error-text">{getError("aadharId", personData.aadharId)}</p>}
      </div>

      <div className="field">
        <input
          type="text"
          name="ign"
          placeholder="In-Game Name (IGN)"
          value={personData.ign}
          onChange={handleChange}
          onBlur={handleBlur}
          required={isRequired}
        />
        {/* {getError("ign", personData.ign) && <p className="error-text">{getError("ign", personData.ign)}</p>} */}
      </div>
    </div>
  );
};

/* ---------------- Styles ---------------- */
const FormStyles = () => (
  <style>{`
    .event-forms { max-width: 800px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .form-heading { text-align: center; margin-bottom: 2rem; }
    .step-indicator { text-align: center; color: #4a5568; font-weight: bold; margin-bottom: 1.5rem; }
    .form-section { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; }
    .player-form { border: 1px solid #cbd5e0; border-radius: 8px; padding: 1rem; margin-top: 1rem; }
    .field { margin-bottom: 1rem; }
    input, select, textarea { width: 100%; padding: 0.8rem; border: 1px solid #cbd5e0; border-radius: 4px; box-sizing: border-box; }
    .error-text { color: red; font-size: 0.85rem; margin-top: 0.25rem; }
    button { display: inline-block; padding: 0.8rem 1.5rem; border: none; border-radius: 4px; color: white; background-color: #4f46e5; cursor: pointer; font-size: 1rem; }
    .form-navigation { display: flex; justify-content: space-between; margin-top: 2rem; }
    .secondary-btn { background-color: #718096; }
    .receipt { background-color: #f7fafc; padding: 1.5rem; border-radius: 8px; }
    @media (max-width: 400px) {
      .event-forms { padding: 1rem; }
      button { width: 100%; margin-top: 0.5rem; }
      .form-navigation { flex-direction: column; gap: 0.5rem; }
    }
  `}</style>
);

const EMPTY_ESPORTS_PLAYER = { name: "", email: "", contactNumber: "", aadharId: "", ign: "" };

/* ---------------- Full Esports Form ---------------- */
const EsportsForm = ({ config }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    teamName: "",
    collegeName: "", collegeAddress: "", collegeId: "",
    teamLeader: { ...EMPTY_ESPORTS_PLAYER },
    players: Array(config.playerCount).fill(null).map(() => ({ ...EMPTY_ESPORTS_PLAYER })),
    queries: "",
  });
  const [currentStep, setCurrentStep] = useState(0);

  const { registerEvent, submitting } = useEventRegistration({
    endpoint: `/events/${config.gameName.toLowerCase()}`,
    redirectUrl: "/event/ins",
    payment: true,
  });

  const handleTopLevelChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleLeaderChange = (field, value) => setForm(prev => ({ ...prev, teamLeader: { ...prev.teamLeader, [field]: value } }));
  const handlePlayerChange = (index, field, value) => {
    setForm(prev => {
      const updated = [...prev.players];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, players: updated };
    });
  };

  const validateCurrentStep = () => {
    const stepConfig = config.steps[currentStep];
    const isValidPhone = num => /^\d{10}$/.test(num);
    const isValidAadhaar = num => /^\d{12}$/.test(num);

    const validatePerson = (p, label) => {
      if (!p.name.trim() || !p.email.trim() || !isValidPhone(p.contactNumber) || !isValidAadhaar(p.aadharId) || !p.ign.trim()) {
        toast.error(`Please fill valid details for ${label}.`);
        return false;
      }
      return true;
    };

    switch (stepConfig.type) {
      case "team_info":
        if (config.playerCount > 0 && !form.teamName.trim()) {
          toast.error("Team Name is required.");
          return false;
        }
        break;
      case "leader_info":
        if (!validatePerson(form.teamLeader, config.playerCount > 0 ? "Team Leader" : "Player")) return false;
        break;
      case "player_info":
        for (let i = 0; i < config.playerCount; i++) {
          if (!validatePerson(form.players[i], `Player #${i + 1}`)) return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => { if (validateCurrentStep()) setCurrentStep(s => s + 1); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep(s => s - 1); };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const payload = config.buildPayload(form);
    registerEvent(payload, navigate);
  };

  const currentStepConfig = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;

  const renderStepContent = () => {
    switch (currentStepConfig.type) {
      case "college_info":
        return <CollegeSelector form={form} setForm={setForm} handleTopLevelChange={handleTopLevelChange} />;
      case "team_info":
        return <FormSection title="Team Information"><input type="text" name="teamName" placeholder="Team Name" value={form.teamName} onChange={handleTopLevelChange} required /></FormSection>;
      case "leader_info":
        return <FormSection title={config.playerCount > 0 ? "Team Leader Details" : "Player Details"}>
          <EsportsPersonInput personData={form.teamLeader} onChange={handleLeaderChange} isRequired={true} />
        </FormSection>;
      case "player_info":
        return <FormSection title={`Player Roster (${config.playerCount} players)`}>
          {form.players.map((p, i) => (
            <EsportsPersonInput key={i} title={`Player ${i + 1}`} personData={p} onChange={(f, v) => handlePlayerChange(i, f, v)} isRequired={true} />
          ))}
        </FormSection>;
      case "receipt":
        const title = config.playerCount > 0 ? `Team: ${form.teamName}` : `Player: ${form.teamLeader.name}`;
        return <FormSection title="Registration Summary">
          <div className="receipt">
            <p><strong>{title}</strong></p>
            <p><strong>Game:</strong> {config.gameName}</p>
            <hr />
            <h3>Payment Details</h3>
            <p><strong>Fee:</strong> {config.paymentDetails.fee}</p>
          </div>
        </FormSection>;
      default: return null;
    }
  };

  return (
    <>
      <FormStyles />
      <div>
        <Navbar />
        <section className="event-forms">
          <div className="form-heading"><h2>{config.title}</h2></div>
          <p className="step-indicator">Step {currentStep + 1} of {config.steps.length}: {currentStepConfig.title}</p>
          <form onSubmit={handleFinalSubmit}>
            {renderStepContent()}

            <div className="form-navigation">
              {currentStep > 0 && <button type="button" onClick={prevStep} className="secondary-btn">Back</button>}
              
              {isLastStep ? (
                      <button type="button" disabled={submitting} onClick={handleFinalSubmit}>{submitting ? "Processing..." : "Pay Now"}</button>
              ) : (
                  <button type="button" onClick={nextStep}>Next</button>
              )}
            </div>
          </form>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default EsportsForm;
