import React, { useState } from "react";
import { eventConfigs } from "../forms-centralized/components/eventConfig";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../utils/useEventRegistration";
import CollegeSelector from "../forms-centralized/components/CollegeSelector";
import FormSection from "../forms-centralized/components/FormSection";
import PersonInputGroup from "../forms-centralized/components/PersonInputGroup";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import TypewriterSafetyNotice from "../forms-centralized/components/SafetyMsg";



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



const FormStyles = () => (
  <style>{`
    .event-forms { max-width: 800px; margin: 2rem auto; padding: 2rem; background: #ffffffe4; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .form-heading { text-align: center; margin-bottom: 2rem; }
    .step-indicator { text-align: center; color: #4a5568; font-weight: bold; margin-bottom: 1.5rem; }
    .form-section { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; }
    .player-form { border: 1px solid #cbd5e0; border-radius: 8px; padding: 1rem; margin-top: 1rem; }
    input, select { width: 100%; padding: 0.8rem; margin-top: 0.5rem; border: 1px solid #cbd5e0; border-radius: 4px; box-sizing: border-box; }
    button { display: inline-block; padding: 0.8rem 1.5rem; border: none; border-radius: 4px; color: white; background-color: #4299e1; cursor: pointer; font-size: 1rem; }
    button:disabled { background-color: #a0aec0; }
    .form-navigation { display: flex; justify-content: space-between; margin-top: 2rem; }
    .secondary-btn { background-color: #718096; }
    .checkbox-group { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .checkbox-group label { display: flex; align-items: center; gap: 0.5rem; }
    .receipt { background-color: #f7fafc; padding: 1.5rem; border-radius: 8px; }
  `}</style>
);

const EMPTY_PERSON = { fullname: "", email: "", phoneNumber: "", aadharId: "" };

