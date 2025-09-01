import React, { useState } from "react";
import { eventConfigs } from "../forms-centralized/components/eventConfig";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../utils/useEventRegistration";
import CollegeSelector from "../forms-centralized/components/CollegeSelector";
import FormSection from "../forms-centralized/components/FormSection";
import PersonInputGroup from "../forms-centralized/components/PersonInputGroup";


const FormStyles = () => (
  <style>{`
    .event-forms { max-width: 800px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
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

const AthleticsComp = () => {
  const config = eventConfigs.athletics;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    collegeName: "", collegeAddress: "", category: "Men", accompanyingCoach: "No",
    coach: { ...EMPTY_PERSON }, captain: { ...EMPTY_PERSON },
    selectedIndividualEvents: [], selectedRelayEvents: [], relayTeams: {},
  });
  const [currentStep, setCurrentStep] = useState(0);
  const { registerEvent, submitting } = useEventRegistration({
    endpoint: config.endpoint, redirectUrl: "/event/ins", payment: true,
  });

  const handleTopLevelChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCaptainChange = (field, value) => setForm(prev => ({ ...prev, captain: { ...prev.captain, [field]: value } }));
  const handleCoachChange = (field, value) => setForm(prev => ({ ...prev, coach: { ...prev.coach, [field]: value } }));

  const handleIndividualEventToggle = (eventName) => {
    setForm(prev => {
      const currentlySelected = prev.selectedIndividualEvents;
      if (currentlySelected.includes(eventName)) {
        return { ...prev, selectedIndividualEvents: currentlySelected.filter(e => e !== eventName) };
      }
      if (currentlySelected.length >= 3) {
        toast.error("You can select a maximum of 3 individual events.");
        return prev;
      }
      return { ...prev, selectedIndividualEvents: [...currentlySelected, eventName] };
    });
  };

  const handleRelayEventToggle = (eventName) => {
    setForm(prev => {
      const { selectedRelayEvents, relayTeams } = prev;
      const isSelected = selectedRelayEvents.includes(eventName);
      if (isSelected) {
        const newSelected = selectedRelayEvents.filter(e => e !== eventName);
        const newRelayTeams = { ...relayTeams };
        delete newRelayTeams[eventName];
        return { ...prev, selectedRelayEvents: newSelected, relayTeams: newRelayTeams };
      }
      if (selectedRelayEvents.length >= 2) {
        toast.error("You can select a maximum of 2 relay events.");
        return prev;
      }
      const newSelected = [...selectedRelayEvents, eventName];
      const newRelayTeams = { ...relayTeams, [eventName]: Array(4).fill(null).map(() => ({ ...EMPTY_PERSON })) };
      return { ...prev, selectedRelayEvents: newSelected, relayTeams: newRelayTeams };
    });
  };
  
  const handleRelayPlayerChange = (eventName, playerIndex, field, value) => {
    setForm(prev => {
      const updatedTeams = { ...prev.relayTeams };
      const updatedPlayers = [...updatedTeams[eventName]];
      updatedPlayers[playerIndex] = { ...updatedPlayers[playerIndex], [field]: value };
      updatedTeams[eventName] = updatedPlayers;
      return { ...prev, relayTeams: updatedTeams };
    });
  };

  const validateCurrentStep = () => {
    const stepConfig = config.steps[currentStep];
    const isValidPhone = num => /^\d{10}$/.test(num);
    const isValidAadhaar = num => /^\d{12}$/.test(num);
    const validatePerson = (person, label) => {
        if (!person.fullname.trim() || !person.email.trim() || !isValidPhone(person.phoneNumber) || !isValidAadhaar(person.aadharId)) {
            toast.error(`Please fill all valid details for ${label}.`);
            return false;
        }
        return true;
    }
    switch(stepConfig.type) {
        case 'college':
            if (!form.collegeName.trim() || !form.collegeAddress.trim()) {
                toast.error("Please fill in your College Name and Address.");
                return false;
            }
            break;
        case 'coach':
            if (form.accompanyingCoach === 'Yes' && !validatePerson(form.coach, "the Coach")) return false;
            break;
        case 'athlete_captain':
            if (!validatePerson(form.captain, "the Lead Athlete")) return false;
            break;
        case 'relay_events':
            for (const eventName of form.selectedRelayEvents) {
                const players = form.relayTeams[eventName] || [];
                for (let i = 0; i < players.length; i++) {
                    if (!validatePerson(players[i], `Player #${i + 1} in ${eventName}`)) return false;
                }
            }
            break;
    }
    return true;
  };

  const nextStep = () => { if (validateCurrentStep()) { if (currentStep < config.steps.length - 1) setCurrentStep(s => s + 1); }};
  const prevStep = () => { if (currentStep > 0) setCurrentStep(s => s - 1); };
  const handleSubmit = (e) => { e.preventDefault(); const payload = config.buildPayload(form); registerEvent(payload, navigate); };

  const currentStepConfig = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;

  const renderStepContent = () => {
    switch(currentStepConfig.type) {
      case 'college':
        return <>
          {currentStepConfig.hasCategory && <FormSection title="Category"><select name="category" value={form.category} onChange={handleTopLevelChange}><option value="Men">Men</option><option value="Women">Women</option></select></FormSection>}
          <CollegeSelector form={form} handleTopLevelChange={handleTopLevelChange} />
        </>;
      case 'coach':
        return <FormSection title="Coach Details"><p>Will a coach be accompanying the team?</p><label><input type="radio" name="accompanyingCoach" value="Yes" checked={form.accompanyingCoach === 'Yes'} onChange={handleTopLevelChange}/> Yes</label><label style={{marginLeft: '1rem'}}><input type="radio" name="accompanyingCoach" value="No" checked={form.accompanyingCoach === 'No'} onChange={handleTopLevelChange}/> No</label>{form.accompanyingCoach === 'Yes' && <PersonInputGroup title="Coach Information" personData={form.coach} onChange={handleCoachChange} isRequired={true} />}</FormSection>;
      case 'athlete_captain':
        return <FormSection title="Lead Athlete / Captain Details"><PersonInputGroup personData={form.captain} onChange={handleCaptainChange} isRequired={true} /></FormSection>;
      case 'individual_events':
        return <FormSection title="Individual Events"><div className="checkbox-group">{config.individualEventOptions.map(event => (<label key={event}><input type="checkbox" checked={form.selectedIndividualEvents.includes(event)} onChange={() => handleIndividualEventToggle(event)} /> {event}</label>))}</div></FormSection>;
      case 'relay_events':
        return <FormSection title="Relay Events"><div className="checkbox-group">{config.relayEventOptions.map(event => (<div key={event}><label><input type="checkbox" checked={form.selectedRelayEvents.includes(event)} onChange={() => handleRelayEventToggle(event)} /> <strong>{event}</strong></label>{form.selectedRelayEvents.includes(event) && (<div style={{ marginLeft: '2rem', marginTop: '1rem' }}><h4>Team for {event} (4 Players)</h4>{form.relayTeams[event]?.map((player, index) => (<PersonInputGroup key={index} title={`Player ${index + 1}`} personData={player} onChange={(f, v) => handleRelayPlayerChange(event, index, f, v)} isRequired={true} />))}</div>)}</div>))}</div></FormSection>;
      case 'receipt':
        return <FormSection title="Registration Summary"><div className="receipt"><p><strong>College:</strong> {form.collegeName}</p><p><strong>Lead Athlete:</strong> {form.captain.fullname}</p><p><strong>Individual Events:</strong> {form.selectedIndividualEvents.join(', ') || 'None'}</p><p><strong>Relay Events:</strong> {form.selectedRelayEvents.join(', ') || 'None'}</p><hr/><h3>Payment Details</h3><p><strong>Fee:</strong> {config.paymentDetails.fee}</p></div></FormSection>;
      default: return null;
    }
  };

  return (
    <>
      <FormStyles />
      <div className="div">
        <Navbar />
        <section className="event-forms">
          <div className="form-heading">
            <h2>{config.title}</h2>
            <p className="step-indicator">Step {currentStep + 1} of {config.steps.length}: {currentStepConfig.title}</p>
          </div>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            <div className="form-navigation">
              {currentStep > 0 && <button type="button" onClick={prevStep} className="secondary-btn">Back</button>}
              {isLastStep ? <button type="submit" disabled={submitting}>Confirm & Register</button> : <button type="button" onClick={nextStep}>Next</button>}
            </div>
          </form>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default AthleticsComp;

