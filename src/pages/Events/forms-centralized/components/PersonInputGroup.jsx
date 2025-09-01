import React from "react";

const PersonInputGroup = ({ title, personData, onChange, isRequired }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "phoneNumber" || name === "aadharId") && value !== "" && !/^\d*$/.test(value)) {
      return;
    }

    onChange(name, value);
  };

  return (
    <div className="player-form">
      {title && <h4>{title}</h4>}

      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={personData.fullname}
        onChange={handleChange}
        required={isRequired}
        maxLength="20"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={personData.email}
        onChange={handleChange}
        required={isRequired}
        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        title="Please enter a valid email address"
      />

      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number (10 digits)"
        value={personData.phoneNumber}
        onChange={handleChange}
        required={isRequired}
        maxLength="10"
        pattern="^\d{10}$"
        title="Phone number must be exactly 10 digits"
      />

      <input
        type="text"
        name="aadharId"
        placeholder="Aadhaar ID (12 digits)"
        value={personData.aadharId}
        onChange={handleChange}
        required={isRequired}
        maxLength="12"
        pattern="^\d{12}$"
        title="Aadhaar ID must be exactly 12 digits"
      />

      {personData.hasOwnProperty("collegeId") && (
        <input
          type="text"
          name="collegeId"
          placeholder="College ID (optional)"
          value={personData.collegeId}
          onChange={handleChange}
        />
      )}

      {personData.hasOwnProperty("role") && (
        <select name="role" value={personData.role} onChange={handleChange}>
          <option value="batsman">Batsman</option>
          <option value="bowler">Bowler</option>
          <option value="all_rounder">All Rounder</option>
          <option value="wicket_keeper">Wicket Keeper</option>
        </select>
      )}
    </div>
  );
};

export default PersonInputGroup;
