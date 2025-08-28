import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const Badminton_ = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for Badminton</h2>
    </div>

    <div className="rules">
      
      As of 2024, with eight amazing editions to its name, Infinito has earned its place as the the biggest and most awaited sports fest of Bihar, India.
      <br />
      <br />
      Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted
      <br />
      <br />
      <strong>Participation Fees</strong> - Rs. 1000/- per team
      <br />
      <br />
      <strong>Rulebook</strong> -{" "}
      <a
        href="infinito.iitp.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2024 Badminton rulebook
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
      Prajyot -  +91 9403394000
      <br />
     Shrika Reddy - +91 6305590331
    </div>

    <form className="form">
      <input type="text" placeholder="Team captian (all communications will be made to him/her)" required />
      <input type="text" placeholder="Team vice-captain name" required />
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Team captian number (preferably whatsapp)" required />
      <input type="tel" placeholder="Team vice-captian number (preferably whatsapp)" required />
       <div className="radio">
        Team:
        <label>
          <input type="radio" name="gender" value="men" required /> Men
        </label>
        <label>
          <input type="radio" name="gender" value="women" /> Women
        </label>
      </div>
      <input type="text" placeholder="College Name" required />
      <input type="text" placeholder="College Address" required />
     

      
     

      <button type="submit">Register</button>
    </form>
  </section>
  <Footer/>
  </div >
);

export default Badminton_;
