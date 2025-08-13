import React, { useState } from 'react';
import './register.css';
import Navbar from "../../../components/Navbar";
import Footer from '../../../components/Footer';
import axiosInstance from '../../../utils/axios';

const CARegister = () => {
  const [applicationStatement, setApplicationStatement] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // assuming JWT auth
      const res=await axiosInstance.post(
        '/ca/apply',
        { applicationStatement },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res)
      alert('Application submitted!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error submitting');
      console.log(err)
    }
  };

  return (
    <section className="section register_">
      <Navbar/>
      <div className="register">Register as Campus Ambassador</div>
      <form className="register-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Why do you want to become CA?"
          value={applicationStatement}
          onChange={(e) => setApplicationStatement(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <Footer/>
    </section>
  );
};

export default CARegister;
