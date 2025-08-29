import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cricket = () => {
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
        category: "men",
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
        role: "batsman"
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
        if (!playerForm.name || !playerForm.aadharId || !playerForm.phone || !playerForm.email) {
            toast.error("Player name, email, phone, and Aadhar ID are required");
            return;
        }

        // Validate phone number format
        if (!/^\d{10}$/.test(playerForm.phone)) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }

        // Validate Aadhar ID format
        if (!/^\d{12}$/.test(playerForm.aadharId)) {
            toast.error("Aadhar ID must be exactly 12 digits");
            return;
        }

        setForm(prev => ({
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
            role: "batsman"
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

            // Validate captain details
            if (!/^\d{10}$/.test(form.captainPhone)) {
                toast.error("Captain's phone number must be exactly 10 digits");
                return;
            }
            if (!/^\d{12}$/.test(form.captainAadharId)) {
                toast.error("Captain's Aadhar ID must be exactly 12 digits");
                return;
            }

            // Validate vice-captain details
            if (!/^\d{10}$/.test(form.viceCaptainPhone)) {
                toast.error("Vice-captain's phone number must be exactly 10 digits");
                return;
            }
            if (!/^\d{12}$/.test(form.viceCaptainAadharId)) {
                toast.error("Vice-captain's Aadhar ID must be exactly 12 digits");
                return;
            }

            if (form.players.length < 9) { // Minimum 11 players including captain and vice-captain
                toast.error("Please add at least 9 more players");
                return;
            }

            const payload = {
                fullname: form.captainName,
                email: form.captainEmail,
                phoneNumber: form.captainPhone,
                collegeName: form.collegeName,
                category: form.category,
                teamPreference: "create_new",
                teamName: `${form.collegeName} Cricket`.replace(/\s+/g, " ").trim(),
                team: {
                    teamName: `${form.collegeName} Cricket`.replace(/\s+/g, " ").trim(),
                    teamSize: 11,
                    members: [
                        {
                            fullname: form.captainName,
                            email: form.captainEmail,
                            phoneNumber: form.captainPhone,
                            aadharId: form.captainAadharId,
                            collegeId: form.captainCollegeId,
                            role: "Captain"
                        },
                        {
                            fullname: form.viceCaptainName,
                            email: form.viceCaptainEmail,
                            phoneNumber: form.viceCaptainPhone,
                            aadharId: form.viceCaptainAadharId,
                            collegeId: form.viceCaptainCollegeId,
                            role: "Vice Captain"
                        },
                        ...form.players.map(player => ({
                            ...player,
                            fullname: player.name
                        }))
                    ]
                }
            };

            const res = await axiosInstance.post('/events/cricket/register', payload);
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
                category: "men",
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
                    <h2>Register for Cricket</h2>
                </div>

                <div className="rules">
                    Welcome to the Cricket Championship! Experience the thrill of the gentleman's game.
                    <br />
                    <br />
                    Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
                    <br />
                    <br />
                    For any queries, kindly contact our event coordinators
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <h3>Captain Details</h3>
                    <input type="text" name="captainName" placeholder="Team captain name" value={form.captainName} onChange={handleChange} required />
                    <input type="email" name="captainEmail" placeholder="Captain email" value={form.captainEmail} onChange={handleChange} required />
                    <input type="tel" name="captainPhone" placeholder="Captain phone (WhatsApp)" value={form.captainPhone} onChange={handleChange} required />
                    <input type="text" name="captainAadharId" placeholder="Captain Aadhar ID" value={form.captainAadharId} onChange={handleChange} required />
                    <input type="text" name="captainCollegeId" placeholder="Captain College ID (if any)" value={form.captainCollegeId} onChange={handleChange} />

                    <h3>Vice-Captain Details</h3>
                    <input type="text" name="viceCaptainName" placeholder="Team vice-captain name" value={form.viceCaptainName} onChange={handleChange} required />
                    <input type="email" name="viceCaptainEmail" placeholder="Vice-captain email" value={form.viceCaptainEmail} onChange={handleChange} required />
                    <input type="tel" name="viceCaptainPhone" placeholder="Vice-captain phone (WhatsApp)" value={form.viceCaptainPhone} onChange={handleChange} required />
                    <input type="text" name="viceCaptainAadharId" placeholder="Vice-captain Aadhar ID" value={form.viceCaptainAadharId} onChange={handleChange} required />
                    <input type="text" name="viceCaptainCollegeId" placeholder="Vice-captain College ID (if any)" value={form.viceCaptainCollegeId} onChange={handleChange} />

                    <input type="text" name="collegeName" placeholder="College Name" value={form.collegeName} onChange={handleChange} required />
                    <input type="text" name="collegeAddress" placeholder="College Address" value={form.collegeAddress} onChange={handleChange} required />

                    <div className="radio">
                        Category:
                        <label>
                            <input type="radio" name="category" value="men" checked={form.category === 'men'} onChange={handleChange} /> Men
                        </label>
                        <label>
                            <input type="radio" name="category" value="women" checked={form.category === 'women'} onChange={handleChange} /> Women
                        </label>
                    </div>

                    <h3>Add Players</h3>
                    <div className="player-form">
                        <input type="text" name="name" placeholder="Player name" value={playerForm.name} onChange={handlePlayerChange} />
                        <input type="email" name="email" placeholder="Player email" value={playerForm.email} onChange={handlePlayerChange} />
                        <input type="tel" name="phone" placeholder="Player phone" value={playerForm.phone} onChange={handlePlayerChange} />
                        <input type="text" name="aadharId" placeholder="Player Aadhar ID" value={playerForm.aadharId} onChange={handlePlayerChange} />
                        <input type="text" name="collegeId" placeholder="Player College ID (if any)" value={playerForm.collegeId} onChange={handlePlayerChange} />
                        <select name="role" value={playerForm.role} onChange={handlePlayerChange}>
                            <option value="batsman">Batsman</option>
                            <option value="bowler">Bowler</option>
                            <option value="all_rounder">All Rounder</option>
                            <option value="wicket_keeper">Wicket Keeper</option>
                        </select>
                        <button type="button" onClick={handleAddPlayer}>Add Player</button>
                    </div>

                    {form.players.length > 0 && (
                        <div className="players-list">
                            <h4>Added Players: {form.players.length}</h4>
                            {form.players.map((player, index) => (
                                <div key={index} className="player-item">
                                    <span>{player.name} - {player.role}</span>
                                    <button type="button" onClick={() => handleRemovePlayer(index)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</button>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default Cricket;
