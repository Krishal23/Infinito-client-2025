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
        weightCategory: "56kg",
        experience: "beginner",
        previousCompetitions: "",
        collegeName: "",
        collegeAddress: ""
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
            const payload = {
                fullname: form.name,
                email: form.email,
                phoneNumber: form.phone,
                aadharId: form.aadharId,
                collegeId: form.collegeId,
                collegeName: form.collegeName,
                category: form.category,
                weightCategory: form.weightCategory,
                experience: form.experience,
                previousCompetitions: form.previousCompetitions || undefined,
                teamPreference: "individual",
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

            const res = await axiosInstance.post('/events/weightlifting/register', payload);
            toast.success(res.data?.message || 'Registered successfully!');
            setTimeout(() => navigate('/event/ins'), 800);
            setForm({
                name: "",
                email: "",
                phone: "",
                aadharId: "",
                collegeId: "",
                category: "men",
                weightCategory: "56kg",
                experience: "beginner",
                previousCompetitions: "",
                collegeName: "",
                collegeAddress: ""
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

                    <select name="weightCategory" value={form.weightCategory} onChange={handleChange} required>
                        <option value="">Select Weight Category</option>
                        <option value="56kg">56 kg</option>
                        <option value="62kg">62 kg</option>
                        <option value="69kg">69 kg</option>
                        <option value="77kg">77 kg</option>
                        <option value="85kg">85 kg</option>
                        <option value="94kg">94 kg</option>
                        <option value="105kg">105 kg</option>
                        <option value="105kg_plus">105+ kg</option>
                    </select>

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
