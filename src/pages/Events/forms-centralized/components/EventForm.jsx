import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEventRegistration } from "../../../../utils/useEventRegistration";
import FormSection from "./FormSection";
import PersonInputGroup from "./PersonInputGroup";
import CollegeSelector from "./CollegeSelector";



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
    .add-player-btn { background-color: #48bb78; margin-top: 1rem; font-size: 0.9rem; padding: 0.6rem 1rem; }
    .receipt { background-color: #f7fafc; padding: 1.5rem; border-radius: 8px; }
    .receipt p { margin: 0.5rem 0; }
  `}</style>
);
// --- End Mocks and Styles ---

const createInitialState = (config) => {
  const state = {
    collegeName: "", collegeAddress: "",
    coach: { fullname: "", email: "", phoneNumber: "", aadharId: "" },
    team: {},
    category: "Men", accompanyingCoach: "No",
  };
  config.steps.forEach(step => {
    if (step.type === 'team') {
      step.fields.forEach(field => {
        state.team[field.name] = Array(field.min).fill(null).map(() => ({ ...field.initialData }));
      });
    }
  });
  return state;
};

const EventForm = ({ config }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(createInitialState(config));
  const [currentStep, setCurrentStep] = useState(0);

  const { registerEvent, submitting } = useEventRegistration({
    endpoint: config.endpoint,
    redirectUrl: "/event/ins",
    payment: true,
  });

  const handleTopLevelChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleCoachChange = (field, value) => setForm(prev => ({ ...prev, coach: { ...prev.coach, [field]: value } }));
  const handleMemberChange = (section, index, field, value) => {
    setForm(prev => {
      const updatedMembers = [...prev.team[section]];
      updatedMembers[index] = { ...updatedMembers[index], [field]: value };
      return { ...prev, team: { ...prev.team, [section]: updatedMembers } };
    });
  };
  const addTeamMember = (fieldName, initialData) => {
    setForm(prev => ({ ...prev, team: { ...prev.team, [fieldName]: [...prev.team[fieldName], { ...initialData }] } }));
  };

  const validateCurrentStep = () => {
    const stepConfig = config.steps[currentStep];
    const isValidPhone = num => /^\d{10}$/.test(num);
    const isValidAadhaar = num => /^\d{12}$/.test(num);

    switch(stepConfig.type) {
        case 'college':
            if (!form.collegeName.trim() || !form.collegeAddress.trim()) {
                toast.error("Please fill in your College Name and Address.");
                return false;
            }
            break;
        case 'team':
            for (const field of stepConfig.fields) {
                for (let i = 0; i < field.min; i++) {
                    const person = form.team[field.name][i];
                    if (!person.fullname.trim() || !person.email.trim() || !isValidPhone(person.phoneNumber) || !isValidAadhaar(person.aadharId)) {
                        toast.error(`Please fill all valid details for required ${field.title} #${i + 1}`);
                        return false;
                    }
                }
            }
            break;
        case 'coach':
            if (form.accompanyingCoach === 'Yes') {
                const { fullname, email, phoneNumber, aadharId } = form.coach;
                if (!fullname.trim() || !email.trim() || !isValidPhone(phoneNumber) || !isValidAadhaar(aadharId)) {
                    toast.error("Please fill in all valid details for the coach.");
                    return false;
                }
            }
            break;
    }
    return true;
  };

  // FIX: Added e.preventDefault() to the nextStep handler to prevent any chance of it submitting the form.
  const nextStep = (e) => {
    e.preventDefault(); 
    if (validateCurrentStep()) { 
      if (currentStep < config.steps.length - 1) setCurrentStep(s => s + 1); 
    }
  };
  const prevStep = () => { if (currentStep > 0) setCurrentStep(s => s - 1); };
  const handleSubmit = (e) => { e.preventDefault(); const payload = config.buildPayload(form); registerEvent(payload, navigate); };

  const currentStepConfig = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;

  const renderStepContent = () => {
    switch(currentStepConfig.type) {
        case 'college':
            return <>
                {currentStepConfig.hasCategory && <FormSection title="Category"><select name="category" value={form.category} onChange={handleTopLevelChange}><option value="Men">Men</option><option value="Women">Women</option></select></FormSection>}
                <CollegeSelector
                  form={form}
                  setForm={setForm}
                  handleTopLevelChange={handleTopLevelChange}
                />
            </>;
        case 'team':
            return currentStepConfig.fields.map(field => (
                <FormSection title={field.title + 's'} key={field.name}>
                    {form.team[field.name].map((person, index) => <PersonInputGroup key={index} title={`${field.title} ${index + 1} ${index < field.min ? '(Required)' : '(Optional)'}`} personData={person} onChange={(f, v) => handleMemberChange(field.name, index, f, v)} isRequired={index < field.min} />)}
                    {form.team[field.name].length < field.max && <button type="button" onClick={() => addTeamMember(field.name, field.initialData)} className="add-player-btn">+ Add Optional {field.title}</button>}
                </FormSection>
            ));
        case 'coach':
            return <FormSection title="Coach Details"><p>Will a coach be accompanying the team?</p><label><input type="radio" name="accompanyingCoach" value="Yes" checked={form.accompanyingCoach === 'Yes'} onChange={handleTopLevelChange}/> Yes</label><label style={{marginLeft: '1rem'}}><input type="radio" name="accompanyingCoach" value="No" checked={form.accompanyingCoach === 'No'} onChange={handleTopLevelChange}/> No</label>{form.accompanyingCoach === 'Yes' && <PersonInputGroup title="Coach Information" personData={form.coach} onChange={handleCoachChange} isRequired={true} />}</FormSection>;
        case 'receipt':
            const totalPlayers = Object.values(form.team).reduce((acc, members) => acc + members.filter(p => p.fullname).length, 0);
            return <FormSection title="Registration Summary & Payment"><div className="receipt"><p><strong>Team / College:</strong> {form.collegeName}</p><p><strong>Event:</strong> {config.title}</p>{currentStepConfig.hasCategory && <p><strong>Category:</strong> {form.category}</p>}<p><strong>Total Members:</strong> {totalPlayers}</p><hr/><h3>Payment Details</h3><p>Please pay the registration fee to the account below and proceed.</p><p><strong>Registration Fee:</strong> {config.paymentDetails.fee}</p><p><strong>Account Name:</strong> {config.paymentDetails.accountName || "IIT Patna Sports Fest"}</p><p><strong>Account Number:</strong> {config.paymentDetails.accountNumber || "12345678901"}</p><p><strong>IFSC Code:</strong> {config.paymentDetails.ifscCode || "SBIN0001234"}</p><p><strong>UPI ID:</strong> {config.paymentDetails.upiId || "infinito-sports@upi"}</p><p style={{color: 'red', marginTop: '1rem'}}>NOTE: Your registration will only be confirmed after payment verification.</p></div></FormSection>;
        default: return <p>This step type is not configured.</p>;
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
              {isLastStep ? <button type="submit" disabled={submitting}>{submitting ? "Confirming..." : "Confirm & Pay"}</button> : <button type="button" onClick={nextStep}>Next</button>}
            </div>
          </form>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default EventForm;

