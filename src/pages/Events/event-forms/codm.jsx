import React, { useState } from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Codm_ = () => {
    const [formData, setFormData] = useState({
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

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlayerChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            players: prev.players.map((player, i) => 
                i === index ? { ...player, [field]: value } : player
            )
        }));
    };

    const validateForm = () => {
        // Basic validation
        const required = ['teamName', 'teamLeaderName', 'teamLeaderRollNo', 'email', 'teamCaptainNumber', 'collegeName', 'collegeAddress', 'aadharId', 'fullname', 'phoneNumber'];
        
        for (let field of required) {
            if (!formData[field].trim()) {
                setMessage({ text: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`, type: 'error' });
                return false;
            }
        }

        // Validate players
        for (let i = 0; i < 5; i++) {
            const player = formData.players[i];
            if (!player.name.trim() || !player.rollNumber.trim() || !player.ign.trim()) {
                setMessage({ text: `All fields for Player ${i + 1} are required`, type: 'error' });
                return false;
            }
        }

        // Validate phone numbers
        if (!/^\d{10}$/.test(formData.teamCaptainNumber)) {
            setMessage({ text: 'Team captain number must be 10 digits', type: 'error' });
            return false;
        }

        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            setMessage({ text: 'Phone number must be 10 digits', type: 'error' });
            return false;
        }

        // Validate Aadhar ID
        if (!/^\d{12}$/.test(formData.aadharId)) {
            setMessage({ text: 'Aadhar ID must be 12 digits', type: 'error' });
            return false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage({ text: 'Please enter a valid email address', type: 'error' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const token = localStorage.getItem('token'); // Assuming you store JWT token in localStorage
            
            const response = await fetch('/api/v1/events/codm/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ text: 'Registration successful! You will receive a confirmation email shortly.', type: 'success' });
                // Reset form
                setFormData({
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
            } else {
                setMessage({ text: data.message || 'Registration failed. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage({ text: 'Network error. Please check your connection and try again.', type: 'error' });
        } finally {
            setLoading(false);
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
                    <input 
                        type="text" 
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        placeholder="Team name" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="teamLeaderName"
                        value={formData.teamLeaderName}
                        onChange={handleInputChange}
                        placeholder="Team leader's name (all communications will be made to him/her)" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="teamLeaderRollNo"
                        value={formData.teamLeaderRollNo}
                        onChange={handleInputChange}
                        placeholder="Team Leader's Roll Number" 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        required 
                    />
                    <input 
                        type="tel" 
                        name="teamCaptainNumber"
                        value={formData.teamCaptainNumber}
                        onChange={handleInputChange}
                        placeholder="Team captain number (preferably whatsapp)" 
                        required 
                    />
                    
                    {/* Additional required fields for backend */}
                    <input 
                        type="text" 
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        placeholder="Your full name" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="aadharId"
                        value={formData.aadharId}
                        onChange={handleInputChange}
                        placeholder="Aadhar ID (12 digits)" 
                        required 
                    />
                    <input 
                        type="tel" 
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Your phone number" 
                        required 
                    />
                    
                    {/* Player details */}
                    {formData.players.map((player, index) => (
                        <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <h4>Player {index + 1}</h4>
                            <input 
                                type="text" 
                                value={player.name}
                                onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                                placeholder={`Player ${index + 1} name`} 
                                required 
                            />
                            <input 
                                type="text" 
                                value={player.rollNumber}
                                onChange={(e) => handlePlayerChange(index, 'rollNumber', e.target.value)}
                                placeholder={`Player ${index + 1} Roll number`} 
                                required 
                            />
                            <input 
                                type="text" 
                                value={player.ign}
                                onChange={(e) => handlePlayerChange(index, 'ign', e.target.value)}
                                placeholder={`Player ${index + 1} IGN`} 
                                required 
                            />
                        </div>
                    ))}
                    
                    <input 
                        type="text" 
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleInputChange}
                        placeholder="College Name" 
                        required 
                    />
                    <input 
                        type="text" 
                        name="collegeAddress"
                        value={formData.collegeAddress}
                        onChange={handleInputChange}
                        placeholder="College Address" 
                        required 
                    />
                    <textarea 
                        name="queries"
                        value={formData.queries}
                        onChange={handleInputChange}
                        placeholder="Queries and suggestions"
                        rows="3"
                        style={{ resize: 'vertical' }}
                    />
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default Codm_;