const Athletics = () => {
  const config = eventConfigs.athletics;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    collegeSelect: "",
    collegeName: "",
    collegeAddress: "",
    category: "Men",
    accompanyingCoach: "No",
    coach: { ...EMPTY_PERSON },
    captain: { ...EMPTY_PERSON },
    selectedIndividualEvents: [],
    selectedRelayEvents: [],
    relayTeams: {},
    paymentProof: null,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [sharedRelayPlayers, setSharedRelayPlayers] = useState(
    Array(4).fill(null).map(() => ({ ...EMPTY_PERSON }))
  );

  const { registerEvent, submitting } = useEventRegistration({
    endpoint: config.endpoint,
    redirectUrl: "/event/success",
    payment: true,
  });

  // ----------------- Handlers -----------------
  const handleTopLevelChange = (e) => {
    const { name, type, value, files } = e.target;
    setForm((prev) => {
      if (type === "file") return { ...prev, [name]: files[0] };
      if (name === "category" && prev.category !== value) {
        return { ...prev, [name]: value, selectedIndividualEvents: [], selectedRelayEvents: [], relayTeams: {} };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCaptainChange = (field, value) => {
    setForm((prev) => ({ ...prev, captain: { ...prev.captain, [field]: value } }));
  };
  const handleCoachChange = (field, value) => {
    setForm((prev) => ({ ...prev, coach: { ...prev.coach, [field]: value } }));
  };

  const handleIndividualEventToggle = (eventName) => {
    setForm((prev) => {
      const selected = prev.selectedIndividualEvents;
      if (selected.includes(eventName)) return { ...prev, selectedIndividualEvents: selected.filter((e) => e !== eventName) };
      if (selected.length >= 3) { alert("Max 3 individual events."); return prev; }
      return { ...prev, selectedIndividualEvents: [...selected, eventName] };
    });
  };

  const handleRelayEventToggle = (eventName) => {
    setForm((prev) => {
      const { selectedRelayEvents, relayTeams } = prev;
      const isSelected = selectedRelayEvents.includes(eventName);
      if (isSelected) {
        const newSelected = selectedRelayEvents.filter((e) => e !== eventName);
        const newTeams = { ...relayTeams }; delete newTeams[eventName];
        return { ...prev, selectedRelayEvents: newSelected, relayTeams: newTeams };
      }
      if (selectedRelayEvents.length >= 2) { alert("Max 2 relay events."); return prev; }
      return {
        ...prev,
        selectedRelayEvents: [...selectedRelayEvents, eventName],
        relayTeams: { ...relayTeams, [eventName]: [...sharedRelayPlayers] },
      };
    });
  };

  const handleRelayPlayerChange = (index, field, value) => {
    const updatedPlayers = [...sharedRelayPlayers];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setSharedRelayPlayers(updatedPlayers);

    setForm((prev) => {
      const updatedTeams = { ...prev.relayTeams };
      prev.selectedRelayEvents.forEach((eventName) => {
        updatedTeams[eventName] = [...updatedPlayers];
      });
      return { ...prev, relayTeams: updatedTeams };
    });
  };

  const hasDuplicateAadhaar = () => {
    // const aadhaars = [];
    // if (form.captain.aadharId) aadhaars.push(form.captain.aadharId);
    // if (form.accompanyingCoach === "Yes" && form.coach.aadharId) aadhaars.push(form.coach.aadharId);
    // form.selectedRelayEvents.forEach((event) => {
    //   form.relayTeams[event].forEach((p) => p.aadharId && aadhaars.push(p.aadharId));
    // });
    // return new Set(aadhaars).size !== aadhaars.length;
  };

  // ----------------- Validation -----------------
  const validateCurrentStep = () => {
    const stepConfig = config.steps[currentStep];
    const isValidPhone = (num) => /^\d{10}$/.test(num);
    const isValidAadhaar = (num) => /^\d{12}$/.test(num);

    const validatePerson = (person, label) => {
      if (!person || !person.fullname?.trim() || !person.email?.trim() || !isValidPhone(person.phoneNumber) || !isValidAadhaar(person.aadharId)) {
        alert(`Fill valid details for ${label}.`); return false;
      }
      return true;
    };

    switch (stepConfig.type) {
      case "college": if (!form.collegeName || !form.collegeAddress) { alert("Fill college name/address."); return false; } break;
      case "coach": if (form.accompanyingCoach === "Yes" && !validatePerson(form.coach, "Coach")) return false; break;
      case "athlete_captain": if (!validatePerson(form.captain, "Lead Athlete")) return false; break;
      case "relay_events":
        for (const eventName of form.selectedRelayEvents) {
          for (let i = 0; i < form.relayTeams[eventName].length; i++) {
            if (!validatePerson(form.relayTeams[eventName][i], `Player ${i+1} in ${eventName}`)) return false;
          }
        }
        break;
    }

    if (["coach", "athlete_captain", "relay_events", "receipt"].includes(stepConfig.type)) {
      if (hasDuplicateAadhaar()) { alert("Duplicate Aadhaar not allowed."); return false; }
    }

    return true;
  };

  const nextStep = () => { if (validateCurrentStep()) setCurrentStep((s) => s + 1); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep((s) => s - 1); };

  // ----------------- Submit -----------------
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(form)

  // Validate all steps before submitting
  for (let i = 0; i < config.steps.length; i++) {
    setCurrentStep(i);
    if (!validateCurrentStep()) return;
  }

  if (!form.paymentProof) {
    toast.error("Upload payment proof");
    return;
  }

  // Prepare payload to match backend expectations
  const payload = {
    collegeName: form.collegeName,
    collegeAddress: form.collegeAddress,
    category: form.category.toLowerCase(),
    leadName: form.captain.fullname,
    email: form.captain.email,
    phoneNumber: form.captain.phoneNumber,
    aadharId: form.captain.aadharId,
    coachDetails: form.accompanyingCoach === "Yes" ? { ...form.coach } : null,
    individualEvents: form.selectedIndividualEvents,
    relayTeams: form.selectedRelayEvents.map((eventName) => ({
      teamName: eventName,
      members: form.relayTeams[eventName].map((p) => ({ ...p })),
    })),
  };

  // Send as FormData for file upload
  const formData = new FormData();
  formData.append("registrationData", JSON.stringify(payload));
  formData.append("paymentProof", form.paymentProof);

  // Call registration hook
  registerEvent(formData, navigate);
};


  const currentStepConfig = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;

  // ----------------- Render -----------------
  const renderStepContent = () => {
    switch (currentStepConfig.type) {
      case "college":
        return <>
          {currentStepConfig.hasCategory && (
            <FormSection title="Category">
              <select name="category" value={form.category} onChange={handleTopLevelChange}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </FormSection>
          )}
          <CollegeSelector form={form} setForm={setForm} handleTopLevelChange={handleTopLevelChange} />
        </>;

      case "coach":
        return <FormSection title="Coach Details">
          <p>Will a coach accompany?</p>
          <label><input type="radio" name="accompanyingCoach" value="Yes" checked={form.accompanyingCoach==="Yes"} onChange={handleTopLevelChange}/> Yes</label>
          <label style={{marginLeft:"1rem"}}><input type="radio" name="accompanyingCoach" value="No" checked={form.accompanyingCoach==="No"} onChange={handleTopLevelChange}/> No</label>
          {form.accompanyingCoach==="Yes" && <PersonInputGroup title="Coach Information" personData={form.coach} onChange={handleCoachChange} isRequired />}
        </FormSection>;

      case "athlete_captain":
        return <FormSection title="Lead Athlete / Captain">
          <PersonInputGroup personData={form.captain} onChange={handleCaptainChange} isRequired />
        </FormSection>;

      case "individual_events": {
        const options = form.category==="Men"?config.eventOptions.men.individual:config.eventOptions.women.individual;
        return <FormSection title="Individual Events">
          <div className="checkbox-group">
            {options.map((event)=><label key={event}><input type="checkbox" checked={form.selectedIndividualEvents.includes(event)} onChange={()=>handleIndividualEventToggle(event)} /> {event}</label>)}
          </div>
        </FormSection>;
      }

      case "relay_events": {
        const relayOptions = [...(form.category==="Men"?config.eventOptions.men.relay:config.eventOptions.women.relay), ...config.eventOptions.mixed.relay];
        return <FormSection title="Relay Events">
          <div className="checkbox-group">
            {relayOptions.map((event)=><label key={event}><input type="checkbox" checked={form.selectedRelayEvents.includes(event)} onChange={()=>handleRelayEventToggle(event)} /> <strong>{event}</strong></label>)}
          </div>

          {form.selectedRelayEvents.length>0 && <div style={{marginTop:"1rem"}}>
            <h4>Relay Players (for all selected events)</h4>
            {sharedRelayPlayers.map((player,index)=><PersonInputGroup key={index} title={`Player ${index+1}`} personData={player} onChange={(f,v)=>handleRelayPlayerChange(index,f,v)} isRequired />)}
          </div>}
        </FormSection>;
      }

      case "receipt":
        return <FormSection title="Registration Summary & Payment">
          <div className="receipt">
            <p><strong>College:</strong> {form.collegeName}</p>
            <p><strong>Lead Athlete:</strong> {form.captain.fullname}</p>
            <p><strong>Individual Events:</strong> {form.selectedIndividualEvents.join(", ")||"None"}</p>
            <p><strong>Relay Events:</strong> {form.selectedRelayEvents.join(", ")||"None"}</p>
            <hr />
            <h3>Payment</h3>
            <p>Scan QR and upload proof:</p>
            <img src="/gymkhanaQR.jpg" alt="QR" className="qr-image h-80"/>
            <input type="file" accept="image/*,application/pdf" name="paymentProof" onChange={handleTopLevelChange} required />
            <p><strong>Fee:</strong> {config.paymentDetails.fee}</p>
          </div>
        </FormSection>;

      default: return null;
    }
  };

  return <>
    <FormStyles/>
    <div
        className="min-h-screen bg-cover bg-center bg-no-repeat relative page-wrap"
        style={{ backgroundImage: `url(/eveRegBG.png)` }}
      >
      <Navbar />
      {submitting && <Loader message="Registering your detail..." />}
      <section className="event-forms">
        <div className="form-heading">
          <h2>{config.title}</h2>
          <p className="step-indicator">Step {currentStep+1} of {config.steps.length}: {currentStepConfig.title}</p>
        </div>
        <div className="safety-notice">
              <TypewriterSafetyNotice
                messages={safetyMessages} 
                speed={50}
                pause={2000}
              />

            </div>
        <form onSubmit={handleSubmit}>
          {renderStepContent()}
          <div className="form-navigation">
            {currentStep>0 && <button type="button" onClick={prevStep} className="secondary-btn">Back</button>}
            {isLastStep?<button type="submit" disabled={submitting}>Confirm & Register</button>:<button type="button" onClick={nextStep}>Next</button>}
          </div>
        </form>
      </section>
      <Footer />
    </div>
  </>;
};

export default Athletics;
