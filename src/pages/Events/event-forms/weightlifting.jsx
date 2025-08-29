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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
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
                            role: "Individual"
                        }
                    ]
                }
            };

            const res = await axiosInstance.post('/events/weight_lifting/register', payload);
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
                    Welcome to the Weightlifting Championship! Test your strength and technique in this ultimate display of power.
                    <br />
                    <br />
                    Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
                    <br />
                    <br />
                    For any queries, kindly contact our event coordinators
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

                    <select name="competitionType" value={form.competitionType} onChange={handleChange} required>
                        <option value="">Select Competition Type</option>
                        <option value="powerlifting">Powerlifting</option>
                        <option value="olympic_weightlifting">Olympic Weightlifting</option>
                        <option value="bodybuilding">Bodybuilding</option>
                    </select>

                    <select name="weightCategory" value={form.weightCategory} onChange={handleChange} required>
                        <option value="">Select Weight Category</option>
                        <option value="under_55">Under 55kg</option>
                        <option value="55_61">55-61kg</option>
                        <option value="61_67">61-67kg</option>
                        <option value="67_73">67-73kg</option>
                        <option value="73_81">73-81kg</option>
                        <option value="81_96">81-96kg</option>
                        <option value="96_109">96-109kg</option>
                        <option value="over_109">Over 109kg</option>
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

                    <div className="events-checkboxes" style={{ margin: '10px 0' }}>
                        <p style={{ marginBottom: '5px' }}>Select Events (at least one required):</p>
                        <label>
                            <input
                                type="checkbox"
                                name="events"
                                value="squat"
                                checked={form.events.includes('squat')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setForm({ ...form, events: [...form.events, 'squat'] })
                                    } else {
                                        setForm({ ...form, events: form.events.filter(ev => ev !== 'squat') })
                                    }
                                }}
                            /> Squat
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="events"
                                value="bench_press"
                                checked={form.events.includes('bench_press')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setForm({ ...form, events: [...form.events, 'bench_press'] })
                                    } else {
                                        setForm({ ...form, events: form.events.filter(ev => ev !== 'bench_press') })
                                    }
                                }}
                            /> Bench Press
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="events"
                                value="deadlift"
                                checked={form.events.includes('deadlift')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setForm({ ...form, events: [...form.events, 'deadlift'] })
                                    } else {
                                        setForm({ ...form, events: form.events.filter(ev => ev !== 'deadlift') })
                                    }
                                }}
                            /> Deadlift
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="events"
                                value="snatch"
                                checked={form.events.includes('snatch')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setForm({ ...form, events: [...form.events, 'snatch'] })
                                    } else {
                                        setForm({ ...form, events: form.events.filter(ev => ev !== 'snatch') })
                                    }
                                }}
                            /> Snatch
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="events"
                                value="clean_jerk"
                                checked={form.events.includes('clean_jerk')}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setForm({ ...form, events: [...form.events, 'clean_jerk'] })
                                    } else {
                                        setForm({ ...form, events: form.events.filter(ev => ev !== 'clean_jerk') })
                                    }
                                }}
                            /> Clean & Jerk
                        </label>
                    </div>

                    <div className="personal-best" style={{ margin: '10px 0' }}>
                        <p style={{ marginBottom: '5px' }}>Personal Best (in kg):</p>
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

                    <select name="experience" value={form.experience} onChange={handleChange} required>
                        <option value="">Select Experience Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="professional">Professional</option>
                    </select>

                    <input
                        type="text"
                        name="previousCompetitions"
                        placeholder="Previous Competitions (Optional)"
                        value={form.previousCompetitions}
                        onChange={handleChange}
                    />

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
