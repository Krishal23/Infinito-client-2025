import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const Kabbadi_ = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for Kabbadi   </h2>
    </div>

    <div className="rules">
  Prepare for an adrenaline-fueled spectacle as fearless athletes engage in a battle of body and mind in the ancient sport of Kabaddi. Witness lightning-fast raids, breathtaking tackles, and a symphony of strategy as heroes risk it all in pursuit of glory!
      <br />
      <br />
      Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
      <br />
      <br />
      <strong>Participation Fees</strong> Rs. 3000/- per team
      <br />
      <br />
      <strong>Rulebook</strong> -{" "}
      <a
        href="infinito.iitp.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2024 Kabbadi rulebook
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
   Akhilesh Ingole: +91 9404549742
      
    </div>

    <form className="form">
      <input type="text" placeholder="Team captian (all communications will be made to him/her)" required />
      <input type="text" placeholder="Team vice-captain name" required />
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Team captian number (preferably whatsapp)" required />
      <input type="tel" placeholder="Team vice-captian number (preferably whatsapp)" required />
      
      <input type="text" placeholder="College Name" required />
      <input type="text" placeholder="College Address" required />
     

      
     

      <button type="submit">Register</button>
    </form>
  </section>
  <Footer/>
  </div >
);

export default Kabbadi_;
