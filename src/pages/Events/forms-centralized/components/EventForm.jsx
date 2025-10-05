import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../../utils/useEventRegistration";
import FormSection from "./FormSection";
import PersonInputGroup from "./PersonInputGroup";
import CollegeSelector from "./CollegeSelector";
import "./EventForm.css";
import Loader from "../../../../components/Loader";
import TypewriterSafetyNotice from "./SafetyMsg";


const safetyMessages = [
  { header: "Player Safety Notice", msg: "Say No to Drugs. Live Clean, Play Strong!" },
  { header: "Health & Safety Reminder", msg: "Stay Drug-Free. Play Hard, Live Free!" },
  { header: "Champion’s Code", msg: "Keep your game clean, on and off the field!" },
  { header: "Fair Play Notice", msg: "Run Away from Drugs, Run Towards Life!" },
  { header: "Winning Mindset", msg: "Drug-Free Today, Champions Tomorrow!" },
  { header: "Athlete Safety Alert", msg: "Choose Life, Not Drugs. Stay Strong, Stay Free!" },
  { header: "Mind & Body Alert", msg: "A Clear Mind Wins. Stay Away from Drugs!" },
  { header: "Strength Safely", msg: "Build Strength Naturally. Say No to Drugs!" },
  { header: "Lift Right", msg: "Drug-Free Athletes, Safer Performance!" },
  { header: "Sprint to Safety", msg: "Run Fast, Live Free. Stay Drug-Free!" },
];


// const getRandomSafetyMessage = () => {
//   return safetyMessages[Math.floor(Math.random() * safetyMessages.length)];
// };


/** ---------- Validators ---------- */
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email || "").trim());

const isValidPhone = (num) => /^\d{10}$/.test(String(num || "").trim());
const isValidAadhaar = (num) => /^\d{12}$/.test(String(num || "").trim());

