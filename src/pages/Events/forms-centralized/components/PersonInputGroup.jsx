import React, { useState } from "react";
import "./EventForm.css";

const FieldError = ({ show, children }) =>
  show ? <div className="error-text">{children}</div> : null;

const PersonInputGroup = ({
  title,
  personData,
  onChange,
  isRequired = false,
  constraints = {},
}) => {
  const {
    nameMax = 30,
    validateName = () => true,
    validateEmail = () => true,
    validatePhone = () => true,
    validateAadhaar = () => true,
  } = constraints;

  const { fullname = "", email = "", phoneNumber = "", aadharId = "" } =
    personData || {};

  // Track touched fields
  const [touched, setTouched] = useState({
    fullname: false,
    email: false,
    phoneNumber: false,
    aadharId: false,
  });

  const markTouched = (field) =>
    setTouched((t) => ({ ...t, [field]: true }));

  // Run validation only if touched
  const nameInvalid = isRequired && touched.fullname && !validateName(fullname);
  const emailInvalid = isRequired && touched.email && !validateEmail(email);
  const phoneInvalid = isRequired && touched.phoneNumber && !validatePhone(phoneNumber);
  const aadhaarInvalid = isRequired && touched.aadharId && !validateAadhaar(aadharId);

  return (
    <div className="person-card">
      <h4 className="person-title">{title}</h4>

      <div className="row-2">
        {/* Full Name */}
        <div className="field">
          <label>
            Full Name{isRequired && <span className="req">*</span>}
            <input
              className={`input ${nameInvalid ? "invalid" : ""}`}
              type="text"
              value={fullname}
              maxLength={nameMax}
              placeholder="e.g. Virat Kohli"
              onChange={(e) => onChange("fullname", e.target.value)}
              onBlur={() => markTouched("fullname")}
              autoComplete="name"
            />
          </label>
          <FieldError show={nameInvalid}>
            Name must be ≤ {nameMax} chars; letters/spaces/.'- only.
          </FieldError>
        </div>

        {/* Email */}
        <div className="field">
          <label>
            Email{isRequired && <span className="req">*</span>}
            <input
              className={`input ${emailInvalid ? "invalid" : ""}`}
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => onChange("email", e.target.value.trim())}
              onBlur={() => markTouched("email")}
              autoComplete="email"
              inputMode="email"
            />
          </label>
          <FieldError show={emailInvalid}>
            Enter a valid email address.
          </FieldError>
        </div>
      </div>

      <div className="row-2">
        {/* Phone */}
        <div className="field">
          <label>
            Phone Number{isRequired && <span className="req">*</span>}
            <input
              className={`input ${phoneInvalid ? "invalid" : ""}`}
              type="tel"
              value={phoneNumber}
              placeholder="10-digit mobile number"
              onChange={(e) =>
                onChange("phoneNumber", e.target.value.replace(/\D/g, ""))
              }
              onBlur={() => markTouched("phoneNumber")}
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
            />
          </label>
          <FieldError show={phoneInvalid}>
            Enter a valid 10-digit mobile number.
          </FieldError>
        </div>

        {/* Aadhaar */}
        <div className="field">
          <label>
            Aadhaar Number{isRequired && <span className="req">*</span>}
            <input
              className={`input ${aadhaarInvalid ? "invalid" : ""}`}
              type="text"
              value={aadharId}
              placeholder="12-digit Aadhaar"
              onChange={(e) =>
                onChange("aadharId", e.target.value.replace(/\D/g, ""))
              }
              onBlur={() => markTouched("aadharId")}
              inputMode="numeric"
              pattern="\d{12}"
              maxLength={12}
            />
          </label>
          <FieldError show={aadhaarInvalid}>
            Enter a valid 12-digit Aadhaar number.
          </FieldError>
        </div>
      </div>
    </div>
  );
};

export default PersonInputGroup;
