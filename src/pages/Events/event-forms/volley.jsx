import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../utils/useEventRegistration";

const Volleyball_ = () => {
  const navigate = useNavigate();
  const { registerEvent, submitting } = useEventRegistration({
    endpoint: "/events/volleyball",
    redirectUrl: "/event/ins",
    payment: true,
  });

  const initialMember = { name: "", email: "", phoneNumber: "", aadharId: "" };

  const [form, setForm] = useState({
    captain: { ...initialMember },
    viceCaptain: { ...initialMember },
    category: "Men",
    collegeName: "",
    collegeAddress: "",
    coach: { name: "", email: "", phoneNumber: "", aadharId: "" },
    players: Array(5).fill(0).map(() => ({ ...initialMember })),
    substitutes:Array(5).fill(0).map(() => ({ ...initialMember })),
  });

  // Helpers for validation
  const isValidAadhaar = (val) => /^\d{12}$/.test(val.trim());
  const isValidPhone = (val) => /^\d{10}$/.test(val.trim());

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;

    // prevent non-digit input for Aadhaar/phoneNumber
    if (["phoneNumber", "aadharId"].includes(name) && value !== "" && !/^\d*$/.test(value)) return;

    if (section === "players" || section === "substitutes") {
      const updated = [...form[section]];
      updated[index][name] = value;
      setForm((prev) => ({ ...prev, [section]: updated }));
    } else if (section) {
      setForm((prev) => ({ ...prev, [section]: { ...prev[section], [name]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mandatory fields
    const checkMembers = (members, label) => {
      for (let i = 0; i < members.length; i++) {
        const m = members[i];
        if (!m.name.trim() || !isValidPhone(m.phoneNumber) || !isValidAadhaar(m.aadharId) || !m.email.trim()) {
          toast.error(`Please fill valid details for ${label} ${i + 1}`);
          return false;
        }
      }
      return true;
    };

    if (!form.captain.name || !form.captain.email || !isValidPhone(form.captain.phoneNumber) || !isValidAadhaar(form.captain.aadharId)) {
      toast.error("Please fill valid Captain details");
      return;
    }
    if (!form.viceCaptain.name || !form.viceCaptain.email || !isValidPhone(form.viceCaptain.phoneNumber) || !isValidAadhaar(form.viceCaptain.aadharId)) {
      toast.error("Please fill valid Vice-Captain details");
      return;
    }
    if (!checkMembers(form.players, "Player") || !checkMembers(form.substitutes, "Substitute")) return;

    // Coach validation if any field is filled
    const coach = form.coach;
    const coachFilled = coach.name || coach.email || coach.phoneNumber || coach.aadharId;
    if (coachFilled && (!coach.name || !coach.email || !isValidPhone(coach.phoneNumber) || !isValidAadhaar(coach.aadharId))) {
      toast.error("Please fill valid coach details or leave all fields empty");
      return;
    }

    // Prepare payload
    const payload = {
      category: form.category,
      collegeName: form.collegeName || "",
      collegeAddress: form.collegeAddress || "",
      coach: form.coach.name || form.coach.email || form.coach.phoneNumber || form.coach.aadharId 
        ? { 
            name: form.coach.name, 
            email: form.coach.email, 
            phoneNumber: form.coach.phoneNumber 
          } 
        : undefined,
      captain: { ...form.captain, fullname: form.captain.name },   
      viceCaptain: { ...form.viceCaptain, fullname: form.viceCaptain.name },
      players: form.players.map(p => ({ ...p, fullname: p.name })),  
      substitutes: form.substitutes.map(s => ({ ...s, fullname: s.name }))
    };
    

    // Register with payment
    registerEvent(payload, navigate);
  };

  return (
    <div className="div">
      <Navbar />
      <section className="event-forms">
        <h2>Register for Volleyball</h2>
        <form className="form" onSubmit={handleSubmit}>
          <h3>Captain Details</h3>
          <input name="name" placeholder="Captain Name" value={form.captain.name} onChange={(e) => handleChange(e, "captain")} required />
          <input type="email" name="email" placeholder="Captain Email" value={form.captain.email} onChange={(e) => handleChange(e, "captain")} required />
          <input type="tel" name="phoneNumber" placeholder="Captain phoneNumber" value={form.captain.phoneNumber} onChange={(e) => handleChange(e, "captain")} required />
          <input name="aadharId" placeholder="Captain Aadhar ID" value={form.captain.aadharId} onChange={(e) => handleChange(e, "captain")} required />

          <h3>Vice-Captain Details</h3>
          <input name="name" placeholder="Vice-Captain Name" value={form.viceCaptain.name} onChange={(e) => handleChange(e, "viceCaptain")} required />
          <input type="email" name="email" placeholder="Vice-Captain Email" value={form.viceCaptain.email} onChange={(e) => handleChange(e, "viceCaptain")} required />
          <input type="tel" name="phoneNumber" placeholder="Vice-Captain phoneNumber" value={form.viceCaptain.phoneNumber} onChange={(e) => handleChange(e, "viceCaptain")} required />
          <input name="aadharId" placeholder="Vice-Captain Aadhar ID" value={form.viceCaptain.aadharId} onChange={(e) => handleChange(e, "viceCaptain")} required />

          <h3>Category</h3>
          <label>
            <input type="radio" name="category" value="Men" checked={form.category === "Men"} onChange={handleChange} /> Men
          </label>
          <label>
            <input type="radio" name="category" value="Women" checked={form.category === "Women"} onChange={handleChange} /> Women
          </label>

          <h3>College Details (Optional)</h3>
          <input name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} />
          <input name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} />

          <h3>Coach Details (Optional)</h3>
          <input name="name" placeholder="Coach Name" value={form.coach.name} onChange={(e) => handleChange(e, "coach")} />
          <input type="email" name="email" placeholder="Coach Email" value={form.coach.email} onChange={(e) => handleChange(e, "coach")} />
          <input type="tel" name="phoneNumber" placeholder="Coach phoneNumber" value={form.coach.phoneNumber} onChange={(e) => handleChange(e, "coach")} />
          <input name="aadharId" placeholder="Coach Aadhar ID" value={form.coach.aadharId} onChange={(e) => handleChange(e, "coach")} />

          <h3>Players (5)</h3>
          {form.players.map((p, i) => (
            <div key={i}>
              <h4>Player {i + 1}</h4>
              <input name="name" placeholder="Name" value={p.name} onChange={(e) => handleChange(e, "players", i)} required />
              <input type="email" name="email" placeholder="Email" value={p.email} onChange={(e) => handleChange(e, "players", i)} required />
              <input type="tel" name="phoneNumber" placeholder="phoneNumber" value={p.phoneNumber} onChange={(e) => handleChange(e, "players", i)} required />
              <input name="aadharId" placeholder="Aadhar ID" value={p.aadharId} onChange={(e) => handleChange(e, "players", i)} required />
            </div>
          ))}

          <h3>Substitutes (5)</h3>
          {form.substitutes.map((s, i) => (
            <div key={i}>
              <h4>Substitute {i + 1}</h4>
              <input name="name" placeholder="Name" value={s.name} onChange={(e) => handleChange(e, "substitutes", i)} required />
              <input type="email" name="email" placeholder="Email" value={s.email} onChange={(e) => handleChange(e, "substitutes", i)} required />
              <input type="tel" name="phoneNumber" placeholder="phoneNumber" value={s.phoneNumber} onChange={(e) => handleChange(e, "substitutes", i)} required />
              <input name="aadharId" placeholder="Aadhar ID" value={s.aadharId} onChange={(e) => handleChange(e, "substitutes", i)} required />
            </div>
          ))}

          <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Register & Pay"}</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Volleyball_;
