import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Athletics = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userId: "",
    whatsapp: "",
    gender: "male",
    collegeName: "",
    collegeAddress: "",
    coach: "no",
    coachName: "",
    coachPhone: "",
    category: "men",
    events: [],
    experience: "beginner",
    personalBest: "",
    tShirtSize: "M"
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEventChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm(prev => ({ ...prev, events: [...prev.events, value] }));
    } else {
      setForm(prev => ({ ...prev, events: prev.events.filter(event => event !== value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.events.length === 0) {
      toast.error("Please select at least one event");
      return;
    }
    
    try {
      setSubmitting(true);
      const payload = {
        fullname: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phoneNumber: form.whatsapp,
        collegeName: form.collegeName,
        category: form.category,
        events: form.events,
        experience: form.experience,
        personalBest: form.personalBest,
        coachName: form.coachName || undefined,
        tShirtSize: form.tShirtSize
      };
      const res = await axiosInstance.post('/events/athletics/register', payload);
      toast.success(res.data?.message || 'Registered successfully!');
      setTimeout(() => navigate('/event/ins'), 800);
      setForm({ firstName: "", lastName: "", email: "", userId: "", whatsapp: "", gender: "male", collegeName: "", collegeAddress: "", coach: "no", coachName: "", coachPhone: "", category: "men", events: [], experience: "beginner", personalBest: "", tShirtSize: "M" });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const athleticsEvents = [
    { category: "Track Events", events: ["100m", "200m", "400m", "800m", "1500m", "3000m", "5000m", "10000m", "110m_hurdles", "400m_hurdles", "3000m_steeplechase"] },
    { category: "Field Events", events: ["high_jump", "pole_vault", "long_jump", "triple_jump", "shot_put", "discus_throw", "hammer_throw", "javelin_throw"] },
    { category: "Combined Events", events: ["decathlon", "heptathlon"] },
    { category: "Relay Events", events: ["4x100m_relay", "4x400m_relay"] }
  ];

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
          <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="tel" name="whatsapp" placeholder="WhatsApp Number" value={form.whatsapp} onChange={handleChange} required />
          <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
          <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />
          
          <div className="radio">
            Category:
            <label>
              <input type="radio" name="category" value="men" checked={form.category === 'men'} onChange={handleChange} /> Men
            </label>
            <label>
              <input type="radio" name="category" value="women" checked={form.category === 'women'} onChange={handleChange} /> Women
            </label>
          </div>

          <select name="experience" value={form.experience} onChange={handleChange} required>
            <option value="">Select Experience Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>

          <select name="tShirtSize" value={form.tShirtSize} onChange={handleChange} required>
            <option value="">Select T-Shirt Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>

          <input type="text" name="personalBest" placeholder="Personal Best (Optional)" value={form.personalBest} onChange={handleChange} />
          
          <div className="radio">
            Do you have a coach?
            <label>
              <input type="radio" name="coach" value="yes" checked={form.coach === 'yes'} onChange={handleChange} /> Yes
            </label>
            <label>
              <input type="radio" name="coach" value="no" checked={form.coach === 'no'} onChange={handleChange} /> No
            </label>
          </div>

          {form.coach === 'yes' && (
            <>
              <input type="text" name="coachName" placeholder="Coach Name" value={form.coachName} onChange={handleChange} />
              <input type="tel" name="coachPhone" placeholder="Coach Phone Number" value={form.coachPhone} onChange={handleChange} />
            </>
          )}

          <div className="events-section">
            <h4>Select Events (Choose at least one):</h4>
            {athleticsEvents.map((category, idx) => (
              <div key={idx} className="event-category">
                <h5>{category.category}</h5>
                <div className="event-checkboxes">
                  {category.events.map(event => (
                    <label key={event} className="event-checkbox">
                      <input
                        type="checkbox"
                        value={event}
                        checked={form.events.includes(event)}
                        onChange={handleEventChange}
                      />
                      {event.replace(/_/g, ' ').toUpperCase()}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Athletics;
