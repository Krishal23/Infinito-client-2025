import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const Tt_ = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for Table Tennis   </h2>
    </div>

    <div className="rules">
      
    
As of 2024, with five amazing editions to its name, Infinito has earned its place as the the biggest and most awaited sports fest of Bihar, India.
      <br />
      <br />
      
      Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
      <br />
      <br />
      Note: BRING YOUR KIT WITH YOU
      <br />
      <br />
      <strong>Participation Fees</strong> Rs 1200/-
      <br />
      <br />
      <strong>Rulebook</strong> -{" "}
      <a
        href="infinito.iitp.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2024 Table Tennis rulebook
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
Anirudh Reddy - 8919450229
    </div>

    <form className="form">
    <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Contact number (preferably whatsapp)" required />
      <input type="text" placeholder="College Name" required />
      <input type="text" placeholder="College Address" required />
       <div className="radio">
        Gender:
        <label>
          <input type="radio" name="gender" value="male" required /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" /> Female
        </label>
      </div>

      
     

      <button type="submit">Register</button>
    </form>
  </section>
  <Footer/>
  </div >
);

export default Tt_;
