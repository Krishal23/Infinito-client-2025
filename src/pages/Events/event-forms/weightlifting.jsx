import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Weightlifting = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        aadharId: "",
        collegeId: "",
        category: "men",
        competitionType: "powerlifting",
        weightCategory: "under_55",
        currentWeight: "",
        events: ["squat", "bench_press", "deadlift"],
        personalBest: {
            squat: 0,
            bench_press: 0,
            deadlift: 0,
            snatch: 0,
            clean_jerk: 0
        },
        experience: "beginner",
        collegeName: "",
        collegeAddress: "",
        previousCompetitions: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const weightCategories = [
        { value: "under_55", label: "Under 55kg" },
        { value: "55_61", label: "55-61kg" },
        { value: "61_67", label: "61-67kg" },
        { value: "67_73", label: "67-73kg" },
        { value: "73_81", label: "73-81kg" },
        { value: "81_96", label: "81-96kg" },
        { value: "96_109", label: "96-109kg" },
        { value: "over_109", label: "Over 109kg" }
    ];

    const competitionTypes = [
        { value: "powerlifting", label: "Powerlifting" },
        { value: "olympic_weightlifting", label: "Olympic Weightlifting" },
        { value: "bodybuilding", label: "Bodybuilding" }
    ];

    const experienceLevels = [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" },
        { value: "professional", label: "Professional" }
    ];

    const powerliftingEvents = ["squat", "bench_press", "deadlift"];
    const olympicEvents = ["snatch", "clean_jerk"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Reset events when competition type changes
        if (name === 'competitionType') {
            const defaultEvents = value === 'powerlifting' ? powerliftingEvents :
                value === 'olympic_weightlifting' ? olympicEvents : [];
            setForm(prev => ({
                ...prev,
                [name]: value,
                events: defaultEvents
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            // Convert all personalBest values to numbers
            const personalBest = {};
            for (const [key, value] of Object.entries(form.personalBest)) {
                personalBest[key] = parseFloat(value) || 0;
            }

            const payload = {
                fullname: form.name,
                email: form.email,
                phoneNumber: form.phone,
                aadharId: form.aadharId,
                collegeId: form.collegeId,
                collegeName: form.collegeName,
                category: form.category,
                competitionType: form.competitionType,
                weightCategory: form.weightCategory,
                currentWeight: parseFloat(form.currentWeight) || 0,
                events: form.events,
                personalBest: personalBest,
                experience: form.experience,
                previousTournaments: form.previousCompetitions || undefined,
                team: {
                    teamName: `${form.collegeName} Weightlifting`.replace(/\s+/g, " ").trim(),
                    teamSize: 1,
                    members: [
                        {
                            fullname: form.name,
                            email: form.email,
                            phoneNumber: form.phone,
                            aadharId: form.aadharId,
                            collegeId: form.collegeId,
                            role: "Player"
                        }
                    ]
                }
            };

            console.log('Submitting payload:', payload);
            const res = await axiosInstance.post('/events/weight-lifting/register', payload);
            console.log('Response:', res.data);
            toast.success(res.data?.message || 'Registered successfully!');
            setTimeout(() => navigate('/event/ins'), 800);
            setForm({
                name: "",
                email: "",
                phone: "",
                aadharId: "",
                collegeId: "",
                category: "men",
                competitionType: "powerlifting",
                weightCategory: "under_55",
                currentWeight: "",
                events: ["squat", "bench_press", "deadlift"],
                personalBest: {
                    squat: 0,
                    bench_press: 0,
                    deadlift: 0,
                    snatch: 0,
                    clean_jerk: 0
                },
                experience: "beginner",
                collegeName: "",
                collegeAddress: "",
                previousCompetitions: ""
            });
        } catch (err) {
            console.error('Error response:', err.response?.data);
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
                    <h2>Register for Weightlifting</h2>
                </div>

                <div className="rules">
                    🏋️‍♂️ Welcome to the Ultimate Test of Strength! 💪
                    <br />
                    Join us at Infinito 2024 for an exhilarating display of power and technique.
                    <br />
                    <strong>Events Include:</strong> Powerlifting (Squat, Bench Press, Deadlift) & Olympic Weightlifting (Snatch, Clean & Jerk)
                    <br /><br />
                    <strong>Categories:</strong> Multiple weight divisions for both men and women
                    <br />
                    <strong>Registration Fee:</strong> ₹500 per participant
                    <br /><br />
                    <strong>Important Notes:</strong>
                    <br />
                    • All participants must follow proper form and safety guidelines
                    <br />
                    • Equipment will be provided, but you may bring your own belt and accessories
                    <br />
                    • Please ensure accurate weight category selection
                    <br /><br />
                    For complete rules and guidelines, visit our official website or contact the event coordinators.
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <h3>Personal Details</h3>
                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Phone (WhatsApp)" value={form.phone} onChange={handleChange} required />
                    <input type="text" name="aadharId" placeholder="Aadhar ID" value={form.aadharId} onChange={handleChange} required />
                    <input type="text" name="collegeId" placeholder="College ID (if any)" value={form.collegeId} onChange={handleChange} />

                    <div className="radio">
                        Category:
                        <label>
                            <input type="radio" name="category" value="men" checked={form.category === 'men'} onChange={handleChange} /> Men
                        </label>
                        <label>
                            <input type="radio" name="category" value="women" checked={form.category === 'women'} onChange={handleChange} /> Women
                        </label>
                    </div>

                    <div className="form-section">
                        <strong>Competition Details</strong>
                        <select name="competitionType" value={form.competitionType} onChange={handleChange} required>
                            <option value="">Select Competition Type</option>
                            <option value="powerlifting">Powerlifting</option>
                            <option value="olympic_weightlifting">Olympic Weightlifting</option>
                            <option value="bodybuilding">Bodybuilding</option>
                        </select>

                        <select name="weightCategory" value={form.weightCategory} onChange={handleChange} required>
                            <option value="">Select Weight Category</option>
                            {weightCategories.map(category => (
                                <option key={category.value} value={category.value}>{category.label}</option>
                            ))}
                        </select>

                        <input
                            type="number"
                            name="currentWeight"
                            placeholder="Current Weight (in kg)"
                            value={form.currentWeight || ''}
                            onChange={(e) => setForm({ ...form, currentWeight: parseFloat(e.target.value) || 0 })}
                            required
                            min="30"
                            max="200"
                        />
                    </div>

                    <div className="checkbox-group">
                        <strong>Select Events:</strong>
                        {form.competitionType === 'powerlifting' && powerliftingEvents.map(event => (
                            <label key={event}>
                                <input
                                    type="checkbox"
                                    name="events"
                                    value={event}
                                    checked={form.events.includes(event)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setForm(prev => ({
                                                ...prev,
                                                events: [...prev.events, event],
                                                personalBest: {
                                                    ...prev.personalBest,
                                                    [event]: 0
                                                }
                                            }));
                                        } else {
                                            setForm(prev => ({
                                                ...prev,
                                                events: prev.events.filter(ev => ev !== event),
                                                personalBest: {
                                                    ...prev.personalBest,
                                                    [event]: 0
                                                }
                                            }));
                                        }
                                    }}
                                />
                                {event.replace('_', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                            </label>
                        ))}
                        {form.competitionType === 'olympic_weightlifting' && olympicEvents.map(event => (
                            <label key={event}>
                                <input
                                    type="checkbox"
                                    name="events"
                                    value={event}
                                    checked={form.events.includes(event)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setForm(prev => ({
                                                ...prev,
                                                events: [...prev.events, event],
                                                personalBest: {
                                                    ...prev.personalBest,
                                                    [event]: 0
                                                }
                                            }));
                                        } else {
                                            setForm(prev => ({
                                                ...prev,
                                                events: prev.events.filter(ev => ev !== event),
                                                personalBest: {
                                                    ...prev.personalBest,
                                                    [event]: 0
                                                }
                                            }));
                                        }
                                    }}
                                />
                                {event.replace('_', ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                            </label>
                        ))}
                    </div>

                    <div className="personal-best">
                        <strong>Personal Best Records (in kg):</strong>
                        <div className="personal-best-inputs">
                            {form.events.map(event => (
                                <input
                                    key={event}
                                    type="number"
                                    name={`personalBest.${event}`}
                                    placeholder={`${event.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} PB (kg)`}
                                    value={form.personalBest[event] || ''}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            personalBest: {
                                                ...form.personalBest,
                                                [event]: parseFloat(e.target.value) || 0
                                            }
                                        })
                                    }}
                                    min="0"
                                    max="500"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <strong>Experience Level</strong>
                        <select name="experience" value={form.experience} onChange={handleChange} required>
                            <option value="">Select Experience Level</option>
                            {experienceLevels.map(level => (
                                <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="previousCompetitions"
                            placeholder="Previous Competitions (Optional)"
                            value={form.previousCompetitions}
                            onChange={handleChange}
                        />
                    </div>

                    <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
                    <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />

                    <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default Weightlifting;
