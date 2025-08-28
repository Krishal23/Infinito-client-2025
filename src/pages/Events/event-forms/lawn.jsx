import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const Lawn_ = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for Lawn Tennis   </h2>
    </div>

    <div className="rules">
      
    🎾💥 Serve, Smash, and Ace Your Way to Glory! 💥🎾
    <br />
Welcome to the Lawn Tennis Tournament at Infinito, IIT Patna's premier sports fest! Get ready to step onto the court, feel the thrill of each serve, and battle it out in intense matches under the sun. Whether you're a seasoned player or just love the game, this is your chance to rally, lob, and volley your way to victory! 🌟
      <br />
      <br />
      Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
      <br />
      <br />
      <strong>Participation Fees</strong> Rs 800/- per team
      <br />
      <br />
      <strong>Rulebook</strong> -{" "}
      <a
        href="infinito.iitp.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2024 Lawn Tennis rulebook
      </a>
      <br />
      <br />
      <strong>Registration Guidelines</strong> -{" "}
      <a
        href="infinito.iitp.ac.in" 
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2k24 Guidelines
      </a>
      <br />
      <br />
      For any queries, kindly contact -
      <br />
   Pranshu Deep - 8248558408
    </div>

    <form className="form">
    
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Contact (preferably whatsapp)" required />
      <input type="text" placeholder="College Name" required />
      <input type="text" placeholder="College Address" required />
       <div className="radio">
        Team:
        <label>
          <input type="radio" name="gender" value="men" required /> Men
        </label>
        <label>
          <input type="radio" name="gender" value="women" /> Women
        </label>
      </div>

      
     

      <button type="submit">Register</button>
    </form>
  </section>
  <Footer/>
  </div >
);

export default Lawn_;
