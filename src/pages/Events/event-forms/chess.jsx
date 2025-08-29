import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Chess = () => {
    const [form, setForm] = useState({
        captainName: "",
        captainEmail: "",
        captainPhone: "",
        captainAadharId: "",
        captainCollegeId: "",
        viceCaptainName: "",
        viceCaptainEmail: "",
        viceCaptainPhone: "",
        viceCaptainAadharId: "",
        viceCaptainCollegeId: "",
        category: "open",
        skillLevel: "beginner",
        rating: "",
        collegeName: "",
        collegeAddress: "",
        players: []
    });

    const [playerForm, setPlayerForm] = useState({
        name: "",
        email: "",
        phone: "",
        aadharId: "",
        collegeId: "",
        rating: ""
    });

    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePlayerChange = (e) => {
        setPlayerForm({ ...playerForm, [e.target.name]: e.target.value });
    };

    const handleAddPlayer = () => {
        if (!playerForm.name || !playerForm.aadharId) {
            toast.error("Player name and Aadhar ID are required");
            return;
        }

        // For all categories, max 1 player since chess is an individual game
        if (form.players.length >= 1) {
            toast.error("Chess is an individual sport, only one player allowed");
            return;
        } setForm(prev => ({
            ...prev,
            players: [...prev.players, { ...playerForm, role: "Player" }]
        }));

        // Reset player form
        setPlayerForm({
            name: "",
            email: "",
            phone: "",
            aadharId: "",
            collegeId: "",
            rating: ""
        });
    };

    const handleRemovePlayer = (index) => {
        setForm(prev => ({
            ...prev,
            players: prev.players.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);

            const payload = {
                fullname: form.captainName,
                email: form.captainEmail,
                phoneNumber: form.captainPhone,
                aadharId: form.captainAadharId,
                collegeName: form.collegeName,
                category: form.category,
                experience: form.skillLevel,
                fideRating: form.rating ? parseInt(form.rating) : undefined,
                preferredTimeControl: "rapid",
                team: {
                    teamName: `${form.collegeName} Chess`.replace(/\s+/g, " ").trim(),
                    teamSize: 1,
                    members: [
                        {
                            fullname: form.captainName,
                            email: form.captainEmail,
                            phoneNumber: form.captainPhone,
                            aadharId: form.captainAadharId,
                            collegeId: form.captainCollegeId,
                            role: "Captain"
                        },
                        ...form.players.map(player => ({
                            ...player,
                            fullname: player.name
                        }))
                    ]
                }
            };

            const res = await axiosInstance.post('/events/chess/register', payload);
            toast.success(res.data?.message || 'Registered successfully!');
            setTimeout(() => navigate('/event/ins'), 800);
            setForm({
                captainName: "",
                captainEmail: "",
                captainPhone: "",
                captainAadharId: "",
                captainCollegeId: "",
                viceCaptainName: "",
                viceCaptainEmail: "",
                viceCaptainPhone: "",
                viceCaptainAadharId: "",
                viceCaptainCollegeId: "",
                category: "open",
                skillLevel: "beginner",
                rating: "",
                collegeName: "",
                collegeAddress: "",
                players: []
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
                    <h2>Register for Chess</h2>
                </div>

                <div className="rules">
                    Welcome to the Chess Championship! Test your strategic prowess and tactical brilliance in this battle of minds.
                    <br />
                    <br />
                    Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
                    <br />
                    <br />
                    For any queries, kindly contact -
                    <br />
                    Parth Ganjewar - 8308917584
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <h3>Captain Details</h3>
                    <input type="text" name="captainName" placeholder="Name" value={form.captainName} onChange={handleChange} required />
                    <input type="email" name="captainEmail" placeholder="Email" value={form.captainEmail} onChange={handleChange} required />
                    <input type="tel" name="captainPhone" placeholder="Phone (WhatsApp)" value={form.captainPhone} onChange={handleChange} required />
                    <input type="text" name="captainAadharId" placeholder="Aadhar ID" value={form.captainAadharId} onChange={handleChange} required />
                    <input type="text" name="captainCollegeId" placeholder="College ID (if any)" value={form.captainCollegeId} onChange={handleChange} />

                    <div className="radio">
                        Category:
                        <label>
                            <input type="radio" name="category" value="open" checked={form.category === 'open'} onChange={handleChange} /> Open
                        </label>
                        <label>
                            <input type="radio" name="category" value="women" checked={form.category === 'women'} onChange={handleChange} /> Women
                        </label>
                        <label>
                            <input type="radio" name="category" value="under_18" checked={form.category === 'under_18'} onChange={handleChange} /> Under 18
                        </label>
                        <label>
                            <input type="radio" name="category" value="under_16" checked={form.category === 'under_16'} onChange={handleChange} /> Under 16
                        </label>
                    </div>

                    <select name="skillLevel" value={form.skillLevel} onChange={handleChange} required>
                        <option value="">Select Skill Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                    </select>

                    <input type="text" name="rating" placeholder="Chess Rating (if any)" value={form.rating} onChange={handleChange} />
                    <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
                    <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />

                    {false && (
                        <>
                            <h3>Add Players</h3>
                            <div className="player-form">
                                <input type="text" name="name" placeholder="Player name" value={playerForm.name} onChange={handlePlayerChange} />
                                <input type="email" name="email" placeholder="Player email" value={playerForm.email} onChange={handlePlayerChange} />
                                <input type="tel" name="phone" placeholder="Player phone" value={playerForm.phone} onChange={handlePlayerChange} />
                                <input type="text" name="aadharId" placeholder="Player Aadhar ID" value={playerForm.aadharId} onChange={handlePlayerChange} />
                                <input type="text" name="collegeId" placeholder="Player College ID (if any)" value={playerForm.collegeId} onChange={handlePlayerChange} />
                                <input type="text" name="rating" placeholder="Chess Rating (if any)" value={playerForm.rating} onChange={handlePlayerChange} />
                                <button type="button" onClick={handleAddPlayer}>Add Player</button>
                            </div>

                            {form.players.length > 0 && (
                                <div className="players-list">
                                    <h4>Added Players:</h4>
                                    {form.players.map((player, index) => (
                                        <div key={index} className="player-item">
                                            <span>{player.name}</span>
                                            <button type="button" onClick={() => handleRemovePlayer(index)}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default Chess;
