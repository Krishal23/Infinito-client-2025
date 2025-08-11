import React from 'react';
import './register.css';
import Navbar from "../../../components/Navbar";
import Footer from '../../../components/Footer';

const Register = () => (
  <section className="section register_">
     <Navbar/>
    <div className="register">
      Register as Campus Ambassador
    </div>
    <form className="register-form">
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="email" placeholder="Email" required />
      <input type="userId" placeholder ="User ID" required/>
      <input type="text" placeholder="Roll Number" required />
      <input type="text" placeholder="College Name" required />
      <input type="tel" placeholder="Phone Number" required />
      <input type="text" placeholder="Address" required />
      <input type="text" placeholder="PORs if any"  />
      <input type="text" placeholder="Why do you want to become CA?"  />
      
      <button type="submit">Register</button>
    </form>
    <Footer/>
  </section>
);


export default Register;