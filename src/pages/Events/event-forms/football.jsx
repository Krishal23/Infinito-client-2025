import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const Football_ = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for Football   </h2>
    </div>

    <div className="rules">
      
    Lace up your boots, put those shin guards on and take the pitch. While you try to put the ball in the back of the net, your opponents push towards a clean sheet. With a multitude of exciting talent participating, do you think you got what it takes to survive the group of death?
      <br />
      <br />
      Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
      <br />
      <br />
      <strong>Participation Fees</strong> Rs. 5000/- per team
      <br />
      <br />
      <strong>Rulebook</strong> -{" "}
      <a
        href="infinito.iitp.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2024 Football rulebook
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
   Ritesh Kumar - +91 8708151519
      <br />
     Riya Singh - +91 9598407607540
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

export default Football_;
