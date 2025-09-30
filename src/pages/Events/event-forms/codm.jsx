import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Codm_ = () => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        teamName: '',
        teamLeaderName: '',
        teamLeaderRollNo: '',
        email: '',
        teamCaptainNumber: '',
        players: [
            { name: '', rollNumber: '', ign: '' },
            { name: '', rollNumber: '', ign: '' },
            { name: '', rollNumber: '', ign: '' },
            { name: '', rollNumber: '', ign: '' },
            { name: '', rollNumber: '', ign: '' }
        ],
        collegeName: '',
        collegeAddress: '',
        aadharId: '',
        fullname: '',
        phoneNumber: '',
        queries: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlayerChange = (index, field, value) => {
        setForm(prev => ({
            ...prev,
            players: prev.players.map((player, i) =>
                i === index ? { ...player, [field]: value } : player
            )
        }));
    };

    const validateForm = () => {
        // Validate phone numbers
        if (!/^\d{10}$/.test(form.teamCaptainNumber)) {
            toast.error('Team captain number must be 10 digits');
            return false;
        }

        if (!/^\d{10}$/.test(form.phoneNumber)) {
            toast.error('Phone number must be 10 digits');
            return false;
        }

        // Validate Aadhar ID
        if (!/^\d{12}$/.test(form.aadharId)) {
            toast.error('Aadhar ID must be 12 digits');
            return false;
        }

        // Validate players
        for (let i = 0; i < 5; i++) {
            const player = form.players[i];
            if (!player.name.trim() || !player.rollNumber.trim() || !player.ign.trim()) {
                toast.error(`All fields for Player ${i + 1} are required`);
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            const res = await axiosInstance.post('/events/codm/register', form);
            toast.success(res.data?.message || 'Registration successful!');
            setTimeout(() => navigate('/event/ins'), 800);

            // Reset form
            setForm({
                teamName: '',
                teamLeaderName: '',
                teamLeaderRollNo: '',
                email: '',
                teamCaptainNumber: '',
                players: [
                    { name: '', rollNumber: '', ign: '' },
                    { name: '', rollNumber: '', ign: '' },
                    { name: '', rollNumber: '', ign: '' },
                    { name: '', rollNumber: '', ign: '' },
                    { name: '', rollNumber: '', ign: '' }
                ],
                collegeName: '',
                collegeAddress: '',
                aadharId: '',
                fullname: '',
                phoneNumber: '',
                queries: ''
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
                    <h2>Register for CODM</h2>
                </div>
                <div className="rules">
                    Get ready for an epic showdown as the best teams battle it out for glory and prizes. Witness the action, cheer for your favorites, and see who emerges as the ultimate CODM champion!
                    <br />
                    <br />
                    IGN is mandatory
                    <br />
                    <br />
                    <a
                        href="https://chat.whatsapp.com/Is9FWzR6PLaFEhL4vy9kjt?mode=ems_copy_c"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Whatsapp group link
                    </a>
                    <br />
                    <br />
                    For any queries, kindly contact -
                    <br />
                    8688356651
                    <br />
                    9905000603
                </div>

                {message.text && (
                    <div className={`message ${message.type}`} style={{
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '5px',
                        backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                        color: message.type === 'success' ? '#155724' : '#721c24',
                        border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                    }}>
                        {message.text}
                    </div>
                )}

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <strong>Team Details</strong>
                        <input
                            type="text"
                            name="teamName"
                            value={form.teamName}
                            onChange={handleChange}
                            placeholder="Team Name"
                            required
                        />
                        <input
                            type="text"
                            name="teamLeaderName"
                            value={form.teamLeaderName}
                            onChange={handleChange}
                            placeholder="Team Leader's Name"
                            required
                        />
                        <input
                            type="text"
                            name="teamLeaderRollNo"
                            value={form.teamLeaderRollNo}
                            onChange={handleChange}
                            placeholder="Team Leader's Roll Number"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <strong>Contact Information</strong>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="tel"
                            name="teamCaptainNumber"
                            value={form.teamCaptainNumber}
                            onChange={handleChange}
                            placeholder="Team Captain's WhatsApp Number"
                            required
                        />
                        <input
                            type="text"
                            name="fullname"
                            value={form.fullname}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            required
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            placeholder="Your Phone Number"
                            required
                        />
                        <input
                            type="text"
                            name="aadharId"
                            value={form.aadharId}
                            onChange={handleChange}
                            placeholder="Aadhar ID (12 digits)"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <strong>College Details</strong>
                        <input
                            type="text"
                            name="collegeName"
                            value={form.collegeName}
                            onChange={handleChange}
                            placeholder="College Name"
                            required
                        />
                        <input
                            type="text"
                            name="collegeAddress"
                            value={form.collegeAddress}
                            onChange={handleChange}
                            placeholder="College Address"
                            required
                        />
                    </div>

                    <div className="form-section">
                        <strong>Team Members (5 Players Required)</strong>
                        {form.players.map((player, index) => (
                            <div key={index} className="player-details">
                                <h4>Player {index + 1}</h4>
                                <div className="player-inputs">
                                    <input
                                        type="text"
                                        value={player.name}
                                        onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                                        placeholder="Player Name"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={player.rollNumber}
                                        onChange={(e) => handlePlayerChange(index, 'rollNumber', e.target.value)}
                                        placeholder="Roll Number"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={player.ign}
                                        onChange={(e) => handlePlayerChange(index, 'ign', e.target.value)}
                                        placeholder="In-Game Name (IGN)"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="form-section">
                        <strong>Additional Information</strong>
                        <textarea
                            name="queries"
                            value={form.queries}
                            onChange={handleChange}
                            placeholder="Any queries or suggestions?"
                            rows="3"
                            className="form-textarea"
                        />
                    </div>

                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default Codm_;