const isValidName = (name) => {
  const n = String(name || "").trim();
  if (!n) return false;
  if (n.length > 30) return false;
  // Allow letters, space, dot, hyphen, apostrophe
  return /^[A-Za-z\s.'-]+$/.test(n);
};

const createInitialState = (config) => {
  const state = {
    collegeName: "",
    collegeAddress: "",
    coach: { fullname: "", email: "", phoneNumber: "", aadharId: "" },
    team: {},
    category: "Men",
    accompanyingCoach: "No",
  };
  config.steps.forEach((step) => {
    if (step.type === "team") {
      step.fields.forEach((field) => {
        state.team[field.name] = Array(field.min)
          .fill(null)
          .map(() => ({ ...field.initialData }));
      });
    }
  });
  return state;
};

const EventForm = ({ config }) => {
  // console.log(config)
  const navigate = useNavigate();
  const [form, setForm] = useState(createInitialState(config));
  const [currentStep, setCurrentStep] = useState(0);
  const [touched, setTouched] = useState({});
  // const safetyNotice = getRandomSafetyMessage();


  const { registerEvent, submitting } = useEventRegistration({
    endpoint: config.endpoint,
    redirectUrl: "/event/success",
    payment: true,
  });

  /** ---------- State updaters ---------- */
  const markTouched = (path) =>
    setTouched((t) => ({ ...t, [path]: true }));

  const handleTopLevelChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      // store the actual File object
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    markTouched(name);
  };


  const handleCoachChange = (field, value) => {
    setForm((prev) => ({ ...prev, coach: { ...prev.coach, [field]: value } }));
    markTouched(`coach.${field}`);
  };

  const handleMemberChange = (section, index, field, value) => {
    setForm((prev) => {
      const next = [...prev.team[section]];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, team: { ...prev.team, [section]: next } };
    });
    markTouched(`team.${section}.${index}.${field}`);
  };

  const addTeamMember = (fieldName, initialData) => {
    setForm((prev) => ({
      ...prev,
      team: {
        ...prev.team,
        [fieldName]: [...prev.team[fieldName], { ...initialData }],
      },
    }));
  };

  const removeTeamMember = (fieldName, index, min) => {
    setForm((prev) => {
      if (index < min) return prev; // don't remove required players
      const updated = [...prev.team[fieldName]];
      updated.splice(index, 1);
      return { ...prev, team: { ...prev.team, [fieldName]: updated } };
    });
  };


  const hasDuplicateAadhaar = () => {
    const aadhaars = [];

    // Collect all team Aadhaar IDs
    for (const section of Object.values(form.team)) {
      section.forEach((p) => {
        if (p.aadharId) aadhaars.push(p.aadharId.trim());
      });
    }

    // Add coach Aadhaar if present
    if (form.accompanyingCoach === "Yes" && form.coach.aadharId) {
      aadhaars.push(form.coach.aadharId.trim());
    }

    // Check duplicates
    const unique = new Set(aadhaars);
    return unique.size !== aadhaars.length;
  };


  /** ---------- Per-step validation ---------- */
  const validateCurrentStep = () => {
    const step = config.steps[currentStep];

    if (step.type === "college") {
      if (!form.collegeName.trim() || !form.collegeAddress.trim()) {
        alert("Please fill in your College Name and Address.");
        return false;
      }
    }

    if (step.type === "team") {
      for (const field of step.fields) {
        for (let i = 0; i < field.min; i++) {
          const p = form.team[field.name][i];
          if (!isValidName(p.fullname)) {
            alert(
              `Enter a valid name (≤ 30 chars) for ${field.title} #${i + 1}`
            );
            return false;
          }
          if (!isValidEmail(p.email)) {
            alert(`Enter a valid email for ${field.title} #${i + 1}`);
            return false;
          }
          if (!isValidPhone(p.phoneNumber)) {
            alert(
              `Enter a valid 10-digit phone number for ${field.title} #${i + 1}`
            );
            return false;
          }
          if (!isValidAadhaar(p.aadharId)) {
            alert(
              `Enter a valid 12-digit Aadhaar for ${field.title} #${i + 1}`
            );
            return false;
          }
          if (hasDuplicateAadhaar()) {
            alert("Each individual must have a unique Aadhaar ID.");
            return false;
          }

        }
      }
    }

    if (step.type === "coach" && form.accompanyingCoach === "Yes") {
      const { fullname, email, phoneNumber, aadharId } = form.coach;
      if (!isValidName(fullname)) {
        alert("Coach: enter a valid name (≤ 30 chars).");
        return false;
      }
      if (!isValidEmail(email)) {
        alert("Coach: enter a valid email.");
        return false;
      }
      if (!isValidPhone(phoneNumber)) {
        alert("Coach: enter a valid 10-digit phone number.");
        return false;
      }
      if (!isValidAadhaar(aadharId)) {
        alert("Coach: enter a valid 12-digit Aadhaar.");
        return false;
      }
      if (hasDuplicateAadhaar()) {
        alert("Each individual must have a unique Aadhaar ID.");
        return false;
      }

    }

    return true;
  };

  const validateAllBeforeSubmit = () => {
    // Re-run validation for all steps to be safe
    for (const step of config.steps) {
      // if (step.type === "college") {
      //   if (!form.collegeName.trim() || !form.collegeAddress.trim()) return false;
      //   if (!isValidName(form.collegeName)) return false;
      // }
      if (step.type === "team") {
        for (const field of step.fields) {
          for (let i = 0; i < field.min; i++) {
            const p = form.team[field.name][i];
            if (!isValidName(p.fullname)) return false;
            if (!isValidEmail(p.email)) return false;
            if (!isValidPhone(p.phoneNumber)) return false;
            if (!isValidAadhaar(p.aadharId)) return false;
          }
        }
      }
      if (step.type === "coach" && form.accompanyingCoach === "Yes") {
        const { fullname, email, phoneNumber, aadharId } = form.coach;
        if (
          !isValidName(fullname) ||
          !isValidEmail(email) ||
          !isValidPhone(phoneNumber) ||
          !isValidAadhaar(aadharId)
        )
          return false;
      }
    }
    return true;
  };



  /** ---------- Navigation / Submit ---------- */
  const nextStep = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      if (currentStep < config.steps.length - 1)
        setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllBeforeSubmit()) {
      alert("Please fix the highlighted fields before submission.");
      return;
    }

    const payload = config.buildPayload(form);

    const formData = new FormData();
    formData.append("registrationData", JSON.stringify(payload));

    if (form.paymentProof) {
      formData.append("paymentProof", form.paymentProof); // send raw File object
      registerEvent(formData, navigate);
    } else {
      toast.error("Payment proof is required");
    }
  };



  /** ---------- Helpers ---------- */
  const currentStepConfig = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;

  const totalPlayers = Object.values(form.team).reduce(
    (acc, members) => acc + members.filter((p) => (p.fullname || "").trim()).length,
    0
  );

  /** ---------- UI ---------- */
  const renderStepContent = () => {
    switch (currentStepConfig.type) {
      case "college":
        return (
          <>
            {currentStepConfig.hasCategory && (
              <FormSection title="Category">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleTopLevelChange}
                  onBlur={handleTopLevelChange}
                  className="input"
                  aria-label="Category"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </FormSection>
            )}

            <CollegeSelector
              form={form}
              setForm={setForm}
              handleTopLevelChange={handleTopLevelChange}
              maxNameLength={30}
            />
          </>
        );

      case "team":
        return currentStepConfig.fields.map((field) => (
          <FormSection title={`${field.title}s`} key={field.name}>
            <div className="grid">
              {form.team[field.name].map((person, index) => (
                <div key={index} className="person-wrapper flex">
                  <PersonInputGroup
                    title={`${field.title} ${index + 1} ${index < field.min ? "(Required)" : "(Optional)"
                      }`}
                    personData={person}
                    onChange={(f, v) => handleMemberChange(field.name, index, f, v)}
                    isRequired={index < field.min}
                    removeTeamMember={() => removeTeamMember(field.name, index, field.min)}
                    index={index}
                    fieldName={field.name}
                    constraints={{
                      nameMax: 30,
                      validateName: isValidName,
                      validateEmail: isValidEmail,
                      validatePhone: isValidPhone,
                      validateAadhaar: isValidAadhaar,
                    }}
                    showInlineErrors={true}
                  />


                </div>
              ))}
            </div>

            {form.team[field.name].length < field.max && (
              <button
                type="button"
                onClick={() => addTeamMember(field.name, field.initialData)}
                className="btn btn-success"
              >
                + Add Optional {field.title}
              </button>
            )}
          </FormSection>
        ));

      case "coach":
        return (
          <FormSection title="Coach Details">
            <p className="label">Will a coach be accompanying the team?</p>
            <div className="radio-group">
              <label className="radio">
                <input
                  type="radio"
                  name="accompanyingCoach"
                  value="Yes"
                  checked={form.accompanyingCoach === "Yes"}
                  onChange={handleTopLevelChange}
                />
                <span>Yes</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="accompanyingCoach"
                  value="No"
                  checked={form.accompanyingCoach === "No"}
                  onChange={handleTopLevelChange}
                />
                <span>No</span>
              </label>
            </div>

            {form.accompanyingCoach === "Yes" && (
              <PersonInputGroup
                title="Coach Information"
                personData={form.coach}
                onChange={handleCoachChange}
                isRequired={true}
                constraints={{
                  nameMax: 30,
                  validateName: isValidName,
                  validateEmail: isValidEmail,
                  validatePhone: isValidPhone,
                  validateAadhaar: isValidAadhaar,
                }}
                showInlineErrors={true}
              />
            )}
          </FormSection>
        );

      // case "receipt":
      //   return (
      //     <FormSection title="Registration Summary & Payment">
      //       <div className="receipt">
      //         <p>
      //           <strong>Team / College:</strong> {form.collegeName}
      //         </p>
      //         <p>
      //           <strong>Event:</strong> {config.title}
      //         </p>
      //         {currentStepConfig.hasCategory && (
      //           <p>
      //             <strong>Category:</strong> {form.category}
      //           </p>
      //         )}
      //         <p>
      //           <strong>Total Members:</strong> {totalPlayers}
      //         </p>
      //         <hr />
      //         <h3>Payment Details</h3>
      //         <p>Please pay the registration fee to proceed.</p>

      //         <div className="fee-block">
      //           <p>
      //             <strong>Registration Fee:</strong>
      //           </p>
      //           {typeof config.paymentDetails.fee === "object" ? (
      //             <ul className="fee-list">
      //               {Object.entries(config.paymentDetails.fee).map(
      //                 ([key, value]) => (
      //                   <li key={key}>
      //                     <span className="fee-key">{key}</span>
      //                     <span className="fee-value">{value}</span>
      //                   </li>
      //                 )
      //               )}
      //             </ul>
      //           ) : (
      //             <p className="fee-single">{config.paymentDetails.fee}</p>
      //           )}
      //         </div>
      //       </div>
      //     </FormSection>
      //   );

      case "receipt":
        return (
          <FormSection title="Registration Summary & Payment">
            <div className="receipt">
              <p>
                <strong>Team / College:</strong> {form.collegeName}
              </p>
              <p>
                <strong>Event:</strong> {config.title}
              </p>
              {currentStepConfig.hasCategory && (
                <p>
                  <strong>Category:</strong> {form.category}
                </p>
              )}
              <p>
                <strong>Total Members:</strong> {totalPlayers}
              </p>
              <hr />
              <h3>Payment Details</h3>
              <p>Please scan the QR code below to pay the registration fee.</p>

              <div className="qr-payment">
                <img
                  src="/gymkhanaQR.jpg"
                  alt="Scan QR to pay"
                  className="qr-image h-80"
                />
                <p>After payment, upload the payment proof below:</p>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  name="paymentProof"
                  onChange={(e) => handleTopLevelChange(e)}
                  className="input"
                  required
                />
              </div>

              <div className="fee-block">
                <p>
                  <strong>Registration Fee:</strong>
                </p>
                {typeof config.paymentDetails.fee === "object" ? (
                  <ul className="fee-list">
                    {Object.entries(config.paymentDetails.fee).map(
                      ([key, value]) => (
                        <li key={key}>
                          <span className="fee-key">{key}</span>
                          <span className="fee-value">{value}</span>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="fee-single">{config.paymentDetails.fee}</p>
                )}
              </div>
            </div>
          </FormSection>
        );


      default:
        return <p>This step type is not configured.</p>;
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative page-wrap"
        style={{ backgroundImage: `url(/eveRegBG.png)` }}
      >
        <Navbar />
        {submitting && <Loader message="Registering your detail..." />}

        <section className="event-forms bg-white/90" >
          <div className="form-heading">
            <h2 className="title">{config.title}</h2>
            <pre className="step-indicator">{config.msg}</pre>
            

            <p className="step-indicator">
              Step {currentStep + 1} of {config.steps.length}:{" "}
              {currentStepConfig.title}
            </p>
          </div>
          <div className="safety-notice">
              <TypewriterSafetyNotice
                messages={safetyMessages} 
                speed={50}
                pause={2000}
              />

            </div>

          <form onSubmit={handleSubmit} noValidate>
            {renderStepContent()}

            <div className="form-navigation ">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-secondary"
                >
                  Back
                </button>
              )}

              {isLastStep ? (
                <button type="submit" disabled={submitting} onClick={handleSubmit} className="btn">
                  {submitting ? "Confirming..." : "Confirm & Pay"}
                </button>
              ) : (
                <button type="button" onClick={nextStep} className="btn">
                  Next
                </button>
              )}
            </div>
          </form>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default EventForm;
