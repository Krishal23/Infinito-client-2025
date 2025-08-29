import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Athletics = () => {
  const individualOptions = [
    "100m race",
    "200m race",
    "400m race",
    "800m race",
    "Shot put",
  ];

  const relayOptions = ["4x100m", "4x200m", "4x50m"];

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    gender: "male",
    collegeName: "",
    collegeAddress: "",
    coach: "no",
    coachName: "",
    coachPhone: "",
    queries: "",
  });

  const [individualEvents, setIndividualEvents] = useState([]);
  const [relayEvents, setRelayEvents] = useState([]);
  const [relayPlayers, setRelayPlayers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

  const handleRelayPlayersChange = (relay, index, name) => {
    setRelayPlayers((prev) => {
      const updated = { ...prev };
      if (!updated[relay]) updated[relay] = ["", "", ""];
      updated[relay][index] = name;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (individualEvents.length === 0 && relayEvents.length === 0) {
      toast.error("Please select at least one event");
      return;
    }

    // Validate relay players if relay events are selected
    for (const relay of relayEvents) {
      const players = relayPlayers[relay] || [];
      if (players.some(player => !player.trim())) {
        toast.error(`Please fill in all player names for ${relay}`);
        return;
      }
    }

    try {
      setSubmitting(true);
      const payload = {
        fullname: form.name.trim(),
        email: form.email,
        phoneNumber: form.whatsapp,
        gender: form.gender,
        collegeName: form.collegeName,
        collegeAddress: form.collegeAddress,
        coachDetails: form.coach === 'yes' ? {
          name: form.coachName,
          phone: form.coachPhone
        } : undefined,
        individualEvents,
        relayEvents,
        relayTeams: relayPlayers,
        queries: form.queries || undefined
      };

      const res = await axiosInstance.post('/events/athletics/register', payload);
      toast.success(res.data?.message || 'Registered successfully!');
      setTimeout(() => navigate('/event/ins'), 800);

      // Reset form
      setForm({
        name: "",
        email: "",
        whatsapp: "",
        gender: "male",
        collegeName: "",
        collegeAddress: "",
        coach: "no",
        coachName: "",
        coachPhone: "",
        queries: "",
      });
      setIndividualEvents([]);
      setRelayEvents([]);
      setRelayPlayers({});
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
          <h2>Register for ATHLETICS</h2>
        </div>

        <div className="rules">
          🏃‍♂️🏅 Get Ready to Run, Jump, and Throw Your Way to Glory! 🏅🏃‍♀️
          <br />
          Welcome to Infinito 2024, the biggest and most exhilarating sports fest of
          IIT Patna! If you've got speed in your legs, strength in your arms, or the
          heart of a champion, this is your time to shine! 💥
          <br />
          <br />
          Whether you're a lightning-fast sprinter, a long-distance warrior, or a
          master of field events, we've got just the event for you to prove you're
          the best on campus. Ready to make some unforgettable memories? Let's bring
          the energy and excitement to the track and field!
          <br />
          <br />
          <strong>Participation Fees</strong> - Rs 500/- per head (3 individual
          events + 2 relay events)
          <br />
          <br />
          <strong>Rulebook</strong> -{" "}
          <a
            href="infinito.iitp.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Infinito 2024 Athletics rulebook
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
          <div className="form-section">
            <strong>Personal Information</strong>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
            <div className="radio">
              Gender:
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={handleChange}
                  required
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleChange}
                /> Female
              </label>
            </div>
          </div>

          <div className="form-section">
            <strong>College Details</strong>
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={form.collegeName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="collegeAddress"
              placeholder="College Address"
              value={form.collegeAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <strong>Select Individual Events (Max 3):</strong>
            {individualOptions.map((event, idx) => (
              <label key={idx}>
                <span>{event}</span>
                <input
                  type="checkbox"
                  value={event}
                  checked={individualEvents.includes(event)}
                  onChange={handleIndividualChange}
                />
              </label>
            ))}
          </div>

          <div className="checkbox-group">
            <strong>Select Relay Events (Max 2):</strong>
            {relayOptions.map((event, idx) => (
              <div key={idx}>
                <label>
                  <span>{event}</span>
                  <input
                    type="checkbox"
                    value={event}
                    checked={relayEvents.includes(event)}
                    onChange={handleRelayChange}
                  />
                </label>

                {relayEvents.includes(event) && (
                  <div className="relay-inputs">
                    <p>Enter names of other 3 players for {event}:</p>
                    {[0, 1, 2].map((i) => (
                      <input
                        key={i}
                        type="text"
                        placeholder={`Player ${i + 2} Name`}
                        value={relayPlayers[event]?.[i] || ""}
                        onChange={(e) =>
                          handleRelayPlayersChange(event, i, e.target.value)
                        }
                        required
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="form-section">
            <strong>Coach Information</strong>
            <div className="radio">
              Will the coach be accompanying the player?
              <label>
                <input
                  type="radio"
                  name="coach"
                  value="yes"
                  checked={form.coach === 'yes'}
                  onChange={handleChange}
                  required
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="coach"
                  value="no"
                  checked={form.coach === 'no'}
                  onChange={handleChange}
                /> No
              </label>
            </div>

            {form.coach === 'yes' && (
              <>
                <input
                  type="text"
                  name="coachName"
                  placeholder="Name of the coach"
                  value={form.coachName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="coachPhone"
                  placeholder="Mobile number of coach"
                  value={form.coachPhone}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <input
              type="text"
              name="queries"
              placeholder="Any queries (optional)"
              value={form.queries}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={submitting || (individualEvents.length === 0 && relayEvents.length === 0)}
          >
            {submitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Athletics;
