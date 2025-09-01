import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../utils/useEventRegistration";

const Athletics = () => {
  const individualOptions = ["100m race", "200m race", "400m race", "800m race", "Shot put"];
  const relayOptions = ["4x100m", "4x200m", "4x50m"];

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    aadhaar: "",
    gender: "male",
    collegeName: "",
    collegeAddress: "",
    coach: "no",
    coachName: "",
    coachPhone: "",
    coachAadhaar: "",
    queries: "",
  });

  const [individualEvents, setIndividualEvents] = useState([]);
  const [relayEvents, setRelayEvents] = useState([]);
  const [relayPlayers, setRelayPlayers] = useState({});
  const navigate = useNavigate();

  const { registerEvent, submitting } = useEventRegistration({
    endpoint: "/events/athletics",
    redirectUrl: "/event/ins",
    payment: true,
  });

  // validation helpers
  const isValidAadhaar = (val) => /^\d{12}$/.test(val.trim());
  const isValidPhone = (val) => /^\d{10}$/.test(val.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;

    // prevent non-digits for phone/aadhaar fields
    if (
      ["aadhaar", "whatsapp", "coachPhone", "coachAadhaar"].includes(name) &&
      value !== "" &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleIndividualChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (individualEvents.length < 3) {
        setIndividualEvents([...individualEvents, value]);
      } else {
        toast.warning("You can select maximum 3 individual events");
      }
    } else {
      setIndividualEvents(individualEvents.filter((e) => e !== value));
    }
  };

  const handleRelayChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (relayEvents.length < 2) {
        setRelayEvents([...relayEvents, value]);
      } else {
        toast.warning("You can select maximum 2 relay events");
      }
    } else {
      setRelayEvents(relayEvents.filter((e) => e !== value));
      setRelayPlayers((prev) => {
        const newPlayers = { ...prev };
        delete newPlayers[value];
        return newPlayers;
      });
    }
  };

  const handleRelayPlayersChange = (relay, index, field, value) => {
    if (field === "aadhaar" && value !== "" && !/^\d*$/.test(value)) return;

    setRelayPlayers((prev) => {
      const updated = { ...prev };
      if (!updated[relay]) updated[relay] = Array(3).fill({ name: "", aadhaar: "" });
      updated[relay][index] = { ...updated[relay][index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (individualEvents.length === 0 && relayEvents.length === 0) {
      toast.error("Please select at least one event");
      return;
    }

    if (!isValidAadhaar(form.aadhaar)) {
      toast.error("Please enter a valid 12-digit Aadhaar ID for main participant");
      return;
    }

    if (!isValidPhone(form.whatsapp)) {
      toast.error("Please enter a valid 10-digit WhatsApp number");
      return;
    }

    for (const relay of relayEvents) {
      const players = relayPlayers[relay] || [];
      if (
        players.some(
          (player) =>
            !player.name.trim() || !isValidAadhaar(player.aadhaar || "")
        )
      ) {
        toast.error(`Please fill in all names and valid 12-digit Aadhaar IDs for ${relay}`);
        return;
      }
    }

    if (form.coach === "yes") {
      if (!form.coachName.trim()) {
        toast.error("Please enter coach name");
        return;
      }
      if (!isValidPhone(form.coachPhone)) {
        toast.error("Please enter a valid 10-digit coach phone number");
        return;
      }
      if (!isValidAadhaar(form.coachAadhaar)) {
        toast.error("Please enter a valid 12-digit coach Aadhaar ID");
        return;
      }
    }

    const payload = {
      leadName: form.name.trim(),
      email: form.email,
      phoneNumber: form.whatsapp,
      aadharId: form.aadhaar,
      category: form.gender === "male" ? "men" : "women",
      collegeDetails: {
        collegeName: form.collegeName,
        collegeAddress: form.collegeAddress,
        rollNo: ""
      },
      coachDetails:
        form.coach === "yes"
          ? {
              name: form.coachName,
              contact: form.coachPhone,
              aadhar: form.coachAadhaar,
            }
          : undefined,
    
      individualEvents, 
      relayEvents,
    
      relayTeams: relayEvents.map((relay) => ({
        teamName: relay,
        leaderId: null, 
        members: [
          {
            fullname: form.name.trim(),
            email: form.email,
            phoneNumber: form.whatsapp,
            aadharId: form.aadhaar,
            role: "Captain",
          },
          ...(relayPlayers[relay] || []).map((player, idx) => ({
            fullname: player.name,
            aadharId: player.aadhaar,
            role: "Player",
          }))
        ]
      })),
    
      queries: form.queries || undefined,
    };
    
    

    registerEvent(payload, navigate);
  };

  return (
    <div className="div">
      <Navbar />
      <section className="event-forms">
        <div className="form-heading">
          <h2>Register for ATHLETICS</h2>
        </div>

        <div className="rules">
          🏃‍♂️🏅 Get Ready to Run, Jump, and Throw Your Way to Glory! 🏅🏃‍♀️
          <br /><br />
          Welcome to Infinito 2024, the biggest and most exhilarating sports fest of IIT Patna! 
          <br /><br />
          <strong>Participation Fees</strong> - Rs 500/- per head (3 individual events + 2 relay events)
          <br /><br />
          <strong>Rulebook</strong> - <a href="infinito.iitp.ac.in" target="_blank" rel="noopener noreferrer">Infinito 2024 Athletics rulebook</a>
          <br /><br />
          <strong>Registration Guidelines</strong> - <a href="infinito.iitp.ac.in" target="_blank" rel="noopener noreferrer">Infinito 2k24 Guidelines</a>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="form-section">
            <strong>Personal Information</strong>
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required minLength={3}/>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input type="text" name="whatsapp" placeholder="WhatsApp Number (10 digits)" value={form.whatsapp} onChange={handleChange} required />
            <input type="text" name="aadhaar" placeholder="Aadhaar ID (12 digits)" value={form.aadhaar} onChange={handleChange} required />
            <div className="radio">
              Gender:
              <label><input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} required /> Male</label>
              <label><input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} /> Female</label>
            </div>
          </div>

          {/* College Info */}
          <div className="form-section">
            <strong>College Details</strong>
            <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange}  minLength={3}/>
            <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} minLength={5}/>
          </div>

          {/* Individual Events */}
          <div className="checkbox-group">
            <strong>Select Individual Events (Max 3):</strong>
            {individualOptions.map((event, idx) => (
              <label key={idx}>
                <span>{event}</span>
                <input type="checkbox" value={event} checked={individualEvents.includes(event)} onChange={handleIndividualChange} />
              </label>
            ))}
          </div>

          {/* Relay Events */}
          <div className="checkbox-group">
            <strong>Select Relay Events (Max 2):</strong>
            {relayOptions.map((event, idx) => (
              <div key={idx}>
                <label>
                  <span>{event}</span>
                  <input type="checkbox" value={event} checked={relayEvents.includes(event)} onChange={handleRelayChange} />
                </label>

                {relayEvents.includes(event) && (
                  <div className="relay-inputs">
                    <p>Enter names and Aadhaar of other 3 players for {event}:</p>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="relay-player-inputs">
                        <input
                          type="text"
                          placeholder={`Player ${i + 2} Name`}
                          value={relayPlayers[event]?.[i]?.name || ""}
                          onChange={(e) => handleRelayPlayersChange(event, i, "name", e.target.value)}
                          required
                          minLength={3}
                        />
                        <input
                          type="text"
                          placeholder={`Player ${i + 2} Aadhaar`}
                          value={relayPlayers[event]?.[i]?.aadhaar || ""}
                          onChange={(e) => handleRelayPlayersChange(event, i, "aadhaar", e.target.value)}
                          required
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Coach Info */}
          <div className="form-section">
            <strong>Coach Information</strong>
            <div className="radio">
              Will the coach be accompanying the player?
              <label><input type="radio" name="coach" value="yes" checked={form.coach === 'yes'} onChange={handleChange} required /> Yes</label>
              <label><input type="radio" name="coach" value="no" checked={form.coach === 'no'} onChange={handleChange} /> No</label>
            </div>

            {form.coach === 'yes' && (
              <>
                <input type="text" name="coachName" placeholder="Name of the coach" value={form.coachName} onChange={handleChange} required minLength={3}/>
                <input type="text" name="coachPhone" placeholder="Mobile number of coach (10 digits)" value={form.coachPhone} onChange={handleChange} required />
                <input type="text" name="coachAadhaar" placeholder="Coach Aadhaar ID (12 digits)" value={form.coachAadhaar} onChange={handleChange} required />
              </>
            )}

            <input type="text" name="queries" placeholder="Any queries (optional)" value={form.queries} onChange={handleChange} />
          </div>

          <button type="submit" disabled={submitting || (individualEvents.length === 0 && relayEvents.length === 0)}>
            {submitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Athletics;
